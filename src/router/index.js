import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import { Message } from 'element-ui';

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/ems/HomeView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/ems/LoginView')
  },
  {
    path: '/emp',
    name: 'emp',
    component: () => import('../views/ems/EmpView'),

  },
  {
    path: '/dept',
    name: 'dept',
    component: () => import('../views/ems/DeptView')
  },
  {
    path: '/',
    redirect: '/login'
  }
]

const router = new VueRouter({
  routes
})

// 添加全局路由守卫
router.beforeEach((to, from, next) => {
  console.log(store.state.userInfo.rolePlay)
  // 检查是否尝试访问 '/emp' 路由
  if (to.path === '/emp') {
    const role = store.state.userInfo.rolePlay;
    console.log(role)
    // 如果用户的角色是 '0'，表示没有权限
    if (!role) {
      console.log("无")
      Message.error('您没有权限访问');
      next('/home'); // 如果没有权限，重定向到 '/home' 路由
    } else {
      console.log("有")
      next(); // 如果有权限，允许进入 '/emp' 路由
    }
  } else {
    console.log("其他")
    next(); // 确保对于其他路由也调用 next 方法
  }
});


export default router
