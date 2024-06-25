import api from '@/services/api';
import { defineStore } from 'pinia'

export const useContentStore = defineStore({
  id: 'content',
  state: () => ({
    content: {},
    isLoading: false,
    isError: false,
    errorsList: []
  }),
  actions: {
    async getContent() {
      const { data } = await api.get('/content')
      this.content = data
      return data
    },

    async getContentDetails(key) {
      const { data } = await api.get(`/content/${key}`)
      return data
    },

    async createContent(payload) {
      await api.post('/content', payload)
    },

    async updateContent(key, payload) {
      const { data } = await api.patch(`/content/${key}`, payload)
      return data
    },

    async deleteContent(key) {
      await api.delete(`/content/${key}`)
      const deleteIndex = this.content.findIndex((item) => item._key === key)
      this.content.splice(deleteIndex, 1)
    },
  },
})
