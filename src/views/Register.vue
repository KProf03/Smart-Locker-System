<template>
  <div class="container mx-auto p-8">
    <div class="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 class="text-3xl font-bold mb-8 text-primary-800">Registration Form</h2>
      <RegistrationForm @registration-success="handleRegistrationSuccess" />
    </div>

    <Dialog v-model:visible="showSuccessModal" modal header="Registration Successful">
      <div class="p-4">
        <p>You have successfully registered. Your application is currently being processed.</p>
        <p class="font-semibold mt-2">Serial Number: {{ serialNumber }}</p>
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import RegistrationForm from '../components/RegistrationForm.vue';

const showSuccessModal = ref(false);
const serialNumber = ref('');

const handleRegistrationSuccess = (newSerialNumber) => {
  serialNumber.value = newSerialNumber;
  showSuccessModal.value = true;
};
</script>