import type { Offer, ScrimSession } from '../types/site';

export const scrimSessions: ScrimSession[] = [
  {
    id: 'session-1',
    title: 'Zeptor Daily Scrim',
    time: '1:00 PM – 3:00 PM',
    maps: ['Erangel', 'Miramar', 'Rondo'],
    teams: '16–18 Teams',
    entryOptions: [
      {
        entryFee: 25,
        prizePool: 500,
        prizeDistribution: [
          { rank: '🥇 1st', amount: '₹110' },
          { rank: '🥈 2nd', amount: '₹50' },
          { rank: '🥉 3rd', amount: '₹35' },
          { rank: '4th', amount: 'FREE SLOT' },
        ],
      },
      {
        entryFee: 35,
        prizePool: 700,
        prizeDistribution: [
          { rank: '🥇 1st', amount: '₹170' },
          { rank: '🥈 2nd', amount: '₹85' },
          { rank: '🥉 3rd', amount: '₹45' },
          { rank: '4th', amount: 'FREE SLOT' },
        ],
      },
      {
        entryFee: 60,
        prizePool: 1000,
        prizeDistribution: [
          { rank: '🥇 1st', amount: '₹350' },
          { rank: '🥈 2nd', amount: '₹130' },
          { rank: '🥉 3rd', amount: '₹90' },
          { rank: '4th', amount: '₹60' },
          { rank: '5th', amount: 'FREE SLOT' },
        ],
      },
    ],
  },
  {
    id: 'session-2',
    title: 'Zeptor Daily Scrim',
    time: '3:00 PM – 5:00 PM',
    maps: ['Erangel', 'Miramar', 'Rondo'],
    teams: '16–18 Teams',
    entryOptions: [
      {
        entryFee: 25,
        prizePool: 500,
        prizeDistribution: [
          { rank: '🥇 1st', amount: '₹110' },
          { rank: '🥈 2nd', amount: '₹50' },
          { rank: '🥉 3rd', amount: '₹35' },
          { rank: '4th', amount: 'FREE SLOT' },
        ],
      },
      {
        entryFee: 35,
        prizePool: 700,
        prizeDistribution: [
          { rank: '🥇 1st', amount: '₹170' },
          { rank: '🥈 2nd', amount: '₹85' },
          { rank: '🥉 3rd', amount: '₹45' },
          { rank: '4th', amount: 'FREE SLOT' },
        ],
      },
      {
        entryFee: 60,
        prizePool: 1000,
        prizeDistribution: [
          { rank: '🥇 1st', amount: '₹350' },
          { rank: '🥈 2nd', amount: '₹130' },
          { rank: '🥉 3rd', amount: '₹90' },
          { rank: '4th', amount: '₹60' },
          { rank: '5th', amount: 'FREE SLOT' },
        ],
      },
    ],
  },
  {
    id: 'session-3',
    title: 'Zeptor Daily Scrim',
    time: '7:00 PM – 9:00 PM',
    maps: ['Erangel', 'Miramar', 'Rondo'],
    teams: '16–18 Teams',
    entryOptions: [
      {
        entryFee: 25,
        prizePool: 500,
        prizeDistribution: [
          { rank: '🥇 1st', amount: '₹110' },
          { rank: '🥈 2nd', amount: '₹50' },
          { rank: '🥉 3rd', amount: '₹35' },
          { rank: '4th', amount: 'FREE SLOT' },
        ],
      },
      {
        entryFee: 35,
        prizePool: 700,
        prizeDistribution: [
          { rank: '🥇 1st', amount: '₹170' },
          { rank: '🥈 2nd', amount: '₹85' },
          { rank: '🥉 3rd', amount: '₹45' },
          { rank: '4th', amount: 'FREE SLOT' },
        ],
      },
      {
        entryFee: 60,
        prizePool: 1000,
        prizeDistribution: [
          { rank: '🥇 1st', amount: '₹350' },
          { rank: '🥈 2nd', amount: '₹130' },
          { rank: '🥉 3rd', amount: '₹90' },
          { rank: '4th', amount: '₹60' },
          { rank: '5th', amount: 'FREE SLOT' },
        ],
      },
    ],
  },
  {
    id: 'session-4',
    title: 'Zeptor Daily Scrim',
    time: '9:00 PM – 11:00 PM',
    maps: ['Erangel', 'Miramar', 'Rondo'],
    teams: '16–18 Teams',
    entryOptions: [
      {
        entryFee: 25,
        prizePool: 500,
        prizeDistribution: [
          { rank: '🥇 1st', amount: '₹110' },
          { rank: '🥈 2nd', amount: '₹50' },
          { rank: '🥉 3rd', amount: '₹35' },
          { rank: '4th', amount: 'FREE SLOT' },
        ],
      },
      {
        entryFee: 35,
        prizePool: 700,
        prizeDistribution: [
          { rank: '🥇 1st', amount: '₹170' },
          { rank: '🥈 2nd', amount: '₹85' },
          { rank: '🥉 3rd', amount: '₹45' },
          { rank: '4th', amount: 'FREE SLOT' },
        ],
      },
      {
        entryFee: 60,
        prizePool: 1000,
        prizeDistribution: [
          { rank: '🥇 1st', amount: '₹350' },
          { rank: '🥈 2nd', amount: '₹130' },
          { rank: '🥉 3rd', amount: '₹90' },
          { rank: '4th', amount: '₹60' },
          { rank: '5th', amount: 'FREE SLOT' },
        ],
      },
    ],
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
