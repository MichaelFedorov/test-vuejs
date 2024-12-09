/**
 * 
 *  THIS IS A TESTING FILE. YOU CAN FREELY MODIFY THE CODE BELOW IN ORDER TO TEST YOUR WORK.
 *  PLEASE DON´T CHANGE THE INTERFACE OF leagueService.js METHODS
 *
 */

require('jest-fetch-mock').enableMocks();
fetchMock.dontMock();

import LeagueService from "../src/services/LeagueService";

describe("laderboard", () => {
  let leagueService;

  beforeEach(() => {
    leagueService = new LeagueService();
  });

  test('check-leaderboard-teams', async () => {
    const matches = [
      {
        matchDate: Date.now(),
        stadium: 'Maracanã',
        homeTeam: 'Brazil',
        awayTeam: 'France',
        matchPlayed: true,
        homeTeamScore: 2,
        awayTeamScore: 1
      }
    ];
    leagueService.setMatches(matches);

    const leaderboard = leagueService.getLeaderboard();

    const firstTeam = leaderboard[0];
    expect(firstTeam.teamName).toBe('Brazil');
    expect(firstTeam.matchesPlayed).toBe(1);
    expect(firstTeam.goalsFor).toBe(2);
    expect(firstTeam.goalsAgainst).toBe(1);
    expect(firstTeam.points).toBe(3);

    const secondTeam = leaderboard[1];
    expect(secondTeam.teamName).toBe('France');
    expect(secondTeam.matchesPlayed).toBe(1);
    expect(secondTeam.goalsFor).toBe(1);
    expect(secondTeam.goalsAgainst).toBe(2);
    expect(secondTeam.points).toBe(0);
  });

  test('Tiebreaker by head-to-head points with 2 teams.', async () => {
    const matches = [
      {
        matchDate: Date.now(),
        stadium: 'Maracanã',
        homeTeam: 'USA',
        awayTeam: 'France',
        matchPlayed: true,
        homeTeamScore: 1,
        awayTeamScore: 1
      },
      {
        matchDate: Date.now(),
        stadium: 'Maracanã',
        homeTeam: 'Cameroon',
        awayTeam: 'France',
        matchPlayed: true,
        homeTeamScore: 0,
        awayTeamScore: 2
      },
      {
        matchDate: Date.now(),
        stadium: 'Maracanã',
        homeTeam: 'Cameroon',
        awayTeam: 'USA',
        matchPlayed: true,
        homeTeamScore: 0,
        awayTeamScore: 2
      }
    ];
    leagueService.setMatches(matches);

    const leaderboard = leagueService.getLeaderboard();

    const firstTeam = leaderboard[0];
    expect(firstTeam.teamName).toBe('France');
    expect(firstTeam.matchesPlayed).toBe(2);
    expect(firstTeam.goalsFor).toBe(3);
    expect(firstTeam.goalsAgainst).toBe(1);
    expect(firstTeam.points).toBe(4);

    const secondTeam = leaderboard[1];
    expect(secondTeam.teamName).toBe('USA');
    expect(secondTeam.matchesPlayed).toBe(2);
    expect(secondTeam.goalsFor).toBe(3);
    expect(secondTeam.goalsAgainst).toBe(1);
    expect(secondTeam.points).toBe(4);

    const thirdTeam = leaderboard[2];
    expect(thirdTeam.teamName).toBe('Cameroon');
    expect(thirdTeam.matchesPlayed).toBe(2);
    expect(thirdTeam.goalsFor).toBe(0);
    expect(thirdTeam.goalsAgainst).toBe(4);
    expect(thirdTeam.points).toBe(0);
  });

  test('Tiebreaker by goal difference.', async () => {
    const matches = [
      {
        matchDate: Date.now(),
        stadium: 'Maracanã',
        homeTeam: 'USA',
        awayTeam: 'France',
        matchPlayed: true,
        homeTeamScore: 1,
        awayTeamScore: 1
      },
      {
        matchDate: Date.now(),
        stadium: 'Maracanã',
        homeTeam: 'Cameroon',
        awayTeam: 'France',
        matchPlayed: true,
        homeTeamScore: 0,
        awayTeamScore: 2
      },
      {
        matchDate: Date.now(),
        stadium: 'Maracanã',
        homeTeam: 'Cameroon',
        awayTeam: 'USA',
        matchPlayed: true,
        homeTeamScore: 0,
        awayTeamScore: 3
      }
    ];
    leagueService.setMatches(matches);

    const leaderboard = leagueService.getLeaderboard();

    const firstTeam = leaderboard[0];
    expect(firstTeam.teamName).toBe('USA');
    expect(firstTeam.matchesPlayed).toBe(2);
    expect(firstTeam.goalsFor).toBe(4);
    expect(firstTeam.goalsAgainst).toBe(1);
    expect(firstTeam.points).toBe(4);

    const secondTeam = leaderboard[1];
    expect(secondTeam.teamName).toBe('France');
    expect(secondTeam.matchesPlayed).toBe(2);
    expect(secondTeam.goalsFor).toBe(3);
    expect(secondTeam.goalsAgainst).toBe(1);
    expect(secondTeam.points).toBe(4);

    const thirdTeam = leaderboard[2];
    expect(thirdTeam.teamName).toBe('Cameroon');
    expect(thirdTeam.matchesPlayed).toBe(2);
    expect(thirdTeam.goalsFor).toBe(0);
    expect(thirdTeam.goalsAgainst).toBe(5);
    expect(thirdTeam.points).toBe(0);
  });
});