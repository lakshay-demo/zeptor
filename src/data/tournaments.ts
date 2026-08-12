import type { Tournament } from '../types/site';

export const featuredTournament: Tournament = {
  id: 'zeptor-season-1',
  name: 'ZEPTOR ESPORTS — SEASON 1',
  subtitle: 'Competitive BGMI tournament for serious teams',
  prizePool: '₹5,000',
  slots: '128',
  registeredTeams: '86',
  deadline: 'Aug 28, 2026',
  format: 'Solo squad elimination with league stage',
  status: 'Registration Open',
  summary: 'A premium roadmap event with qualifiers, semis and grand final stages for emerging BGMI teams.',
  percentComplete: 45,
  stages: [
    { id: 'registration', title: 'Registration', description: 'Open for team sign-ups', status: 'completed' },
    { id: 'qualifier', title: 'Qualifier', description: 'Initial elimination rounds', status: 'completed' },
    { id: 'league', title: 'League Stage', description: 'Point-based group matches', status: 'current' },
    { id: 'semi', title: 'Semi Final', description: 'Top teams fight for finals', status: 'upcoming' },
    { id: 'grand-final', title: 'Grand Final', description: 'Champion decides the title', status: 'upcoming' },
    { id: 'champion', title: 'Champion', description: 'Winner announcement', status: 'upcoming' },
  ],
};

export const tournamentStages = featuredTournament.stages;
