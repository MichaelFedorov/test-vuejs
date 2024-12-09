import { createRouter, createWebHistory } from 'vue-router';
import SchedulePage from './pages/SchedulePage.vue';
import LeaderboardPage from './pages/LeaderboardPage.vue';
import NotFoundPage from './pages/NotFoundPage.vue';

const routes = [
  { path: '/', component: SchedulePage },
  { path: '/schedule', component: SchedulePage },
  { path: '/leaderboard', component: LeaderboardPage },
  { path: '/notFound', component: NotFoundPage },
  { path: '/:pathMatch(.*)*', redirect: '/notFound' }, // Fallback to 404
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;