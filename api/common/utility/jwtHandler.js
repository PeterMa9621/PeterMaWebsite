import jwtSetting from "../setting/jwtSetting";

const jwt = require('jsonwebtoken');

export default class jwtHandler {
    constructor({token, userId}) {
        this.token = token === undefined ? null : token;
        this.userId = userId === undefined ? null : userId;
    }

    isValid() {
        if(this.token !== null) {
            try {
                let decodedUser = jwt.verify(this.token, jwtSetting.privateKey);
                if(decodedUser['data']['userId']===this.userId)
                    return true
            } catch (e) {
                return false;
            }
        }
        return false
    }

    generateToken() {
        return jwt.sign({
            data: {
                userId: this.userId
            }
        }, jwtSetting.privateKey, { expiresIn: '7d' });
    }
}
