
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
    <header class="app-header">
        <section class="user-data" v-if="loggedInUser">
            <p>Hello {{ loggedInUser.name }}</p>
            <p>Bitcoin rate: {{ bitcoinRate }}</p>
        </section>
        <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/contact">Contacts</router-link>
        <router-link to="/statistics">Statistic view</router-link>
        </nav>
    </header>
</template>
<style lang="scss">
.app-header {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr;
    justify-content: center;
    align-content: center;
    justify-items: center;
    align-items: center;
    background-color:#7591ef;;
}
</style>