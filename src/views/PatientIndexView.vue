<template>
	<div class="flex justify-between items-center">
		<h1 class="text-2xl">Patient records</h1>
		<CreatePatientModal />
	</div>
	<span class="text-surface-400">Administrator: {{ username }}</span>

	<ul class="my-10">
		<li v-for="patient in patientStore.getPatients" >
			<router-link :to="`/patients/${patient._id}`"  class="flex mb-3 justify-between items-center shadow-md p-4 rounded outline outline-1 outline-surface-200">
				<div class="flex flex-col">
					<span class="font-bold">{{  patient.name }}</span>
					<span>{{  patient.additional_info }}</span>
				</div>

				<Badge severity="warning" :value="`${patient.pdfs.length}`" />
			</router-link>
		</li>
	</ul>
</template>


<script setup>
import { computed, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth.store';
import { usePatientStore } from '@/stores/patient.store';
import CreatePatientModal from '@/components/CreatePatientModal.vue';
import Badge from 'primevue/badge';


const patientStore = usePatientStore();
const authStore = useAuthStore();

const username = computed(() => authStore.displayName || authStore.email);

onMounted(async() => {
	await patientStore.fetchPatients();
});



</script>
