
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
    <div class="contact-list-ctn">
        <ul class="contact-list">
            <li class="li-contact" v-for="contact in contacts" :key="contact._id">
                <ContactPreview :contact="contact"/>
                <section class="btns">
                <RouterLink :to="`/contact/${contact._id}`">
                    <button class="details-btn">Details</button>
                </RouterLink>
                <RouterLink :to="`/contact/edit/${contact._id}`">
                    <button class="edit-btn">Edit</button>
                </RouterLink>
                <button class="remove-btn" @click="deleteContact(contact._id)">Remove</button>
                </section>
            </li>

        </ul>
    </div>
</template>

<style lang="scss">


</style>
