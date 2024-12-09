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
      paymentProofUrl,
      dateRegistered: new Date().toISOString(), // Add dateRegistered
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

      // Add lockerId and dateAssigned to the user's data
      user.lockerId = lockerId;
      user.dateAssigned = new Date().toISOString(); // Record the current date
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

  // Calculate countdown days
  const calculateCountdownDays = (subscriptionPlan, dateAssigned) => {
    const now = new Date();
    const assignedDate = new Date(dateAssigned);

    let durationInDays = 0;

    if (subscriptionPlan === "Monthly") {
      durationInDays = 30; // 30 days
    } else if (subscriptionPlan === "Semestral") {
      durationInDays = 182; // Approx. 6 months (182 days)
    } else if (subscriptionPlan === "Yearly") {
      durationInDays = 365; // 1 year (365 days)
    }

    const expirationDate = new Date(assignedDate);
    expirationDate.setDate(assignedDate.getDate() + durationInDays);

    const diffInTime = expirationDate.getTime() - now.getTime();
    const remainingDays = Math.ceil(diffInTime / (1000 * 60 * 60 * 24)); // Convert milliseconds to days

    return Math.max(remainingDays, 0); // Ensure it doesn't go negative
  };

  // Computed properties
  const availableLockers = computed(() =>
    lockers.value.filter((l) => !l.occupied)
  );

  const unassignedUsers = computed(() =>
    users.value.filter((user) => !user.lockerId) // Users without a locker
  );

  const assignedUsers = computed(() =>
    users.value
      .filter((user) => user.lockerId)
      .map((user) => ({
        ...user,
        countdown: calculateCountdownDays(user.subscriptionPlan, user.dateAssigned), // Add countdown
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
