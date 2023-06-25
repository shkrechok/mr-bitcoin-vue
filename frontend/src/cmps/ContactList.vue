
<script>
import ContactPreview from './ContactPreview.vue'
export default {
    props: ['contacts'],
    components: {
        ContactPreview,
    },
    methods: {
        deleteContact(contactId) {
            this.$emit('delete', contactId)
        }
    }
}
</script>
<template>
    <div clss="contact list">
        <ul>
            <li class="li-contact" v-for="contact in contacts" :key="contact._id">
                <ContactPreview :contact="contact"/>
                <RouterLink :to="`/contact/${contact._id}`">
                    <button class="details-btn">Details</button>
                </RouterLink>
                <RouterLink :to="`/contact/edit/${contact._id}`">
                    <button class="edit-btn">Edit</button>
                </RouterLink>
                <button @click="deleteContact(contact._id)">x</button>
            </li>

        </ul>
    </div>
</template>
