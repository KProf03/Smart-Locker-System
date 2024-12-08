<template>
  <div class="container mx-auto p-8">
    <h2 class="text-3xl font-bold mb-8 text-primary-800">Locker Grid</h2>
    <div class="grid grid-cols-5 gap-6">
      <LockerCard 
        v-for="locker in lockers" 
        :key="locker.id"
        :locker="locker"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useLockerStore } from '../stores/locker';
import LockerCard from '../components/LockerCard.vue';

const store = useLockerStore();

onMounted(() => {
  store.initializeLockers();
});

const lockers = store.lockers;
</script>