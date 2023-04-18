import { createRouter, createWebHistory } from 'vue-router'

const routes = [{
  path: '/',
  name: 'home',
  component: () => import("../views/Home.vue"),
  meta: {
    requiresAuth: true
  }
},
{
  path: '/login',
  name: 'login',
  component: () => import("../views/LoginPage.vue")
},
{
  path: '/register',
  name: 'register',
  component: () => import("../views/RegisterPage.vue")
},
{
  path: '/details/:id(\\d+)',
  name: 'carDetail',
  component: () => import("../views/CarDetail.vue"),
  meta: {
    requiresAuth: true
  },
  // Per route guard
  async beforeEnter(to, from) {
    try {
      const response = await axios.get(`https://testapi.io/api/dartya/resource/cardata/`)
      const cdata = response.data.data
      const cardata = cdata.find(data => data.id == to.params.id)
      if (!cardata) {
        return {
          name: 'NotFound',
          //allows keeping URL while redirectiong to the home page. "PathMatch" is a property in Vue.js that is used to capture dynamic segments of a URL
          params: { pathMatch: to.path.split('/').slice(1) },
        }
      }
    }
    catch {
      return {
        name: 'NotFound',
        //allows keeping URL while redirectiong to the home page. "PathMatch" is a property in Vue.js that is used to capture dynamic segments of a URL
        params: { pathMatch: to.path.split('/').slice(1) },
      }
    }
  }
},
{
  path: '/:pathMatch(.*)*',
  name: 'NotFound',
  component: () => import("../views/NotFound.vue")
}

]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

router.beforeEach((to, from, next) => {
  if (!to.meta.requiresAuth) {
    next();
    return
  }
  const loggedIn = localStorage.getItem("loggedIn");

  if (loggedIn == 'true') {
    next();
  }
  else {
    next({ name: "login" })
  }
});

import axios from 'axios'
export default router