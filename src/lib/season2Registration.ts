import { supabase } from './supabase';

export const season2Config = {
  entryFee: 'XX',
  prizePool: 'XXXX',
  maxTeams: 48,
};

export const season2RegistrationEvent = 'zeptor-season-2-registration-updated';

export type Season2RegistrationStatus = 'PENDING' | 'CONTACTED' | 'CONFIRMED' | 'REJECTED';

export type Season2InterestRegistration = {
  id: string;
  teamName: string;
  teamLeaderName: string;
  mobileNumber: string;
  whatsappNumber?: string;
  createdAt: string;
  status: Season2RegistrationStatus;
};

type RegistrationRow = {
  id: string;
  team_name: string;
  team_leader_name: string;
  mobile_number: string;
  created_at: string;
  status: Season2RegistrationStatus;
};

const storageKey = 'zeptorSeason2InterestRegistrations';

const clean = (value: string) => value.trim().replace(/\s+/g, ' ');

export const isValidIndianMobile = (value: string) => /^[6-9]\d{9}$/.test(value.replace(/\D/g, ''));

const fromRow = (row: RegistrationRow): Season2InterestRegistration => ({
  id: row.id,
  teamName: row.team_name,
  teamLeaderName: row.team_leader_name,
  mobileNumber: row.mobile_number,
  createdAt: row.created_at,
  status: row.status,
});

export const getSeason2Registrations = async (): Promise<Season2InterestRegistration[]> => {
  if (supabase) {
    const { data, error } = await supabase.from('season2_registrations').select('*').order('created_at', { ascending: false });
    if (!error && data) return (data as RegistrationRow[]).map(fromRow);
  }

  const saved = localStorage.getItem(storageKey);
  if (!saved) return [];

  try {
    const parsed = JSON.parse(saved) as Season2InterestRegistration[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const saveSeason2Registrations = async (registrations: Season2InterestRegistration[]) => {
  if (supabase) {
    const { error } = await supabase.from('season2_registrations').upsert(registrations.map((registration) => ({
      id: registration.id,
      team_name: registration.teamName,
      team_leader_name: registration.teamLeaderName,
      mobile_number: registration.mobileNumber,
      created_at: registration.createdAt,
      status: registration.status,
    })));
    if (!error) {
      window.dispatchEvent(new Event(season2RegistrationEvent));
      return;
    }
  }
  localStorage.setItem(storageKey, JSON.stringify(registrations));
  window.dispatchEvent(new Event(season2RegistrationEvent));
};

export const addSeason2Registration = async (values: Pick<Season2InterestRegistration, 'teamName' | 'teamLeaderName' | 'mobileNumber' | 'whatsappNumber'>) => {
  const registrations = await getSeason2Registrations();
  if (registrations.length >= season2Config.maxTeams) {
    return { ok: false as const, error: `All ${season2Config.maxTeams} team registrations have been received.` };
  }

  const teamName = clean(values.teamName);
  const teamLeaderName = clean(values.teamLeaderName);
  const mobileNumber = values.mobileNumber.replace(/\D/g, '');
  const whatsappNumber = values.whatsappNumber ? values.whatsappNumber.replace(/\D/g, '') : '';

  if (!teamName || !teamLeaderName || !isValidIndianMobile(mobileNumber)) {
    return { ok: false as const, error: 'Enter a team name, leader name and valid Indian mobile number.' };
  }

  if (registrations.some((registration) => registration.mobileNumber === mobileNumber || registration.teamName.toLowerCase() === teamName.toLowerCase())) {
    return { ok: false as const, error: 'This team or mobile number has already submitted an interest registration.' };
  }

  const registration: Season2InterestRegistration = {
    id: crypto.randomUUID(),
    teamName,
    teamLeaderName,
    mobileNumber,
    ...(whatsappNumber ? { whatsappNumber } : {}),
    createdAt: new Date().toISOString(),
    status: 'PENDING',
  };

  if (supabase) {
    const { error } = await supabase.from('season2_registrations').insert({
      team_name: registration.teamName,
      team_leader_name: registration.teamLeaderName,
      mobile_number: registration.mobileNumber,
      status: registration.status,
    });
    if (error) return { ok: false as const, error: error.code === '23505' ? 'This team or mobile number has already submitted an interest registration.' : 'Registration could not be saved. Please try again.' };
    window.dispatchEvent(new Event(season2RegistrationEvent));
  } else {
    await saveSeason2Registrations([...registrations, registration]);
  }
  return { ok: true as const, registration };
};

export const updateSeason2RegistrationStatus = async (id: string, status: Season2RegistrationStatus) => {
  if (supabase) {
    const { error } = await supabase.from('season2_registrations').update({ status }).eq('id', id);
    if (error) return false;
  } else {
    const registrations = await getSeason2Registrations();
    await saveSeason2Registrations(registrations.map((registration) => registration.id === id ? { ...registration, status } : registration));
  }
  window.dispatchEvent(new Event(season2RegistrationEvent));
  return true;
};

export const subscribeToSeason2Registrations = (onChange: () => void) => {
  const client = supabase;
  if (!client) return () => undefined;
  const channel = client.channel('season2-registrations').on('postgres_changes', { event: '*', schema: 'public', table: 'season2_registrations' }, onChange).subscribe();
  return () => { void client.removeChannel(channel); };
};