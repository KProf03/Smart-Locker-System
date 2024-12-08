<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-primary-800 text-white p-4">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-2xl font-bold">LOCKER SYSTEM</h1>
        <div class="flex gap-4">
          <router-link to="/" class="hover:text-primary-200">LOCKERS</router-link>
          <router-link to="/register" class="hover:text-primary-200">REGISTER</router-link>
          <router-link to="/queue" class="hover:text-primary-200">QUEUE LIST</router-link>
          <Button @click="showLoginModal = true" severity="secondary" text>LOGIN</Button>
        </div>
      </div>
    </nav>

    <router-view></router-view>

    <!-- Login Modal -->
    <Dialog v-model:visible="showLoginModal" modal header="Admin Login" :style="{ width: '400px' }">
      <form @submit.prevent="handleLogin" class="flex flex-col gap-4">
        <div class="field">
          <label for="username">Username</label>
          <InputText id="username" v-model="username" class="w-full" />
        </div>
        <div class="field">
          <label for="password">Password</label>
          <Password id="password" v-model="password" toggleMask class="w-full" />
        </div>
        <small v-if="loginError" class="text-red-500">Invalid username or password</small>
        <Button type="submit" label="Login" />
      </form>
    </Dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';


const router = useRouter();
const showLoginModal = ref(false);
const username = ref('');
const password = ref('');
const loginError = ref(false);

const handleLogin = () => {

  if (username.value === 'admin' && password.value === 'admin') {
    showLoginModal.value = false;
    router.push('/admin');
    loginError.value = false;
  } else {
    loginError.value = true;
  }
};
</script>

<style>
@import 'primevue/resources/themes/lara-light-blue/theme.css';
@import 'primevue/resources/primevue.min.css';
@import 'primeicons/primeicons.css';
</style>