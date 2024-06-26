<template>
  <div class="p-5 md:px-10 max-w-lg mx-auto md:mx-10">
    <Login />
  </div>
</template>


<script setup>
import Login from '@/components/auth/Login.vue';
import useAuthStore from '@/stores/auth.store';
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

onMounted(async () => {
  await authStore.clearErrorMessage()
  route.query.redirect ? router.push(route.query.redirect) : router.push("/");
});


</script>
