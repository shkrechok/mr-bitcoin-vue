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
      if (contactId) {
        this.contact = await contactService.getContactById(contactId)
      } else {
        this.contact = contactService.getEmptyContact()
      }
    } catch (err) {
      console.log("err", err)
    }
  },
  methods: {
    async saveContact() {
      await contactService.saveContact(this.contact)
      this.$router.push("/contact")
    },
  },
};
</script>

<template>
  <div class="contact-edit">
    <h1>Contact Edit</h1>
    <form @submit.prevent="saveContact" v-if="contact">
      <label>Name:</label>
      <input type="text" v-model="contact.name" />
      <label>Email:</label>
      <input type="text" v-model="contact.email" />
      <label>Phone:</label>
      <input type="text" v-model="contact.phone" />
      <button class="save-btn">Save</button>
    </form>
  </div>
</template>