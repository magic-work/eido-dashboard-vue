<template>

  <div v-if="pdfs">
    <PDFUploader />
    <span class="text-sm text-surface-400">{{ pdfs.length }} PDFs</span>
    <ul class="space-y-6">
      <li v-for="pdf in pdfs" :key="pdf._id">
        <a @click="downloadPDF(pdf.pdf.public_url)"
          class="flex hover:bg-surface-50 justify-between items-center shadow-md p-4 rounded outline outline-1 outline-surface-200">
          <div class="flex items-center gap-4">
            <i class="fa fa-file-pdf" />
            <span>{{ pdf.title }}</span>
          </div>
        </a>
      </li>
    </ul>
  </div>

</template>

<script setup>
import { computed } from 'vue';
import PDFUploader from '@/components/PDFUploader.vue';
import { usePatientStore } from "@/stores/patient.store";

const patientStore = usePatientStore();

patientStore.fetchPDFs();

const pdfs = computed(() => patientStore.getPDFs);

const downloadPDF = async (pdfURL) => {
  const response = await fetch(pdfURL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/pdf',
    },
  });
  const blob = await response.blob();
  const downloadUrl = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.download = "document.pdf"; // This is the file name for the download
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(downloadUrl);  // Free up resources
}


</script>
