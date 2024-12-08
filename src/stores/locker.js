import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useLockerStore = defineStore('locker', () => {
  const lockers = ref([]);
  const users = ref([]);

  // Initialize lockers
  const initializeLockers = () => {
    if (lockers.value.length === 0) {
      for (let i = 1; i <= 20; i++) {
        const lockerId = `ST-${String(i).padStart(3, '0')}`;
        lockers.value.push({
          id: lockerId,
          occupied: false,
          registrant: null,
        });
      }
    }
  };

  // Generate serial number
  const generateSerialNumber = () => {
    return `SN-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  };

  // Register user
  const registerUser = (userData) => {
    const serialNumber = generateSerialNumber();
    const paymentProofUrl = userData.paymentProof ? URL.createObjectURL(userData.paymentProof) : null;
    
    users.value.push({
      ...userData,
      serialNumber,
      paymentProofUrl
    });
    return serialNumber;
  };

  // Remove user
  const removeUser = (serialNumber) => {
    users.value = users.value.filter((u) => u.serialNumber !== serialNumber);
  };

  // Assign locker
  const assignLocker = (serialNumber, lockerId) => {
    const locker = lockers.value.find((l) => l.id === lockerId);
    const user = users.value.find((u) => u.serialNumber === serialNumber);

    if (locker && user) {
      locker.occupied = true;
      locker.registrant = serialNumber;

      // Add lockerId to the user's data
      user.lockerId = lockerId;
    }
  };

  // Remove locker assignment
  const removeAssignment = (serialNumber, lockerId) => {
    const locker = lockers.value.find((l) => l.id === lockerId);
  
    if (locker && locker.registrant === serialNumber) {
      // Reset the locker
      locker.occupied = false;
      locker.registrant = null;
  
      // Completely remove the user from the `users` array
      users.value = users.value.filter((user) => user.serialNumber !== serialNumber);
    }
  };
  

  // Computed properties
  const availableLockers = computed(() =>
    lockers.value.filter((l) => !l.occupied)
  );

  const unassignedUsers = computed(() =>
    users.value.filter((user) => !user.lockerId) // Users without a locker
  );

  const assignedUsers = computed(() =>
    users.value.filter((user) => user.lockerId).map((user) => ({
      ...user,
      lockerId: user.lockerId, // Ensure lockerId is available
    }))
  );

  return {
    lockers,
    users,
    initializeLockers,
    registerUser,
    removeUser,
    assignLocker,
    removeAssignment,
    availableLockers,
    unassignedUsers,
    assignedUsers,
  };
});
