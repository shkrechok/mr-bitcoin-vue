
<script>
import { contactService } from "../services/contact.service.js";
export default {
  data() {
    return {
      contact: null,
    };
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
  methods: {
    onBack() {
            this.$router.push('/contact')
        }
  },
};
</script>

<template>
  <div class="contact-details" v-if="contact">
    <h1>Contact details</h1>
    <p>{{ contact.name }}</p>
    <p>{{ contact.email }}</p>
    <p>{{ contact.phone }}</p>
    <button class="back-btn" @click="onBack">Back</button>
  </div>
</template>