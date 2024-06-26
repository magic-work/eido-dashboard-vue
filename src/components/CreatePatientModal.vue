<template>

  <Button @click="visible = true" label="Add Patient" icon="fas fa-plus" size="small" />

  <Dialog v-model:visible="visible" modal header="Create patient record">
    <span class="text-surface-600 dark:text-surface-0/70 block mb-5">Fill in the form fields to create a new patient
      record.</span>

    <form @submit.prevent="handleAddPatient" class="flex flex-col gap-6 mt-10">
      <TextInput label="Patient name" identifier="patient_name" v-model="formData.name" required />
      <TextInput label="Patient additional info" identifier="patient_info" v-model="formData.additional_info"
        required />

      <div class="flex justify-end gap-2">
        <Button type="button" label="Cancel" outlined @click="visible = false"></Button>
        <Button type="submit" label="Save"></Button>
      </div>
    </form>
  </Dialog>


</template>


<script setup>
import { ref, reactive } from "vue";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import TextInput from "@/components/ui/TextInput.vue";
import { usePatientStore } from '@/stores/patient.store';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const visible = ref(false);
const patientStore = usePatientStore();
const sending = ref(false);

const formData = reactive({
  name: '',
  additional_info: '',
  pdfs: []
});

const handleAddPatient = async () => {
  sending.value = true;
  const toastResponse = await patientStore.createPatient(formData);
  toast.add(toastResponse);
  if (toastResponse.severity === 'error') return
  visible.value = false;
  sending.value = false;
  formData.name = '';
  formData.additional_info = '';
  formData.pdfs = [];
  await patientStore.fetchPatients();
}
</script>
