export default class authUtility {
    static getAuthInfo(request) {
        let authToken = request.query['auth_token'];
        if(authToken === undefined) {
            authToken = request.body['auth_token'];
        }

        let authId = request.query['authId'];
        if(authId === undefined) {
            authId = request.body['authId'];
        }

        if(authToken === undefined || authId === undefined) {
            let headers = request.headers;
            let authInfo = headers['authorization'];
            if(authInfo !== undefined) {
                let tmp = authInfo.split(' ');
                authToken = tmp[1];
                authId = tmp[2];
            }
        }

        if(authToken === undefined || authId === undefined) {
            return [false, {
                msg: 'You don\'t have access for this resource!'
            }];
        }
        return [true, authToken, authId]
    }
}
