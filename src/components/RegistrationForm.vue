<template>
  <div>
    <form @submit.prevent="handleSubmit" class="space-y-6" autocomplete="on">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="field">
          <label for="name">Full Name</label>
          <InputText 
            id="name" 
            v-model="formData.name" 
            placeholder="Enter your full name"
            class="p-inputtext-sm" 
            required 
          />
        </div>

        <div class="field">
          <label for="studentId">Student ID</label>
          <InputText 
            id="studentId" 
            v-model="formData.studentId" 
            placeholder="Enter your student ID"
            class="p-inputtext-sm" 
            required 
          />
        </div>

        <div class="field col-span-2">
          <label for="studentadd">Address</label>
          <InputText 
            id="studentadd" 
            v-model="formData.studentadd" 
            placeholder="Enter your complete address"
            class="p-inputtext-sm" 
            required 
          />
        </div>

        <div class="field">
          <label for="contactNo">Contact Number</label>
          <InputText 
            id="contactNo" 
            v-model="formData.contactNo" 
            placeholder="11-digit mobile number"
            class="p-inputtext-sm" 
            pattern="\d{11}"
            required 
          />
          <small class="text-gray-500">Format: 09XXXXXXXXX</small>
        </div>

        <div class="field">
          <label for="email">Email Address</label>
          <InputText 
            id="email" 
            v-model="formData.email" 
            type="email" 
            placeholder="Enter your email"
            class="p-inputtext-sm" 
            required 
          />
        </div>

        <div class="field">
          <label for="subscriptionPlan">Subscription Plan</label>
          <Dropdown
            id="subscriptionPlan"
            v-model="formData.subscriptionPlan"
            :options="subscriptionPlans"
            optionLabel="name"
            optionValue="value"
            placeholder="Select your plan"
            class="p-inputtext-sm"
            @change="showPaymentQR"
            required
          />
        </div>

        <div class="field">
          <label for="refernum">Reference Number</label>
          <InputText 
            id="refernum" 
            v-model="formData.refernum" 
            placeholder="Payment reference number"
            class="p-inputtext-sm" 
            required 
          />
        </div>
      </div>
      <div class="field col-span-2">
          <label for="paymentProof">Payment Proof</label>
          <div class="flex flex-col gap-2">
            <input
              type="file"
              id="paymentProof"
              accept="image/*"
              @change="handleImageUpload"
              class="hidden"
              required
            />
            <label
              for="paymentProof"
              class="p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-500 transition-colors flex flex-col items-center gap-3"
            >
              <div v-if="!formData.paymentProof" class="flex flex-col items-center gap-2">
                <i class="pi pi-upload text-3xl text-gray-500"></i>
                <span class="text-sm text-gray-600">Click to upload payment proof</span>
                <span class="text-xs text-gray-500">Supported formats: JPG, PNG</span>
              </div>
              <div v-else class="w-full">
                <div class="relative w-48 h-48 mx-auto">
                  <img
                    :src="previewImage"
                    alt="Payment Proof"
                    class="w-full h-full object-cover rounded-lg shadow-sm"
                  />
                  <button 
                    type="button"
                    @click.prevent="removeImage"
                    class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                  >
                    <i class="pi pi-times"></i>
                  </button>
                </div>
                <p class="text-sm text-center mt-2 text-gray-600">
                  Click to change image
                </p>
              </div>
            </label>
          </div>
      </div>

      <div class="pt-4">
        <Button 
          type="submit" 
          label="Register" 
          icon="pi pi-check" 
          class="w-full p-button-lg"
        />
      </div>
    </form>

    <PaymentQRModal
      v-model:visible="showQRModal"
      :plan="selectedPlan"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useLockerStore } from '../stores/locker';
import Dropdown from 'primevue/dropdown';
import PaymentQRModal from './PaymentQRModal.vue';

const emit = defineEmits(['registration-success']);
const store = useLockerStore();

const showQRModal = ref(false);
const selectedPlan = ref('');
const previewImage = ref('');

const subscriptionPlans = [
  { name: 'Monthly (₱350)', value: 'Monthly' },
  { name: 'Semestral (₱1,663)', value: 'Semestral' },
  { name: 'Yearly (₱3,150)', value: 'Yearly' }
];

const formData = ref({
  name: '',
  studentId: '',
  studentadd: '',
  contactNo: '',
  email: '',
  subscriptionPlan: '',
  refernum: '',
  paymentProof: null
});

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    formData.value.paymentProof = file;
    previewImage.value = URL.createObjectURL(file);
  }
};

const removeImage = () => {
  formData.value.paymentProof = null;
  previewImage.value = '';
  document.getElementById('paymentProof').value = '';
};

const showPaymentQR = () => {
  selectedPlan.value = formData.value.subscriptionPlan;
  showQRModal.value = true;
};

const handleSubmit = () => {
  const serialNumber = store.registerUser(formData.value);
  emit('registration-success', serialNumber);
  formData.value = {
    name: '',
    studentId: '',
    studentadd: '',
    contactNo: '',
    email: '',
    subscriptionPlan: '',
    refernum: '',
    paymentProof: null
  };
  previewImage.value = '';
};
</script>

<style scoped>
.p-button-lg {
  padding: 1rem 2rem;
  font-size: 1.1rem;
}
</style>