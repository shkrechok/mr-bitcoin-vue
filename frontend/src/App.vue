<script >
import AppHeader from "./cmps/AppHeader.vue";
import AppFooter from "./cmps/AppFooter.vue";
import UserMsg from "./cmps/UserMsg.vue";
export default {
    components: {
        AppHeader,
        AppFooter,
        UserMsg
    }
}
</script>


<template>
  <div  class="app-container main-layout">
    <AppHeader />
    <main class="main-content">
      <RouterView />
    </main>
    <AppFooter />
    <UserMsg />
  </div>
</template>

<style lang="scss">


</style>
