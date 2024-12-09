<!--
  There's also an alternative approach where we can implement a Vuex store to manage the data.
   By fetching the matches and leaderboard data during the app initialization and storing them in Vuex, 
   we can avoid making an extra API call every time we need to get matches and generate the schedule and leaderboard. 
   This ensures the data is already available in the app, improving performance and making 
   state management more centralized.
-->
<template>
  <div class="flex flex-col h-screen">
    <header class="px-16 flex items-center">
      <div class="logo flex-none">
        <router-link to="/" class="">
          <img src="images/logo.svg" width="110" height="30" alt="logo" />
        </router-link>
      </div>
      <Navbar />
    </header>
    
    <main class="container py-24 mb-auto mx-auto">
      <router-view />
    </main>

    <footer class="px-16 flex items-center justify-end font-bold">
      <div>API Version {{ apiVersion }}</div>
    </footer>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import apiUrl from './api/endpoints';

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      apiUrl,
      apiVersion: ''
    };
  },
  methods: {
    async getApiVersion() {
      try {
        const response = await fetch(apiUrl.getVersion, {
          method: 'GET'
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            this.apiVersion =  data.version;
          } else {
            console.error('Failed to fetch api version:', data.error);
          }
        } else {
          console.error('Error fetching api version:', response.statusText);
        }
      } catch (error) {
          console.error('Error getApiVersion:', error);
      }
      return null;
    },
  },
  mounted() {
    this.getApiVersion(); 
  }
};
</script>

<style>
  header {
    background: #025FEB;
    height: 6rem;
  }
  .container {
    width: 90%;
  }
  h1 {
    text-align: center;
    color: #182C62;
  }
  footer {
    background: #F6F7F7;
    color: #4B5C68;
    min-height: 4rem;
  }
</style>
