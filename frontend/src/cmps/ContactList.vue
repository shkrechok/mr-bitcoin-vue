
<script>
import ContactPreview from './ContactPreview.vue'
export default {
    props: ['contacts'],
    components: {
        ContactPreview,
    },
}
</script>
<template>
    <div clss="contact list">
        <ul>
            <li v-for="contact in contacts" :key="contact._id">
                <ContactPreview :contact="contact"/>
            </li>

        </ul>
    </div>
</template>
