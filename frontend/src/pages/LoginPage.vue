<template>
  <div class="login-container">
    <h1>Login or SignUp</h1>
    <section class="loading" v-if="!areUsers">
      <h2>Loading...</h2>
    </section>
    <form @submit.prevent="login" key="login" v-if="areUsers">
      <input type="text" v-model="user.username" placeholder="username" />
      <button>Login</button>
    </form>
    <!-- <form @submit.prevent="signup" key="signup">
        <input type="text" v-model="user.username" placeholder="username" />
        <button>SignUp</button>
    </form> -->
  </div>
</template>
<script>
import { showSuccessMsg, showErrorMsg } from "../services/eventBus.service.js";

export default {
  data() {
    return {
      areUsers: false,
      user: {
        username: "",
      },
    };
  },

  async created() {
    try {
      await this.$store.dispatch({ type: "loadUsers" })
      this.areUsers = true;
    } catch (err) {
      console.log("err", err);
    }
  },

  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser
    },
  },
  
  methods: {
    async login() {
      try {
        await this.$store.dispatch({ type: "login", user: { ...this.user } })
        
      } catch (err) {
        console.log("err", err)
        showErrorMsg("Login failed")
      } finally {
        if (this.loggedInUser) {
            console.log("login page: login in with", this.user)
          this.$router.push("/home")
          showSuccessMsg("Login successfull")
        } else {
            console.log("login page: no logedinuser")
        }
      }
    },
  },

  
}
</script>
