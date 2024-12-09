<template>
  <div class="container mx-auto p-8 relative">
    <h2 class="text-3xl font-bold mb-8 text-primary-800">Locker Grid</h2>
    <div class="grid grid-cols-5 gap-6">
      <LockerCard 
        v-for="locker in lockers" 
        :key="locker.id"
        :locker="locker"
      />
    </div>

    <!-- Contact Button -->
    <button
      class="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none"
      @click="showContactModal = true"
    >
      Contact Us
    </button>

    <!-- Contact Form Modal -->
    <div
      v-if="showContactModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg shadow-lg p-8 w-96">
        <h3 class="text-xl font-semibold mb-4">Contact Us</h3>
        <form @submit.prevent="submitContactForm">
          <div class="mb-4">
            <label for="name" class="block text-sm font-medium mb-1">Name</label>
            <input
              id="name"
              v-model="contactForm.name"
              type="text"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium mb-1">Email</label>
            <input
              id="email"
              v-model="contactForm.email"
              type="email"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div class="mb-4">
            <label for="message" class="block text-sm font-medium mb-1">Message</label>
            <textarea
              id="message"
              v-model="contactForm.message"
              rows="4"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              required
            ></textarea>
          </div>
          <div class="flex justify-end space-x-2">
            <button
              type="button"
              class="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 focus:outline-none"
              @click="closeContactModal"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { onMounted } from 'vue';
import { useLockerStore } from '../stores/locker';
import LockerCard from '../components/LockerCard.vue';

// Locker store setup
const store = useLockerStore();
onMounted(() => {
  store.initializeLockers();
});
const lockers = store.lockers;

// Contact modal state
const showContactModal = ref(false);

// Contact form data
const contactForm = ref({
  name: '',
  email: '',
  message: '',
});

// Submit contact form
const submitContactForm = () => {
  console.log('Contact Form Submitted:', contactForm.value);

  // Clear the form and close the modal
  contactForm.value = {
    name: '',
    email: '',
    message: '',
  };
  showContactModal.value = false;

  alert('Your message has been sent!');
};

// Close contact modal
const closeContactModal = () => {
  showContactModal.value = false;
};
</script>

<style scoped>
/* Optional: Custom styles for modal overlay or button */
</style>
