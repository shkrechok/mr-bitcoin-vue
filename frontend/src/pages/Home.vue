<template>
  <div class="home">
    <h1>Home</h1>
    <pre>{{ user }}</pre>
    <pre v-if="bitcoinRate">{{ bitcoinRate }}</pre>
  </div>
</template>
<script>
import { userService } from "@/services/user.service";
import { bitcoinService } from "@/services/bitcoin.service";
export default {
  data() {
    return {
      user: {},
      bitcoinRate: null,
    }
  },
  async created() {
    this.user = userService.getUser()
    this.bitcoinRate = await bitcoinService.getRate()
  },

}
</script>
