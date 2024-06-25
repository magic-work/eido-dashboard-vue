<template>

  <div class="flex h-screen antialiased">
    <div class="md:hidden w-full ">
      <Sidebar v-model:visible="visible">
        <template #header>
          <img src="@/assets/images/EIDO.webp" alt="logo image" class="w-20 dark:invert" />
        </template>
        <Sidenav v-model="visible" />
      </Sidebar>
      <div class="flex justify-between items-center">
        <Button icon="fa-solid fa-bars" class="m-3 " text size="large" @click="visible = true" severity="secondary"
          rounded aria-label="menu" />
        <Navbar class="md:hidden w-full" />
      </div>
      <div class="flex flex-1 overflow-auto ">

        <main class="p-3 md:p-5 w-full ">
          <slot />
        </main>
      </div>
    </div>

    <div class="fixed inset-0 z-50 hidden md:flex">
      <div :class="!user ? 'sidenav-loggedout' : 'sidenav-loggedin'"
        class="transition-all origin-left ease-in-out duration-1000 flex flex-col bg-surface-50 dark:bg-surface-900">

          <div class="flex h-full flex-col overflow-y-auto border-r">
            <div v-if="!user" :class="!user ? 'opacity-100 stock-img' : 'stock-img opacity-10'"
              class="transition-all duration-1000 mb-10 flex h-full items-center rounded-lg px-3 py-2">
            </div>
            <div v-else>
              <Sidenav />
            </div>
          </div>

      </div>
      <div class="flex flex-col flex-1 overflow-auto">
        <Navbar class="hidden md:block w-full" />
        <main class="p-5 md:px-16">
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>


<script setup>
import Sidenav from '@/components/layout/Sidenav.vue';
import Sidebar from 'primevue/sidebar';
import Button from 'primevue/button';
import Navbar from '@/components/layout/Navbar.vue';
import { useAuthStore } from '@/stores/auth.store';
import { ref, computed } from 'vue';

const authStore = useAuthStore();

const user = computed(() => authStore.user);

const visible = ref(false);


</script>


<style>
.stock-img {
  background-image: url('@/assets/images/eido-stock-image.jpg');
  background-size: cover;
  background-position: center;
}
</style>
