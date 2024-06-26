<template>
  <div class="flex flex-col gap-2 md:gap-6 mt-3 md:mt-10">
    <img src="@/assets/images/EIDO.webp" alt="logo image" class="mx-auto w-48 dark:invert" />

    <div class="text-sm  bg-blue-500/30 p-3 rounded-lg space-y-2">
      <p>
        This is a test application to aid in assessing John for a contract position. You may log in
        with the credentials:
      </p>
      <p>
        <strong>Email:</strong> test@eido.com <br>
        <strong>Password:</strong> test123
      </p>
      <p>
        If you prefer, you can use any google account to sign in (note that there'll be no test data in this case)
      </p>
    </div>

    <form @submit.prevent="handleSubmit" class="flex flex-col gap-3 md:gap-3">

      <TextInput label="Email" identifier="emailField" v-model="formData.email" icon="fa-solid fa-at" inputType="email"
        placeholder="Enter email..." required />
      <TextInput label="Password" identifier="passwordField" v-model="formData.password" icon="fa-solid fa-key"
        inputType="password" placeholder="Enter password..." required />

      <PasswordResetModal />
      <div>
        <Button :label="authenticating ? 'Authenticating...' : 'Log in'" type="submit" class="w-full"
          :icon="`fa-solid ${authenticating ? 'fa-solid fa-spin fa-cog' : 'fa-user'}`" size="small" />
        <div v-if="loginError" class="flex items-center gap-3 text-xs m-1 text-error">
          <i class="fa-solid fa-exclamation-circle"></i>
          <span>{{ loginError }}</span>
        </div>
      </div>

    </form>

    <Divider type="dotted" align="center">
      <span class="text-xs mx-2">or</span>
    </Divider>

    <Button @click="handleGoogleLogin" type="button" severity="secondary" size="small" outlined
      :icon="`${authenticating ? 'fa-solid fa-spin fa-cog' : 'fa-brands fa-google'}`" class="w-full flex gap-8">
      <img src="@/assets/images/google-icon.webp" alt="logo image" class="w-5" />
      <span>Continue with Google</span>
    </Button>
  </div>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue';
import Button from 'primevue/button';
import { useAuthStore } from '@/stores/auth.store';
import TextInput from '@/components/ui/TextInput.vue';
import { useRoute, useRouter } from 'vue-router';
import Divider from 'primevue/divider';
import PasswordResetModal from '@/components/auth/PasswordResetModal.vue';

const authenticating = ref(false);
const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const loginError = computed(() => authStore.authErrorMessage);


const formData = ref({
  email: '',
  password: ''
});


const checkAuthToken = async () => {
  if (authStore.checkForAuthenticatedUser) {
    console.log("Login successful  😃");
    route.query.redirect ? router.push(route.query.redirect) : router.push("/");
  }
  else {
    let authToken = await authStore.getToken();
    if (authToken)
      route.query.redirect ? router.push(route.query.redirect) : router.push("/");
  }
}

const handleSubmit = async () => {
  authenticating.value = true;
  await authStore.signIn(formData.value.email, formData.value.password);
  await checkAuthToken();
  authenticating.value = false;
}

const handleGoogleLogin = async () => {
  authenticating.value = true;
  await authStore.googleSignIn();
  await checkAuthToken();
  authenticating.value = false;
}



</script>
