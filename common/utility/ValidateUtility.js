class ValidateUtility {
    static hasGotErrorResponse = false;

    static validateEmail(email) {
        // eslint-disable-next-line no-useless-escape
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    static validatePhoneNumber(phoneNumber) {
        const result = phoneNumber.match(/\d/g);
        if(result!=null)
            return result.length===10;
        return false;
    }

    static clearAuthCookies(store) {
        window.$nuxt.$cookies.remove('auth_token');
        window.$nuxt.$cookies.remove('auth_id');
        store.commit('user/clear');
    }

    static getAuthCookies() {
        let authToken = window.$nuxt.$cookies.get('auth_token');
        let authId = window.$nuxt.$cookies.get('auth_id');
        return {authToken, authId}
    }
}

export default ValidateUtility;
