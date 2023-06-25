
<script>
export default {
    props: ['contact'],
    
}
</script>
<template>
    <div class="contact-preview">
            <span class="title">Name</span>
            <span class="val">{{ contact.name }}</span>
            <span class="title">Email</span>
            <span class="val">{{ contact.email }}</span>
            <span class="title">Phone number</span>
            <span class="val" >{{ contact.phone }}</span>
    </div>
</template>
