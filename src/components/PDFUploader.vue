<template>
  <div v-if="uploading" class="flex flex-col justify-center items-center">
    <ProgressSpinner />
    <span>Uploading pdf...</span>
  </div>
  <div v-else class="pr-10 py-10">
    <div class="flex flex-col">
      <span>PDF title</span>
    <InputText v-model="pdfTitle" class="mb-4" />
    </div>
    <FileUpload @uploader="handleUpload" :auto="true" customUpload :multiple="false" accept="application/pdf"
      :maxFileSize="20000000">
      <template #empty>
        <p class="text-center">Upload a new PDF document</p>
      </template>
    </FileUpload>
  </div>
</template>

<script setup>
import { useToast } from "primevue/usetoast";
import { ref } from 'vue';
import FileUpload from 'primevue/fileupload';
import { usePatientStore } from "@/stores/patient.store";
import InputText from 'primevue/inputtext';
import ProgressSpinner from 'primevue/progressspinner';

const patientStore = usePatientStore();
const toast = useToast();
const pdfTitle = ref(null);
const uploading = ref(false);

const handleUpload = async (event) => {
  const file = event.files[0];
  if (!pdfTitle.value) {
    toast.add({ severity: 'info', summary: "Problem sending the verification email", detail: 'Please enter a title for the PDF', life: 5000 })
    return;
  }
  if (file && file.type === "application/pdf") {
    const formData = new FormData();
    formData.append('pdf_file', file);
    formData.append('title', pdfTitle.value);
    uploading.value = true;
    const toastResponse = await patientStore.uploadPDF(formData);
    uploading.value = false;
    toast.add(toastResponse);
  }
};
</script>
