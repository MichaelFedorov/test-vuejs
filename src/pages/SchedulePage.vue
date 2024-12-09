<template>
  <h1 class="text-h1 font-bold pb-8">League Schedule</h1>
  <ScheduleTable />
</template>

<script>
import ScheduleTable from '../components/ScheduleTable.vue';

export default {
  components: {
    ScheduleTable,
  },
};
</script>