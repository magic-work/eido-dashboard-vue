import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store';
import PatientIndexView from '@/views/PatientIndexView.vue'
import PatientDetailView from '@/views/PatientDetailView.vue'
import DocumentsView from '@/views/DocumentsView.vue'
import ProfileView from '@/views/AuthViews/ProfileView.vue'
import LoginView from '@/views/AuthViews/LoginView.vue'
import NotFound404 from '@/views/NotFound404.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'PatientIndexView',
      component: PatientIndexView,
      meta: { requiresAuth: true, parentView: 'PatientIndexView'},
    },
    {
      path: '/patients/:id',
      name: 'PatientDetailView',
      component: PatientDetailView,
      meta: { requiresAuth: true, parentView: 'PatientIndexView'},
    },
    {
      path: '/documents',
      name: 'DocumentsView',
      component: DocumentsView,
      meta: { requiresAuth: true, parentView: 'DocumentsView'},
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
          meta: { requiresAuth: true},
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

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !authStore.user) {
    next({ name: 'LoginView', query: { redirect: to.fullPath } });
    return;
  }

  next();
});

export default router
