import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _3d322462 = () => interopDefault(import('../pages/error.vue' /* webpackChunkName: "pages/error" */))
const _1eaba2b1 = () => interopDefault(import('../pages/mturk/index.vue' /* webpackChunkName: "pages/mturk/index" */))
const _c4be60ce = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/error",
    component: _3d322462,
    name: "error"
  }, {
    path: "/mturk",
    component: _1eaba2b1,
    name: "mturk"
  }, {
    path: "/",
    component: _c4be60ce,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
