<template>
  <div class="home">
    <section class="basic-data-ctn">
      <span class="title">Your name</span>
      <span class="val">{{ user.name }}</span>
      <span class="title">Your balanve</span>
      <span class="val">{{ user.balance }}</span>
      <span class="title">Bit coin rate</span>
      <span class="val" v-if="bitcoinRate">{{ bitcoinRate }}</span>
    </section>
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
    };
  },
  async created() {
    this.user = userService.getUser();
    this.bitcoinRate = await bitcoinService.getRate();
  },
};
</script>
<style lang="scss">
</style>
