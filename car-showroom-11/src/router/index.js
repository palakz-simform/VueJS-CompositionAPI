import { createRouter, createWebHistory } from 'vue-router'
import axios from 'axios'
import { useUserStore } from "../stores/user";

const routes = [{
  path: '/',
  name: 'Home',
  component: () => import("../views/Home.vue"),
  meta: {
    requiresAuth: true
  }
},
{
  path: '/login',
  name: 'Login',
  component: () => import("../views/LoginPage.vue")
},
{
  path: '/register',
  name: 'Register',
  component: () => import("../views/RegisterPage.vue")
},
{
  path: '/users',
  name: 'Users',
  component: () => import("../views/Users.vue"),
  meta: {
    requiresAuth: true
  }
},
{
  path: '/details/:id(\\d+)',
  name: 'CarDetail',
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
  const userStore = useUserStore()
  if (!to.meta.requiresAuth) {
    (userStore.login == 'true' && (to.fullPath == '/login' || to.fullPath == '/register')) ? next({ name: "Home" }) : next()
  }
  else {
    userStore.login == 'true' ? next() : next({ name: "Login" })
  }
});

export default router