
<script>
import { showSuccessMsg, showErrorMsg } from '../services/eventBus.service.js'
import ContactList from '../cmps/ContactList.vue'
import { contactService } from '../services/contact.service.js'
export default {
    data() {
        return {
            // contacts: [],
            filterBy: {
                term: '',
                filterBy: 'name'
            }
        }
    },
   async created() {
        this.$store.dispatch({ type: 'loadContacts' })
    },
    components: {
        ContactList
    },
    methods: {
        async onDeleteContact(contactId) {
            try {
                 this.$store.dispatch({ type: 'deleteContact', contactId })
                showSuccessMsg('Contact deleted')
            } catch (err) {
                showErrorMsg('Cannot delete contact')
            }
           
        },
    },

    computed: {
        filteredContacts() {
            const { term, filterBy } = this.filterBy
            if (!term) return this.contacts
            else {
                const contactsToShow = this.contacts.filter(contact => {
                    return contact[filterBy].toLowerCase().includes(term.toLowerCase())
                })
                return contactsToShow
                
            }
            
        },
        contacts() {
            return this.$store.getters.contacts
        }
    },
}
</script>
<template>
    <div class="contacts">
        <section class="contacts-header">
        <button class="add-btn"><RouterLink to="/contact/edit">Add Contact</RouterLink></button>
        <div class="filter">
            <input type="text" placeholder="Search contact" v-model="filterBy.term"  />
            <select v-model="filterBy.filterBy">
                <option value="name">Name</option>
                <option value="phone">Phone</option>
                <option value="email">Email</option>
            </select>
        </div>
        </section>
        <ContactList :contacts="filteredContacts" @delete="onDeleteContact" v-if="contacts" />
    </div>
</template>
<style lang="scss">

</style>

