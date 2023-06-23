import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Contacts from '../pages/Contacts.vue'
import ContactDetails from '../pages/ContactDetails.vue'
// import StatisticsView from '../pages/StatisticsView.vue'

const routerOptions = {
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: Contacts
    },
    {
      path: '/contacts/:id',
      name: 'contactDetails',
      component: ContactDetails
    },
    {
       path: '/statistics',
       name: 'statistics',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../pages/StatisticsView.vue')
    }
  ]
}
const router = createRouter(routerOptions)

export default router
