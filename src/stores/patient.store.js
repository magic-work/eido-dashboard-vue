import api from '@/services/api';
import { defineStore } from 'pinia'

export const usePatientStore = defineStore({
  id: 'user-pdf',

  state: () => ({
    patients: [],
    pdfs: [],
    currentPatient: null,
    isLoading: false,
    isError: false,
    errorsList: []
  }),

  getters: {
    getPatients: (state) => state.patients.items,
    getCurrentPatient: (state) => state.currentPatient,
    getPDFs: (state) => state.pdfs.items,
  },

  actions: {
    async fetchPatients() {
      const { data } = await api.get('/patients/my-patients')
      this.patients = data
      return data
    },

    async fetchPDFs() {
      const { data } = await api.get('/pdf')
      this.pdfs = data
      return data
    },

    async fetchPatientDetail(key) {
      const { data } = await api.get(`/patients/${key}`)
      this.currentPatient = data
      return data
    },

    async createPatient(payload) {
      try {
        await api.post('/patients', payload)
        return { severity: 'success', summary: 'Success', detail: `Patient record created successfully.`, life: 3000 }
      }
      catch {
        return { severity: 'error', summary: 'Error', detail: `There was an error creating the patient record. Please check the fields.`, life: 3000 }
      }
    },

    async uploadPDF(payload) {
      try {
        await api.post(`/pdf`, payload)
        return { severity: 'success', summary: 'Success', detail: `PDF uploaded successfully.`, life: 3000 }
      }
      catch {
        return { severity: 'error', summary: 'Error', detail: `There was an error uploading the PDF. Please check the file.`, life: 3000 }
      }
    },

    async updatePatient(key, payload) {
      const { data } = await api.patch(`/patients/${key}`, payload)
      return data
    },

    async deletePatient(key) {
      await api.delete(`/patient/${key}`)
      const deleteIndex = this.patients.findIndex((item) => item._key === key)  // check this
      this.patients.splice(deleteIndex, 1)
    },
  },
})
