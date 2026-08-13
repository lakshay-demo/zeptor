export type StatCard = {
  id: string;
  label: string;
  value: string;
  subtitle: string;
};

export type ScrimSession = {
  id: string;
  title: string;
  time: string;
  entryFee: string;
  prizePool: string;
  maps: string[];
  teams: string;
  description: string;
};

export type Offer = {
  id: string;
  title: string;
  description: string;
  regularPrice: string;
  offerPrice: string;
  discount: string;
  expiresAt: string;
};

export type TournamentStage = {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
};

export type Tournament = {
  id: string;
  name: string;
  subtitle: string;
  prizePool: string;
  slots: string;
  status: string;
  registeredTeams: string;
  deadline: string;
  format: string;
  stages: TournamentStage[];
  summary: string;
  percentComplete: number;
};

export type LeaderboardTeam = {
  id: string;
  rank: number;
  name: string;
  logo: string;
  matches: number;
  wwcd: number;
  placementPoints: number;
  killPoints: number;
  totalPoints: number;
  status: 'qualified' | 'pending';
};

export type TeamCard = {
  id: string;
  name: string;
  region: string;
  members: string[];
  matches: number;
  wins: number;
  points: number;
  form: string;
  logo: string;
};

export type PlayerProfile = {
  id: string;
  name: string;
  ign: string;
  team: string;
  role: string;
  matches: number;
  kills: number;
  kd: string;
  wwcd: number;
  avgPlacement: string;
  recentResults: string[];
};

export type ResultCard = {
  id: string;
  category: string;
  event: string;
  date: string;
  winner: string;
  runnerUp: string;
  prizePool: string;
};

export type NewsItem = {
  id: string;
  category: string;
  title: string;
  date: string;
  description: string;
  image: string;
  link: string;
};

export type SiteConfig = {
  organizationName: string;
  tagline: string;
  instagram: string;
  youtube: string;
  whatsappCommunity: string;
  email: string;
  brandStatement: string;
  contactPhone: string;
  scrimRegistrationPhone?: string;
};
