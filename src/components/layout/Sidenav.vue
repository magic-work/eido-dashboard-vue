<template>

  <router-link to="/">
    <img src="@/assets/images/EIDO.webp" alt="logo image" class="mx-auto w-32 m-8 dark:invert" />
  </router-link>
  <Menu v-if="authStore.user" :model="menuItems" :pt="sideNavStyles" class="p-4">

    <template #item="{ item, props }">
      <router-link :to="item.route" v-bind="props.action"
        :class="item.route.name == route.meta.parentView ? 'bg-primary-100 bg-opacity-70 text-primary-700 dark:bg-surface-500 dark:text-surface-0' : ''">
        <span v-bind="props.icon"></span>
        <span v-bind="props.label">{{ item.label }} </span>
      </router-link>
    </template>
  </Menu>

</template>


<script setup>

import { ref, computed } from 'vue';
import Menu from 'primevue/menu';
import { useRoute } from "vue-router";
import sideNavStyles from '@/presets/cosmo/sidenavmenu'
import { useAuthStore } from '@/stores/auth.store';

const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);
const authStore = useAuthStore();
const route = useRoute();

const sideBarVisible = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const menuItems = ref([
  {
    name: 'PatientIndexView',
    label: 'Patients',
    icon: 'fa-solid fa-hand-holding-medical',
    route: { name: 'PatientIndexView' },
    command: () => {
      sideBarVisible.value = false;
    }
  },
  {
    name: 'DocumentsView',
    label: 'Document Index',
    icon: 'fa-solid fa-file-pdf',
    route: { name: 'DocumentsView' },
    command: () => {
      sideBarVisible.value = false;
    }
  },

]);

</script>
