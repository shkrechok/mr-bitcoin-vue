
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
        async onDeleteContact(contactId) {
           await contactService.deleteContact(contactId)
            this.contacts = this.contacts.filter(contact => contact._id !== contactId)
        }
    }
}
</script>
<template>
    <div clss="contacts">
        <RouterLink to="/contact/edit">Add Contact</RouterLink>
        <ContactList :contacts="contacts" @delete="onDeleteContact" v-if="contacts"/>
    </div>
</template>
