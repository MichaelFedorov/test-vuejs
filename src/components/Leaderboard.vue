<template>
  <table class="table-auto w-full border-collapse text-center">
    <thead>
      <tr class="bg-gray-100">
        <th class="border-t p-2 text-left">Team Name</th>
        <th class="border-t p-2">MP</th>
        <th class="border-t p-2 hidden md:table-cell">GF</th>
        <th class="border-t p-2 hidden md:table-cell">GA</th>
        <th class="border-t p-2 md:hidden">GD</th>
        <th class="border-t p-2">Points</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="team in leaderboard"
        :key="team.teamName"
      >
        <td class="border-t p-2 bold text-left">
          <img :src="`${apiUrl.flagApi}${team.teamName}.png`" class="mr-4" :alt="team.teamName" />
          {{ team.teamName }}
        </td>
        <td class="border-t p-2">{{ team.matchesPlayed }}</td>
        <td class="border-t p-2 hidden md:table-cell">{{ team.goalsFor }}</td>
        <td class="border-t p-2 hidden md:table-cell">{{ team.goalsAgainst }}</td>
        <td class="border-t p-2 md:hidden">{{ team.goalsFor - team.goalsAgainst }}</td>
        <td class="border-t p-2 bold">{{ team.points }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import LeagueService from '../services/LeagueService';
import apiUrl from '../api/endpoints';

export default {
  data() {
    return {
      apiUrl,
      leaderboard: [],
    };
  },
  async mounted() {
    const leagueService = new LeagueService();
    await leagueService.fetchData();
    this.leaderboard = leagueService.getLeaderboard();
  }
};
</script>

<style scoped>
  table tr td:last-child {
    color: #025FEB;
  }
</style>
