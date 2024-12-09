<template>
  <table class="table-auto w-full border-collapse text-left">
    <thead>
      <tr class="bg-gray-100">
        <th class="border-t w-40 p-2 text-right sm:table-cell hidden">Date/Time</th>
        <th class="border-t w-16 sm:table-cell hidden"></th>
        <th class="border-t p-2 lg:table-cell hidden">Stadium</th>
        <th class="border-t p-2 text-right">Home Team</th>
        <th class="border-t p-2 text-center"></th>
        <th class="border-t p-2">Away Team</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(match, index) in matches"
        :key="match.matchDate"
        :class="{'even': index % 2 !== 0}"
      >
        <td class="border-t w-40 p-2 text-right sm:table-cell hidden">{{ formatDate(match.matchDate) }}</td>
        <td class="border-t w-16 sm:table-cell hidden"></td>
        <td class="border-t p-2 lg:table-cell hidden">{{ match.stadium }}</td>
        <td class="border-t p-2 bold text-right">
          {{ match.homeTeam }}
          <img :src="`${apiUrl.flagApi}${match.homeTeam}.png`" class="ml-4" :alt="match.homeTeam" />
        </td>
        <td class="border-t p-2 bold text-center">
          <span v-if="match.matchPlayed">
            {{ match.homeTeamScore }}
            <span class="px-1">:</span>
            {{ match.awayTeamScore }}
          </span>
          <span v-else>- <span class="px-1">:</span> -</span>
        </td>
        <td class="border-t p-2 bold">
          <img :src="`${apiUrl.flagApi}${match.awayTeam}.png`" class="mr-4" :alt="match.awayTeam" />
          {{ match.awayTeam }}
        </td>
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
      matches: [], // This will hold the fetched matches
    };
  },
  methods: {
    async fetchMatches() {
      const leagueService = new LeagueService();
      await leagueService.fetchData(); // Fetch the data from the API
      this.matches = leagueService.getMatches();
    },
    formatDate(timestamp) {
      const date = new Date(timestamp);
      return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
    }
  },
  mounted() {
    this.fetchMatches(); // Fetch the matches when the component is mounted
  }
};
</script>

<style>
  table {
    font-size: 1.4rem;
    color: #4B5C68;
  }
  
  table th {
    height: 4rem;
    font-weight: 600;
    font-size: 1.2rem;
    background-color: #E4EDF2;
  }

  table td {
    height: 7rem;
  }

  table .even td {
    background-color: #F6F7F7;
  }

  table .bold {
    font-weight: 600;
    font-size: 1.6rem;
  }

  table img {
    display: inline-block;
    width: 5.7rem;
    height: 3.2rem;
  }
</style>