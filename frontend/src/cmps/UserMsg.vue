<template>
    <Transition>
        <section v-if="msg" class="user-msg" :class="msgClass">
            <p>{{ msg.txt }}</p>
        </section>
    </Transition>
</template>

<script>
import { eventBus } from '@/services/eventBus.service.js'

export default {
    data() {
        return {
            msg: null,
        }
    },
    methods: {
        showMsg(msg) {
            this.msg = msg
            setTimeout(() => (this.msg = null), msg.timeout || 1500)
        },
    },
    computed: {
        msgClass() {
            return {
                success: this.msg.type === 'success',
                fail: this.msg.type === 'fail',
            }
        },
    },
    created() {
        this.unListen = eventBus.on('user-msg', this.showMsg)
    },
    unmounted() {
        this.unListen()
    },
}
</script>

<style lang="scss">
/* we will explain what these classes do next! */
.user-msg {
    transform-origin: right;
}
.v-enter-active,
.v-leave-active {
    transition: 0.8s ease;
}

.v-enter-from,
.v-leave-to {
    scale: 0 1;
    opacity: 0;
}
</style>