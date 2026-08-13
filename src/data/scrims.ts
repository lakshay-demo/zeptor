import type { Offer, ScrimSession } from '../types/site';

export const scrimSessions: ScrimSession[] = [
  {
    id: 'session-1',
    title: 'Daily Scrim',
    time: '1:00 PM – 3:00 PM',
    entryFee: '₹25',
    prizePool: '₹500',
    maps: ['Erangel', 'Miramar', 'Rondo'],
    teams: '16–18 Teams',
    description: 'Entry Fee: ₹25 per team • 1st: ₹110 • 2nd: ₹50 • 3rd: ₹35 • 4th: FREE SLOT',
  },
  {
    id: 'session-2',
    title: 'Daily Scrim',
    time: '3:00 PM – 5:00 PM',
    entryFee: '₹35',
    prizePool: '₹700',
    maps: ['Erangel', 'Miramar', 'Rondo'],
    teams: '16–18 Teams',
    description: 'Entry Fee: ₹35 per team • 1st: ₹170 • 2nd: ₹85 • 3rd: ₹45 • 4th: FREE SLOT',
  },
  {
    id: 'session-3',
    title: 'Daily Scrim',
    time: '7:00 PM – 9:00 PM',
    entryFee: '₹60',
    prizePool: '₹1,000',
    maps: ['Erangel', 'Miramar', 'Rondo'],
    teams: '16–18 Teams',
    description: 'Entry Fee: ₹60 per team • 1st: ₹350 • 2nd: ₹130 • 3rd: ₹90 • 4th: ₹60 • 5th: FREE SLOT',
  },
  {
    id: 'session-4',
    title: 'Daily Scrim',
    time: '9:00 PM – 11:00 PM',
    entryFee: '₹35',
    prizePool: '₹700',
    maps: ['Erangel', 'Miramar', 'Rondo'],
    teams: '16–18 Teams',
    description: 'Entry Fee: ₹35 per team • 1st: ₹170 • 2nd: ₹85 • 3rd: ₹45 • 4th: FREE SLOT',
  },
  {
    id: 'session-5',
    title: 'Daily Scrim',
    time: '11:00 PM – 1:00 AM',
    entryFee: '₹25',
    prizePool: '₹500',
    maps: ['Erangel', 'Miramar', 'Rondo'],
    teams: '16–18 Teams',
    description: 'Entry Fee: ₹25 per team • 1st: ₹110 • 2nd: ₹50 • 3rd: ₹35 • 4th: FREE SLOT',
  },
];

export const promos: Offer[] = [
  {
    id: 'independence-1',
    title: 'INDEPENDENCE DAY OFFER 🇮🇳',
    description: '3 Matches @ ₹25',
    regularPrice: '₹35',
    offerPrice: '₹25',
    discount: '30%',
    expiresAt: '2026-08-20T23:59:59.000Z',
  },
];
