import AccountService from "../services/account/accountService";

export default async function ({app, store, redirect}) {
    if(store.state.user == null || !store.state.user.isAuthorized) {
        let authToken = app.$cookies.get('auth_token');
        let authId = app.$cookies.get('auth_id');
        if(authToken===null || authToken===undefined || authId===null || authId===undefined) {
            redirect('/login');
            return;
        }
        let user = await AccountService.login({authToken, authId});
        if(user===null)
            redirect('/login');
        else
            store.commit('user/set', user);
    }
}
