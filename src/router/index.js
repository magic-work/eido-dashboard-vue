import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store';
import HomeView from '@/views/HomeView.vue'
import MessagesView from '@/views/MessagesView.vue'
import ProfileView from '@/views/AuthViews/ProfileView.vue'
import LoginView from '@/views/AuthViews/LoginView.vue'
import NotFound404 from '@/views/NotFound404.vue'

const requiresVerifiedEmail = import.meta.env.VITE_REQUIRES_VERIFIED_EMAIL === 'true';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomeView',
      component: HomeView,
      meta: { requiresAuth: true, requiresVerifiedEmail: requiresVerifiedEmail},
    },
    {
      path: '/messages',
      name: 'MessagesView',
      component: MessagesView,
      meta: { requiresAuth: true, requiresVerifiedEmail: requiresVerifiedEmail},
    },
    {
      path: '/auth',
      name: 'AuthLayout',
      children: [
        {
          path: 'login',
          name: 'LoginView',
          component: LoginView
        },
        {
          path: 'profile',
          name: 'ProfileView',
          component: ProfileView,
          meta: { requiresAuth: true, requiresVerifiedEmail: requiresVerifiedEmail},
        },
      ]
    },
    {
      path: '/:catchAll(.*)*', // This will match everything and act as a catch-all route
      name: 'NotFound404',
      component: NotFound404,
      meta: { requiresAuth: true },
    }
  ]
})


router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  if (!authStore.user)
    await authStore.checkForAuthenticatedUser();

  const requiresEmailVerification = to.matched.some(record => record.meta.requiresVerifiedEmail);

  if (requiresEmailVerification && authStore.user && !authStore.user.emailVerified) {
    authStore.setEmailVerificationModal(true);
    next(false);
    return;
  }
  authStore.setEmailVerificationModal(false);

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !authStore.user) {
    next({ name: 'LoginView', query: { redirect: to.fullPath } });
    return;
  }

  next();
});

export default router
