
<script>
import { contactService } from "../services/contact.service.js";
export default {
  data() {
    return {
      contact: null,
    };
  },
  async created() {
    const contactId = this.$route.params.id;
    console.log("contactId", contactId);
    try {
      this.contact = await contactService.getContactById(contactId);
    } catch (err) {
      console.log("err", err);
    }
  },
  methods: {
    onBack() {
      this.$router.push("/contact");
    },
  },
};
</script>

<template>
  <div class="contact-details" v-if="contact">
    <div class="contact-preview">
      <span class="title">Name</span>
      <span class="val">{{ contact.name }}</span>
      <span class="title">Email</span>
      <span class="val">{{ contact.email }}</span>
      <span class="title">Phone number</span>
      <span class="val" >{{ contact.phone }}</span>
</div>
    <button class="back-btn" @click="onBack">Back</button>
  </div>
</template>