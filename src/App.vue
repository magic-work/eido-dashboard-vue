<script setup>
import { RouterView } from 'vue-router'
import Layout from '@/components/layout/Layout.vue'
import Toast from 'primevue/toast';
import ConfirmModal from '@/components/ui/ConfirmationModal.vue';

</script>

<template>

  <Toast />
  <ConfirmModal />
  <Layout>
    <RouterView />
  </Layout>

</template>
