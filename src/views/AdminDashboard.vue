<template>
  <div class="container mx-auto p-8">
    <h2 class="text-3xl font-bold mb-8 text-primary-800">Admin Dashboard</h2>

    <!-- Unassigned Users Table -->
    <div class="mb-12">
      <h3 class="text-xl font-semibold mb-4">Unassigned Users</h3>
      <DataTable :value="unassignedUsers" class="p-datatable-sm">
        <Column field="serialNumber" header="Serial Number"></Column>
        <Column field="name" header="Name"></Column>
        <Column field="studentId" header="Student ID"></Column>
        <Column field="studentadd" header="Student Address"></Column>
        <Column field="contactNo" header="Contact"></Column>
        <Column field="email" header="Email"></Column>
        <Column field="subscriptionPlan" header="Subscription Plan"></Column>
        <Column field="refernum" header="Reference No."></Column>
        <Column header="Payment Proof">
          <template #body="slotProps">
            <img 
              v-if="slotProps.data.paymentProofUrl"
              :src="slotProps.data.paymentProofUrl"
              alt="Payment Proof"
              class="w-16 h-16 object-cover rounded cursor-pointer"
              @click="showPaymentProof(slotProps.data.paymentProofUrl)"
            />
          </template>
        </Column>
        <Column header="Actions">
          <template #body="slotProps">
            <Button
              icon="pi pi-key"
              severity="success"
              @click="showAssignModal(slotProps.data)"
            />
            <Button
              icon="pi pi-trash"
              severity="danger"
              class="ml-2"
              @click="removeUser(slotProps.data.serialNumber)"
            />
          </template>
        </Column>
      </DataTable>
    </div>

    <!-- Assigned Users Table -->
    <div>
      <h3 class="text-xl font-semibold mb-4">Assigned Users</h3>
      <DataTable :value="assignedUsers" class="p-datatable-sm">
        <Column field="serialNumber" header="Serial Number"></Column>
        <Column field="name" header="Name"></Column>
        <Column field="studentId" header="Student ID"></Column>
        <Column field="studentadd" header="Student Address"></Column>
        <Column field="contactNo" header="Contact"></Column>
        <Column field="email" header="Email"></Column>
        <Column field="subscriptionPlan" header="Subscription Plan"></Column>
        <Column field="refernum" header="Reference No."></Column>
        <Column field="lockerId" header="Locker ID"></Column>
        <Column header="Payment Proof">
          <template #body="slotProps">
            <img 
              v-if="slotProps.data.paymentProofUrl"
              :src="slotProps.data.paymentProofUrl"
              alt="Payment Proof"
              class="w-16 h-16 object-cover rounded cursor-pointer"
              @click="showPaymentProof(slotProps.data.paymentProofUrl)"
            />
          </template>
        </Column>
        <Column header="Actions">
          <template #body="slotProps">
            <Button
              icon="pi pi-trash"
              severity="danger"
              @click="removeAssignment(slotProps.data.serialNumber, slotProps.data.lockerId)"
            />
          </template>
        </Column>
      </DataTable>
    </div>

    <!-- Assign Locker Dialog -->
    <Dialog v-model:visible="showAssignLockerModal" modal header="Assign Locker">
      <div class="p-4">
        <Dropdown
          v-model="selectedLocker"
          :options="availableLockers"
          optionLabel="id"
          placeholder="Select a locker"
          class="w-full mb-4"
        />
        <Button
          label="Assign"
          @click="assignLockerToUser"
          :disabled="!selectedLocker"
          class="w-full"
        />
      </div>
    </Dialog>
    <!-- Payment Proof Preview Modal -->
    <Dialog v-model:visible="showProofModal" modal header="Payment Proof">
      <div class="p-4">
        <img 
          :src="selectedProofUrl" 
          alt="Payment Proof"
          class="max-w-full h-auto rounded-lg"
        />
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useLockerStore } from '../stores/locker';
import Dropdown from 'primevue/dropdown';

const store = useLockerStore();

// Modal and form data
const showAssignLockerModal = ref(false);
const showProofModal = ref(false); // Declare this
const selectedLocker = ref(null);
const selectedUser = ref(null);
const selectedProofUrl = ref('');

// Computed properties from the store
const unassignedUsers = computed(() => store.unassignedUsers);
const assignedUsers = computed(() => store.assignedUsers);
const availableLockers = computed(() => store.availableLockers);

// Show Assign Locker Modal
const showAssignModal = (user) => {
  selectedUser.value = user;
  showAssignLockerModal.value = true;
};

//Show Payment Proof
const showPaymentProof = (url) => {
  selectedProofUrl.value = url;
  showProofModal.value = true;
};


// Assign Locker to User
const assignLockerToUser = () => {
  if (selectedUser.value && selectedLocker.value) {
    store.assignLocker(selectedUser.value.serialNumber, selectedLocker.value.id);
    showAssignLockerModal.value = false;
    selectedLocker.value = null;
    selectedUser.value = null;
  }
};

// Remove User
const removeUser = (serialNumber) => {
  if (confirm('Are you sure you want to remove this user?')) {
    store.removeUser(serialNumber);
  }
};

// Remove Locker Assignment
const removeAssignment = (serialNumber, lockerId) => {
  if (confirm('Are you sure you want to remove this assignment?')) {
    store.removeAssignment(serialNumber, lockerId);
  }
};
</script>
