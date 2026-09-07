import type { PlayerProfile } from '../types/site';

export const players: PlayerProfile[] = [
  {
    id: 'player-1',
    name: 'Shiva Patel',
    ign: 'ZeptoShiva',
    team: 'Zeptor Prime',
    role: 'In-Game Leader',
    matches: 142,
    kills: 984,
    kd: '3.8',
    wwcd: 21,
    avgPlacement: '4.2',
    recentResults: ['1st in Zeptor Cup', 'Top 4 daily league', 'Runner-up qualifier'],
  },
  {
    id: 'player-2',
    name: 'Aarav Singh',
    ign: 'AwaRev',
    team: 'Zeptor Prime',
    role: 'Assaulter',
    matches: 126,
    kills: 892,
    kd: '3.2',
    wwcd: 18,
    avgPlacement: '4.5',
    recentResults: ['Top fragger in prime session', 'Strong league run', 'Daily scrim highlight'],
  },
];
