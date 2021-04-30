import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import NotFound from "../views/NotFound.vue";

Vue.use(VueRouter)

const routes = [
  {
    path : "*",
    name : "NotFound",
    component: NotFound,
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path : "/user",
    name : "user",
    component : () => import("../views/User.vue")
  }
]

const router = new VueRouter({
  routes
})

export default router
