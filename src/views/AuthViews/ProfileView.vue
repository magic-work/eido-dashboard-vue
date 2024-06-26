<template>
  <div class="flex flex-col gap-6 mt-10 max-w-lg justify-center mx-auto">

    <div class="flex justify-between">
      <Avatar v-bind="avatarImage" :image="photoURL" size="larger" shape="circle" />
      <div>
        <h1 class="text-3xl text-right">My Account</h1>
        <small class="text-surface-400">Member since: {{ memberSince }}</small>
      </div>
    </div>

    <form @submit.prevent="updateUserProfile" class="flex flex-col gap-6 mt-10">
      <TextInput disabled icon="fa-solid fa-at" v-model="formData.email" identifier="emailField" inputType="email"
        label="Email" />
      <TextInput v-model="formData.name" icon="fa-solid fa-signature" identifier="nameField" inputType="text"
        label="Full Name" />
      <div>
        <Button type="submit" :icon="loading ? 'fa-solid fa-spin fa-cog' : 'fa-solid fa-user-check'" label="Update Profile"
          size="small" class="flex gap-2 px-6" />
      </div>
    </form>

    <Divider />

    <div class="flex justify-between items-center">
      <div class="flex flex-col">
        <span>Delete Account</span>
        <span class="text-surface-400 text-xs max-w-64">This action will permanently delete your account and all your data</span>
      </div>
      <Button @click="confirmDeleteUser" severity="danger" label="Delete Account" icon="fa-solid fa-user-xmark" class="p-button-secondary" size="small"/>
    </div>

  </div>
</template>


<script setup>
import { reactive, ref, computed } from 'vue';
import TextInput from '@/components/ui/TextInput.vue';
import Button from 'primevue/button';
import Avatar from "primevue/avatar";
import { useAuthStore } from '@/stores/auth.store';
import { useToast } from "primevue/usetoast";
import Divider from 'primevue/divider';
import { useConfirm } from "primevue/useconfirm";
import { useRouter } from 'vue-router';

const router = useRouter();
const confirm = useConfirm();
const toast = useToast();
const authStore = useAuthStore();
const loading = ref(false);

const avatarImage = computed(() => {
  return authStore?.user?.photoURL ? { image: authStore?.user?.photoURL } : { icon: 'fa pi-user' }
});

const photoURL = computed(() => authStore?.user?.photoURL);

const formData = reactive({
  email: authStore.user?.email,
  name: authStore.user?.displayName,
});

const updateUserProfile = async () => {
  loading.value = true;
  const payload = {
    displayName: formData.name,
  }
  const toastResponse = await authStore.updateUserProfile(payload)
  toast.add(toastResponse);
  loading.value = false;
};

const memberSince = computed(() => {
  return authStore.dateCreated.toLocaleDateString("en-US", {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

const confirmDeleteUser = async () => {
  confirm.require({
    header: 'Confirm Acccount Deletion',
    message: 'Are you sure you want to delete your account? This action cannot be undone.',
    icon: 'fa-solid fa-exclamation-circle',
    rejectLabel: 'Cancel',
    confirmLabel: 'Confirm',
    accept: async () => {
      const toastResponse = await authStore.deleteUser()
      router.push({ name: 'LoginView' });
      toast.add(toastResponse);
    }
  });
}
</script>
