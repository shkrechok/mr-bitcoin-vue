<script>
import { showSuccessMsg, showErrorMsg } from "../services/eventBus.service.js";

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
      if (contactId) {
        this.contact = await contactService.getContactById(contactId);
      } else {
        this.contact = contactService.getEmptyContact();
      }
    } catch (err) {
      console.log("err", err);
    }
  },
  methods: {
    async saveContact() {
      try {
        await contactService.saveContact(this.contact)
        this.$router.push("/contact")

        showSuccessMsg("Contact saved")
      } catch (err) {
        showErrorMsg("Cannot save contact")
      }
    },
  },
};
</script>

<template>
  <div class="contact-edit">
    <div class="contact-preview" v-if="contact">
      <span class="title">Name</span>
      <span class="val">{{ contact.name }}</span>
      <span class="title">Email</span>
      <span class="val">{{ contact.email }}</span>
      <span class="title">Phone number</span>
      <span class="val">{{ contact.phone }}</span>
    </div>
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