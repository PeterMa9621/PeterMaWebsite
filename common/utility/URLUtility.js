class URLUtility {
    static encodeData(data) {
        return Object.keys(data).map(function(key) {
            return [key, data[key]].map(encodeURIComponent).join("=");
        }).join("&");
    }

    static getUrlWithAuthInfo(url) {
        let userId = window.$nuxt.$cookies.get('auth_id');
        let authToken = window.$nuxt.$cookies.get('auth_token');
        let params = URLUtility.encodeData({
            user_id: userId,
            auth_token: authToken
        });

        if(url.includes('?'))
            url += '&';
        else
            url += '?';
        url += params;
        return url;
    }

    static getAuthHeaders(authToken=null, authId=null) {
        let auth_token = authToken==null ? window.$nuxt.$cookies.get('auth_token') : authToken;
        let user_id = authId==null ? window.$nuxt.$cookies.get('auth_id') : authId;
        return {
            headers: {
                Authorization: "Basic " + auth_token + " " + user_id
            }
        };
    }

    static getAuthHeaders2(authToken=null, authId=null) {
        return {
            headers: {
                auth_token : authToken==null ? window.$nuxt.$cookies.get('auth_token') : authToken,
                user_id: authId==null ? window.$nuxt.$cookies.get('auth_id') : authId
            }
        }
    }

    static createObjectURL(object) {
        return (window.URL) ? window.URL.createObjectURL(object) : window.webkitURL.createObjectURL(object);
    }
}

export default URLUtility;
