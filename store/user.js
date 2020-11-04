export const state = () => ({
    user: null
});

export const mutations = {
    set(state, user) {
        user.isAuthorized = true;
        state.user = user;
        this.$cookies.set('auth_token', user['token']);
        this.$cookies.set('auth_id', user['_id']);
    },
    clear(state) {
        state.user = null;
        this.$cookies.remove('auth_token');
        this.$cookies.remove('auth_id');
    }
};
