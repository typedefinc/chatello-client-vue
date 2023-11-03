import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteRecordRaw
} from "vue-router";
import { useAuthStore } from "@/store/auth";
import { storeToRefs } from "pinia";

const ROUTES_WITHOUT_AUTH = [
  '/auth',
  '/sign-up',
  '/forgot-password',
]

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/views/HomePage.vue'),
  },
  {
    path: '/auth',
    component: () => import('@/views/authorization/AuthPage.vue'),
  },
  {
    path: '/sign-up',
    component: () => import('@/views/authorization/SignUpPage.vue'),
  },
  {
    path: '/create-chat',
    component: () => import('@/views/chat/CreateChatPage.vue'),
  },
  {
    path: '/chat/:id',
    component: () => import('@/views/chat/ChatPage.vue'),

  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to: RouteLocationNormalized, _: RouteLocationNormalized, next: NavigationGuardNext) => {
  const { isAuth } = storeToRefs(useAuthStore());

  if (!isAuth.value && !ROUTES_WITHOUT_AUTH.includes(to.path)) {
    return next({ path: '/auth' })
  }

  if (isAuth.value && to.path === '/auth') {
    return next({ path: '/' })
  }

  return next();
})

export default router;
