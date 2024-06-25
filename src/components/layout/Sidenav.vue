<template>

  <router-link to="/">
    <img src="@/assets/images/EIDO.webp" alt="logo image" class="mx-auto w-32 m-8 dark:invert" />
  </router-link>
  <Menu v-if="authStore.user" :model="menuItems" :pt="sideNavStyles" class="p-4">

    <template #item="{ item, props }">
      <router-link :to="item.route" v-bind="props.action"
        :class="item.route.name == route.name ? 'bg-info-100 bg-opacity-70 text-info-700 dark:bg-surface-500 dark:text-surface-0' : ''">
        <span v-bind="props.icon"></span>
        <span v-bind="props.label">{{ item.label }} </span>
      </router-link>
    </template>
  </Menu>

  <LoadingIndicators />
</template>


<script setup>

import { ref, computed } from 'vue';
import Menu from 'primevue/menu';
import { useRoute } from "vue-router";
import Button from 'primevue/button';
import sideNavStyles from '@/presets/cosmo/sidenavmenu'
import { useAuthStore } from '@/stores/auth.store';
import LoadingIndicators from '@/components/LoadingIndicators.vue';

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
    name: 'HomeView',
    label: 'Dashboard',
    icon: 'fa-solid fa-chart-simple',
    route: { name: 'HomeView' },
    command: () => {
      sideBarVisible.value = false;
    }
  },
  {
    name: 'MessagesView',
    label: 'Messages',
    icon: 'fa-solid fa-message',
    route: { name: 'MessagesView' },
    command: () => {
      sideBarVisible.value = false;
    }
  },

]);

</script>
