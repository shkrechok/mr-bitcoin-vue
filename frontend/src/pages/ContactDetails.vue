
<script>
import { contactService } from "../services/contact.service.js"
import TransferFunds from "../cmps/TransferFunds.vue"

export default {
  data() {
    return {
      contact: null,
      isTransfer: false
    }
  },
  async created() {
    const contactId = this.$route.params.id
    console.log("contactId", contactId)
    try {
      this.contact = await contactService.getContactById(contactId)
    } catch (err) {
      console.log("err", err)
    }
  },
  async updated() {
    const contactId = this.$route.params.id
    console.log("contactId", contactId)
    try {
      this.contact = await contactService.getContactById(contactId)
    } catch (err) {
      console.log("err", err)
    }
  },
  
  methods: {
    onBack() {
      this.$router.push("/contact")
    },
    onToggleTransfer() {
      this.isTransfer = !this.isTransfer
    },
    closeTransfer() {
      this.isTransfer = false
    }

  },
  components: {
    TransferFunds
  }
}
</script>

<template>
  <div class="contact-details" v-if="contact">
    <section class="from me" >
      <pre>{{ contact.transactions }}</pre>
    </section>
    <section class="contact-preview">
      <span class="title">Name</span>
      <span class="val">{{ contact.name }}</span>
      <span class="title">Email</span>
      <span class="val">{{ contact.email }}</span>
      <span class="title">Phone number</span>
      <span class="val">{{ contact.phone }}</span>
    </section>
    <section class="actions">
    <button class="transfer-btn" title="transfer funds" @click="onToggleTransfer">Transfer</button>
    <button class="back-btn" @click="onBack">Back</button>
    </section>
    <TransferFunds v-if="isTransfer" :contact="contact" @closeTransfer="closeTransfer" />
  </div>
</template>
<style lang="scss">

</style>
```