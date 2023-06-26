import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Contacts from "../pages/Contacts.vue";
import ContactDetails from "../pages/ContactDetails.vue";
import ContactEdit from "../pages/ContactEdit.vue";
import StatisticsView from "../pages/StatisticsPage.vue";
import LoginPage from "../pages/LoginPage.vue";

const routerOptions = {
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: LoginPage,
    },
    {
      path: "/home",
      name: "home",
      component: Home,
    },
    {
      path: "/contact",
      name: "contacts",
      component: Contacts,
    },
    {
      path: "/contact/:id",
      name: "contactDetails",
      component: ContactDetails,
    },
    {
      path: "/contact/edit/:id?",
      name: "contactEdit",
      component: ContactEdit,
    },
    {
      path: "/statistics",
      name: "statistics",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import('../pages/StatisticsPage.vue')
      component: StatisticsView,
    },
  ],
};
const router = createRouter(routerOptions);

export default router;
