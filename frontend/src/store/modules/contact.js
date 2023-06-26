import { contactService } from "@/services/contact.service";

export default {    
    state() {
        return {
            contacts: null,
        }
    },
    getters: {
        contacts(state) {
            return state.contacts
        },
        getContactById: (state) => (id) => {
            return state.contacts.find(contact => contact._id === id)
        }
    },
    mutations: {
        setContacts(state, { contacts }) {
            state.contacts = contacts
        },
        
        updateContact(state, { contact }) {
            const idx = state.contacts.findIndex(c => c._id === contact._id)
            state.contacts.splice(idx, 1, contact)
        },
        addContact(state, { contact }) {
            state.contacts.push(contact)
        },
        deleteContact(state, { contactId }) {
            const idx = state.contacts.findIndex(c => c._id === contactId)
            state.contacts.splice(idx, 1)
        }
    },
    actions: {
        async loadContacts(context) {
            const contacts = await contactService.getContacts()
            context.commit({ type: 'setContacts', contacts })
        },
        async saveContact(context, { contact }) {
            const type = contact._id ? 'updateContact' : 'addContact'
            const savedContact = await contactService.saveContact(contact)
             context.commit({ type, contact: savedContact })
        },
        async deleteContact(context, { contactId }) {
            await contactService.deleteContact(contactId)
             context.commit({ type: 'deleteContact', contactId })
        }
    }
}