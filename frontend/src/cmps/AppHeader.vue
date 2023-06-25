
<script>
import { userService } from "@/services/user.service";
import { bitcoinService } from "@/services/bitcoin.service";

export default {
    data() {
        return {
        loggedInUser: null,
        bitcoinRate: null,
        }
    },
    async created() {
        this.loggedInUser = userService.getUser()
        this.bitcoinRate = await bitcoinService.getRate()
    },
    
}
</script>
<template>
    <header class="app-header full main-layout">
        <div class="header-central">
        <section class="user-data" v-if="loggedInUser">
            <p>Hello {{ loggedInUser.name }}</p>
            <p>Bitcoin rate: {{ bitcoinRate }}</p>
        </section>
        <nav>
        <router-link class="link" active-class="active" to="/">Home</router-link>
        <router-link class="link" active-class="active" to="/contact">Contacts</router-link>
        <router-link class="link" active-class="active" to="/statistics">Statistic view</router-link>
        </nav>
        </div>
    </header>
</template>
<style lang="scss">

</style>