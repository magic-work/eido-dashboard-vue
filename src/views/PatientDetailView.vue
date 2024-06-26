<template>
  <div v-if="patient">
    <h1 class="font-bold text-xl">{{ patient.name }}</h1>
    <span class="text-sm">Record created {{ formatDate(patient.created_at_utc) }}</span>
    <p class="text-surface-900 shadow p-3 my-6 rounded">{{ patient.additional_info }}</p>

    <div class="grid grid-cols-3 place-content-center gap-3">
      <div v-for="pdf in patient.pdfs" :key="pdf._id"
        class="flex flex-col justify-center items-center gap-3 bg-surface-50 p-3 rounded-lg shadow">
        <i class="fas fa-file-pdf text-4xl" />
        <span class="text-lg text-surface-900">{{ pdf.title }}</span>
      </div>
    </div>
  </div>
</template>


<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { usePatientStore } from '@/stores/patient.store';
import { format } from 'date-fns';

const route = useRoute();
const patientStore = usePatientStore();
const patient = computed(() => patientStore.getCurrentPatient);

patientStore.fetchPatientDetail(route.params.id);

const formatDate = (timestamp) => {
  return format(new Date(timestamp + 'Z'), 'MMMM d, hh:mm a');
}

</script>
