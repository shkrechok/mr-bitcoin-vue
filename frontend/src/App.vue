<script >
import AppHeader from "./cmps/AppHeader.vue";
import AppFooter from "./cmps/AppFooter.vue";
export default {
    components: {
        AppHeader,
        AppFooter,
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
  </div>
</template>

<style lang="scss">


</style>
