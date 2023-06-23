
<script>
import ContactList from '../cmps/ContactList.vue'
import { contactService } from '../services/contact.service.js'
export default {
    data() {
        return {
            contacts: [],
        }
    },
   async created() {
        this.contacts = await contactService.getContacts()
    },
    components: {
        ContactList
    },
    methods: {
        onAddContact() {
            this.$router.push('/contact/edit')
        }
    }
}
</script>
<template>
    <div clss="contacts">
        <button @click="onAddContact">Add Contact</button>
        <ContactList :contacts="contacts"/>
    </div>
</template>
