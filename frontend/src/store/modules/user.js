import { userService } from "../../services/user.service";    

export default {
    state() {
        return {
            loggedInUser: null,
            users: [],
        }
    },
    getters: {
        users(state) {
            return state.users
        },
        loggedInUser(state) {
            return state.loggedInUser
        },
        getUserById: (state) => (id) => {
            return state.users.find(user => user._id === id)
        }
    },
    mutations: {
        setUsers(state, { users }) {
            state.users = users
        },
        updateUser(state, { user }) {
            const idx = state.users.findIndex(u => u._id === user._id)
            state.users.splice(idx, 1, user)
        },
        addUser(state, { user }) {
            state.users.push(user)
        },
        
        setLoggedInUser(state, { user }) {
            state.loggedInUser = user
        }
    },
    actions: {
        async loadUsers(context) {
            const users = await userService.query()
            context.commit({ type: 'setUsers', users })
        },
        async saveUser(context, { user }) {
            const type = user._id ? 'updateUser' : 'addUser'
            const savedUser = await userService.saveUser(user)
            context.commit({ type, user: savedUser })
        },
        // async signup(context, { user }) {
        //     const userToSign = await userService.signup(user)
        //     context.commit({ type: 'setLoggedInUser', user: userToSign })
        // },
        
        async login(context, { user }) {
            const userToLog = await userService.login(user)
            context.commit({ type: 'setLoggedInUser', user: userToLog })
        },
        async logout(context) {
            await userService.logout()
            context.commit({ type: 'setLoggedInUser', user: null })
        }

    }
}
