import { createRouter, createWebHistory } from 'vue-router';
import LockerGrid from '../views/LockerGrid.vue';
import Register from '../views/Register.vue';
import QueueList from '../views/QueueList.vue';
import AdminDashboard from '../views/AdminDashboard.vue';

const routes = [
  { path: '/', component: LockerGrid },
  { path: '/register', component: Register },
  { path: '/queue', component: QueueList },
  { path: '/admin', component: AdminDashboard }
];

export default createRouter({
  history: createWebHistory(),
  routes
});