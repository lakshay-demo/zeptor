export type RewardSettings = {
  monthLabel: string;
  minEligibilityScore: number;
  maxDrawEntries: number;
  participationMultiplier: number;
  performanceMultiplier: number;
  consistencyMultiplier: number;
  activeWindowMinutes: number;
};

export type RewardItem = {
  id: string;
  name: string;
  emoji: string;
  description: string;
  category: string;
};

export type TeamRewardScore = {
  teamId: string;
  teamName: string;
  participation: number;
  top10: number;
  top5: number;
  top3: number;
  wwcd: number;
  totalScore: number;
  drawEntries: number;
  status: 'Eligible' | 'Need more points';
};

export type RewardDrawResult = {
  drawId: string;
  month: string;
  reward: string;
  eligibleTeams: number;
  totalEntries: number;
  winningTeam: string;
  admin: string;
  timestamp: string;
};

export const rewardSettings: RewardSettings = {
  monthLabel: 'August 2026',
  minEligibilityScore: 18,
  maxDrawEntries: 24,
  participationMultiplier: 1,
  performanceMultiplier: 1.7,
  consistencyMultiplier: 1.3,
  activeWindowMinutes: 5,
};

export const rewardItems: RewardItem[] = [
  {
    id: 'headphones',
    name: 'Gaming Headphones',
    emoji: '🎧',
    description: 'Premium wireless headset for long scrim nights and stream sessions.',
    category: 'Audio',
  },
  {
    id: 'uc',
    name: 'BGMI UC',
    emoji: '🎮',
    description: 'In-game credit for team members and tournament participation.',
    category: 'In-game',
  },
  {
    id: 'fan',
    name: 'Phone Cooling Fan',
    emoji: '❄️',
    description: 'Keep devices cool during marathon BGMI grind sessions.',
    category: 'Accessories',
  },
  {
    id: 'more-rewards',
    name: 'More Rewards',
    emoji: '🎁',
    description: 'Rewards may vary based on the active monthly cycle and partner inventory.',
    category: 'Varies',
  },
];

export const rewardLeaderboard: TeamRewardScore[] = [
  { teamId: 'team-1', teamName: 'TEAM X', participation: 22, top10: 11, top5: 7, top3: 5, wwcd: 3, totalScore: 62, drawEntries: 18, status: 'Eligible' },
  { teamId: 'team-2', teamName: 'BLAZE LEGENDS', participation: 18, top10: 9, top5: 5, top3: 3, wwcd: 2, totalScore: 48, drawEntries: 14, status: 'Eligible' },
  { teamId: 'team-3', teamName: 'NOVA NEXUS', participation: 15, top10: 7, top5: 4, top3: 2, wwcd: 2, totalScore: 41, drawEntries: 12, status: 'Eligible' },
  { teamId: 'team-4', teamName: 'PHANTOM RISE', participation: 14, top10: 6, top5: 3, top3: 2, wwcd: 1, totalScore: 36, drawEntries: 10, status: 'Eligible' },
  { teamId: 'team-5', teamName: 'IRON BLADE', participation: 10, top10: 4, top5: 2, top3: 1, wwcd: 1, totalScore: 24, drawEntries: 7, status: 'Need more points' },
  { teamId: 'team-6', teamName: 'RAVEN UNIT', participation: 8, top10: 3, top5: 1, top3: 1, wwcd: 1, totalScore: 18, drawEntries: 5, status: 'Need more points' },
];

export const rewardWinners = [
  { month: 'August 2026', reward: 'Gaming Headphones', winningTeam: 'TEAM X', score: 62, participation: 22, performance: 38, winnerDate: '2026-08-31' },
  { month: 'July 2026', reward: 'BGMI UC', winningTeam: 'BLAZE LEGENDS', score: 54, participation: 20, performance: 34, winnerDate: '2026-07-31' },
];

const getRandomIndex = (max: number) => {
  if (!max) {
    return 0;
  }

  if (typeof crypto !== 'undefined' && 'getRandomValues' in crypto) {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return array[0] % max;
  }

  return Math.floor(Math.random() * max);
};

export const runRewardDraw = (scores: TeamRewardScore[], reward: string, adminName = 'Zeptor Admin') => {
  const eligible = scores.filter((team) => team.totalScore >= rewardSettings.minEligibilityScore);

  if (!eligible.length) {
    return null;
  }

  const entries: string[] = eligible.flatMap((team) => {
    const drawWeight = Math.min(team.drawEntries, rewardSettings.maxDrawEntries);
    return Array.from({ length: Math.max(drawWeight, 1) }, () => team.teamName);
  });

  const winner = entries[getRandomIndex(entries.length)] ?? eligible[0].teamName;
  const result: RewardDrawResult = {
    drawId: `draw-${Date.now()}`,
    month: rewardSettings.monthLabel,
    reward,
    eligibleTeams: eligible.length,
    totalEntries: entries.length,
    winningTeam: winner,
    admin: adminName,
    timestamp: new Date().toISOString(),
  };

  return result;
};

export const computeEligibilityStatus = (score: number) => {
  if (score >= rewardSettings.minEligibilityScore) {
    return 'Eligible';
  }

  return `Need ${rewardSettings.minEligibilityScore - score} more points`;
};
