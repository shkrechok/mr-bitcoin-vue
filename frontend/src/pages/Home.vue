
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
    loggedInUser() {
      return this.$store.getters.loggedInUser
    }
  }
}


</script>
<template>
  <div class="home" >
    <section class="loading" v-if="!loggedInUser">
      <h1>Loading...</h1>
    </section>
    <section class="transactions">
      <pre>{{ loggedInUser.transactions }}</pre>
    </section>
    <section class="basic-data-ctn" v-if="loggedInUser">
      <span class="title">Your name</span>
      <span class="val">{{ loggedInUser.name }}</span>
      <span class="title">Your balance</span>
      <span class="val">{{ loggedInUser.balance }}</span>
      <span class="title">Bit coin rate</span>
      <span class="val" v-if="bitcoinRate">{{ bitcoinRate }}</span>
    </section>
  </div>
</template>
<style lang="scss">
</style>
