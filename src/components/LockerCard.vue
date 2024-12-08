<template>
  <div 
    class="relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl"
    :class="[locker.occupied ? 'bg-red-50' : 'bg-green-50']"
  >
    <div class="absolute top-0 right-0 w-16 h-16">
      <div 
        class="absolute transform rotate-45 bg-gradient-to-r w-24 h-24 -top-12 -right-12"
        :class="[locker.occupied ? 'from-red-400 to-red-500' : 'from-green-400 to-green-500']"
      ></div>
    </div>
    
    <div class="relative p-6">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-2xl font-bold text-gray-800">{{ locker.id }}</h3>
      </div>
      
      <div class="space-y-2">
        <p class="text-sm" :class="[locker.occupied ? 'text-red-600' : 'text-green-600']">
          {{ locker.occupied ? 'Occupied' : 'Available' }}
        </p>
        <p v-if="locker.occupied" class="text-sm text-gray-600 font-medium">
          ID: {{ locker.registrant }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  locker: {
    type: Object,
    required: true
  }
});
</script>