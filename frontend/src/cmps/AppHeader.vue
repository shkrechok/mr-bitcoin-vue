
<script>
import { userService } from "@/services/user.service";
import { bitcoinService } from "@/services/bitcoin.service";

export default {
    data() {
        return {
        bitcoinRate: null,
        }
    },
    async created() {
        this.bitcoinRate = await bitcoinService.getRate()
    },
    computed:{
        loggedInUser(){
            return this.$store.getters.loggedInUser
        }
    }
    
}
</script>
<template>
    <header class="app-header full main-layout">
        <div class="header-central">
        <section class="user-data" v-if="loggedInUser">
            <p>Hello {{ loggedInUser.name }}</p>
            <p>Bitcoin rate: {{ bitcoinRate }}</p>
        </section>
        <nav v-if="loggedInUser">
        <router-link class="link" active-class="active" to="/home">Home</router-link>
        <router-link class="link" active-class="active" to="/contact">Contacts</router-link>
        <router-link class="link" active-class="active" to="/statistics">Statistic view</router-link>
        </nav>
        </div>
    </header>
</template>
<style lang="scss">

</style>