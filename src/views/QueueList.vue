<template>
  <div class="container mx-auto p-8">
    <h2 class="text-3xl font-bold mb-8 text-primary-800">Queue List</h2>
    <DataTable :value="unassignedUsers" class="p-datatable-sm">
      <Column field="serialNumber" header="Serial Number"></Column>
      <Column field="subscriptionPlan" header="Subscription Plan"></Column>
    </DataTable>
  </div>
</template>

<script setup>
import { useLockerStore } from '../stores/locker';

const store = useLockerStore();
const unassignedUsers = store.unassignedUsers;
</script>