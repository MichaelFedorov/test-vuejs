/**
 * A class representing a service that processes the data for match schedule
 * and generates leaderboard.
 * 
 * NOTE: MAKE SURE TO IMPLEMENT ALL EXISITNG METHODS BELOW WITHOUT CHANGING THE INTERFACE OF THEM, 
 *       AND PLEASE DO NOT RENAME, MOVE OR DELETE THIS FILE.  
 * 
 *       ADDITIONALLY, MAKE SURE THAT ALL LIBRARIES USED IN THIS FILE FILE ARE COMPATIBLE WITH PURE JAVASCRIPT
 * 
 */
import apiUrl from '../api/endpoints';

class LeagueService {    
    constructor() {
        this.matches = [];
        this.leaderboard = {};
    }
    
    /**
     * Sets the match schedule.
     * Match schedule will be given in the following form:
     * [
     *      {
     *          matchDate: [TIMESTAMP],
     *          stadium: [STRING],
     *          homeTeam: [STRING],
     *          awayTeam: [STRING],
     *          matchPlayed: [BOOLEAN],
     *          homeTeamScore: [INTEGER],
     *          awayTeamScore: [INTEGER]
     *      },
     *      {
     *          matchDate: [TIMESTAMP],
     *          stadium: [STRING],
     *          homeTeam: [STRING],
     *          awayTeam: [STRING],
     *          matchPlayed: [BOOLEAN],
     *          homeTeamScore: [INTEGER],
     *          awayTeamScore: [INTEGER]
     *      }    
     * ]
     * 
     * @param {Array} matches List of matches.
     */    
    setMatches(matches) {
        this.matches = matches;
    }

    /**
     * Returns the full list of matches.
     * 
     * @returns {Array} List of matches.
     */
    getMatches() {
        return this.matches;
    }

    /**
     * Returns the leaderboard in a form of a list of JSON objecs.
     * 
     * [     
     *      {
     *          teamName: [STRING]',
     *          matchesPlayed: [INTEGER],
     *          goalsFor: [INTEGER],
     *          goalsAgainst: [INTEGER],
     *          points: [INTEGER]     
     *      },      
     * ]       
     * 
     * @returns {Array} List of teams representing the leaderboard.
     */
    getLeaderboard() {
        const teams = {};

        // Initialize team stats from matches
        this.matches.forEach(match => {
            const { homeTeam, awayTeam, homeTeamScore, awayTeamScore, matchPlayed } = match;

            if (!teams[homeTeam]) {
                teams[homeTeam] = { 
                    teamName: homeTeam,
                    matchesPlayed: 0,
                    goalsFor: 0,
                    goalsAgainst: 0,
                    points: 0
                };
            }
            if (!teams[awayTeam]) {
                teams[awayTeam] = { 
                    teamName: awayTeam,
                    matchesPlayed: 0,
                    goalsFor: 0,
                    goalsAgainst: 0,
                    points: 0
                };
            }

            if (matchPlayed) {
                // Update matches played
                teams[homeTeam].matchesPlayed++;
                teams[awayTeam].matchesPlayed++;

                // Update goals for and against
                teams[homeTeam].goalsFor += homeTeamScore;
                teams[homeTeam].goalsAgainst += awayTeamScore;
                teams[awayTeam].goalsFor += awayTeamScore;
                teams[awayTeam].goalsAgainst += homeTeamScore;

                // Update points
                if (homeTeamScore > awayTeamScore) {
                    teams[homeTeam].points += 3; // Home team wins
                } else if (homeTeamScore < awayTeamScore) {
                    teams[awayTeam].points += 3; // Away team wins
                } else {
                    // Draw
                    teams[homeTeam].points += 1; 
                    teams[awayTeam].points += 1;
                }
            }
        });

        // Create an array of teams from the object
        let leaderboard = Object.values(teams);

        // Apply sorting by points, then tiebreakers: head-to-head, goal difference, goals scored, and alphabetic order
        leaderboard.sort((a, b) => {
             // Sort by points (descending)
            if (b.points !== a.points) return b.points - a.points;

            const headToHeadPoints = this.getHeadToHeadPoints(a.teamName, b.teamName);
            // Sort by head-to-head points
            if (headToHeadPoints !== 0) return headToHeadPoints; 

            const goalDifferenceA = a.goalsFor - a.goalsAgainst;
            const goalDifferenceB = b.goalsFor - b.goalsAgainst;

            // Sort by goal difference
            if (goalDifferenceB !== goalDifferenceA) return goalDifferenceB - goalDifferenceA;

            // Sort by goals scored
            if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor; 

            // Sort alphabetical order
            return a.teamName.localeCompare(b.teamName); 
        });

        return leaderboard;
    }

    /**
     * Get head-to-head points between two teams.
     * @param {string} teamA Name of team A.
     * @param {string} teamB Name of team B.
     * @returns {number} Head-to-head points difference.
     */
    getHeadToHeadPoints(teamA, teamB) {
        let pointsA = 0;
        let pointsB = 0;

        // Find all matches between teamA and teamB
        this.matches.forEach(match => {
            const { homeTeam, awayTeam, homeTeamScore, awayTeamScore, matchPlayed } = match;
            if (!matchPlayed) return;

            if ((homeTeam === teamA && awayTeam === teamB) || (homeTeam === teamB && awayTeam === teamA)) {
                if (homeTeamScore > awayTeamScore) {
                    if (homeTeam === teamA) {
                        pointsA += 3
                    } else { 
                        pointsB += 3
                    };
                } else if (homeTeamScore < awayTeamScore) {
                    if (awayTeam === teamA) {
                        pointsA += 3;
                    } else {
                        pointsB += 3;
                    }
                } else {
                    pointsA += 1;
                    pointsB += 1;
                }
            }
        });

        return pointsB - pointsA; // Return the difference in points between teamB and teamA
    }

    /**
     * Fetches the access token from the backend.
     * 
     * @returns {Promise<string>} The access token.
     */
    async fetchAccessToken() {
        try {
            const response = await fetch(apiUrl.getAccessToken, {
                method: 'GET'
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    return data.access_token;
                } else {
                    console.error('Failed to fetch access token:', data.error);
                }
            } else {
                console.error('Error fetching access token:', response.statusText);
            }
        } catch (error) {
            console.error('Error during fetchAccessToken:', error);
        }
        return null;
    }

    /**
    * Asynchronic function to fetch the data from the server and set the matches.
    */
    async fetchData() {
        try {
            // First, get the access token
            this.accessToken = await this.fetchAccessToken();

            if (!this.accessToken) {
                throw new Error('Access token is required to fetch matches');
            }

            // Use the access token to fetch matches
            const response = await fetch(apiUrl.getAllMatches, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    this.setMatches(data.matches);
                } else {
                    console.error('Failed to fetch matches:', data.error);
                }
            } else {
                console.error('Error fetching matches:', response.statusText);
            }
        } catch (error) {
            console.error('Error during fetchData:', error);
        }
    }
}

export default LeagueService;