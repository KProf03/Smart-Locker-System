<template>
  <Dialog 
    :visible="visible" 
    :modal="true" 
    :header="title"
    @update:visible="$emit('update:visible', $event)"
    class="payment-modal"
  >
    <div class="p-6 text-center">
      <h3 class="text-xl font-semibold mb-4">{{ amount }}</h3>
      <img 
        :src="imageSrc" 
        :alt="`${props.plan} Payment QR Code`"
        class="mx-auto max-w-[250px] mb-4"
      />
      <p class="text-sm text-gray-600">Scan the QR code to complete your payment</p>
    </div>
  </Dialog>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  visible: Boolean,
  plan: String
});

defineEmits(['update:visible']);

const title = computed(() => `${props.plan} Plan Payment`);
const amount = computed(() => {
  switch (props.plan) {
    case 'Monthly':
      return '₱350';
    case 'Semestral':
      return '₱1,663';
    case 'Yearly':
      return '₱3,150';
    default:
      return '';
  }
});

// Dynamically determine the image source based on the plan
const imageSrc = computed(() => {
  switch (props.plan) {
    case 'Monthly':
      return '/images/qr-monthly.png'; // Replace with the path for the monthly QR code
    case 'Semestral':
      return '/images/qr-semestral.png'; // Replace with the path for the semestral QR code
    case 'Yearly':
      return '/images/qr-yearly.png'; // Replace with the path for the yearly QR code
    default:
      return '/images/qr-default.png'; // Fallback/default QR code
  }
});
</script>
