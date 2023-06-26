<template>
    <div class="transfer-funds">
        <h1>Transfer Funds</h1>
        <form @submit.prevent="transferFunds">
            <label for="amount">Amount</label>
            <input type="number" v-model.number="amount" name="amount" id="amount" placeholder="Amount" />
            <label for="to">To</label>
            <span class="to">{{ to.name }}</span> 
            <button>Transfer</button>
        </form>
    </div>
</template>
<script>
import { showSuccessMsg, showErrorMsg } from "../services/eventBus.service.js";
import { userService } from "../services/user.service.js";
export default {
    props: ['contact'],
    data() {
        return {
            amount: null,
            to: null,
        }
    },
    created() {
        this.to = this.contact
    },
    methods: {
        async transferFunds() {
            try {
                await userService.transferFunds(this.amount, this.to)
                this.$emit('closeTransfer')
                showSuccessMsg("Transfer successfull")
            } catch (err) {
                showErrorMsg("Transfer failed")
            } finally {
                await this.$store.dispatch({ type: "loadUsers" })

            }
        },
    },

}
</script>
