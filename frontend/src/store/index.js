import { createStore } from "vuex";
import contact from "./modules/contact";
const storeOptions = {
  state() {
    return {
      count: 0,
    }
  },
  mutations: {
    increment(state) {
      state.count++
    },
  },
  modules: {
    contact,
  },
}

const store = createStore(storeOptions)

export default store
