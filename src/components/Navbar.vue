<template>
  <nav class="ml-auto">
      <ul class="nav flex space-x-8 sm:space-x-16">
        <li class="nav-item">
          <router-link to="/schedule" class="nav-link nav-link__schedule text-white">
            <i class="icon icon-schedule"></i> Schedule
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/leaderboard" class="nav-link nav-link__leaderboard text-white">
            <i class="icon icon-leaderboard"></i> Leaderboard
          </router-link>
        </li>
      </ul>
  </nav>
</template>

<style>
.icon {
  display: inline-block;
  vertical-align: middle;
  width: 2.5rem;
  height: 2.5rem;
  background-size: cover;
  background-position: 0 0;
  background-repeat: no-repeat
}
.icon-schedule {
  background-image: url('/images/schedule.png');
}
.icon-leaderboard {
  background-image: url('/images/leaderboard.png');
}
</style>