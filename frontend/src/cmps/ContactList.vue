
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
    <div class="loading" v-if="!contacts.length">
        <h1>Loading...</h1>
    </div>
    <div class="contact-list-ctn" v-if="contacts.length">
        <TransitionGroup name="list" class="contact-list" tag="ul">
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

        </TransitionGroup>
    </div>
</template>

<style lang="scss">

.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>
