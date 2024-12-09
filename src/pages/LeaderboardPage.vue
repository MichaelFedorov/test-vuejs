<template>
    <h1 class="text-h1 font-bold pb-8">League Standings</h1>
    <Leaderboard />
</template>

<script>
import Leaderboard from '../components/Leaderboard.vue';

export default {
  components: {
    Leaderboard,
  },
};
</script>