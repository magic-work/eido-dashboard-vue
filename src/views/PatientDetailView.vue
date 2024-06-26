<template>

<div v-if="patient">


  <h1 class="font-bold text-xl">{{ patient.name }}</h1>
  <span class="text-sm">Record created {{ formatDate(patient.created_at_utc) }}</span>
  <p class="text-surface-900 shadow p-3 my-6 rounded">{{ patient.additional_info }}</p>


</div>
</template>


<script setup>
import { computed } from 'vue';
import { usePatientStore } from '@/stores/patient.store';
import { useRoute } from 'vue-router';
import { format } from 'date-fns';

const route = useRoute();

const patientStore = usePatientStore();

const patient = computed(() => patientStore.getCurrentPatient);

patientStore.fetchPatientDetail(route.params.id);

const formatDate = (timestamp) => {
  return format(new Date(timestamp + 'Z'), 'MMMM d, hh:mm a');
}

</script>
