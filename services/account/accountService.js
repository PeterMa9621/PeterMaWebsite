import axios from "axios";
import Setting from "../../common/setting/Setting";

export default class AccountService {
    static login({username, password, authToken, authId}) {
        let data = {};
        if(username!==undefined && password!==undefined) {
            data = {
                username: username,
                password: password
            };
        } else {
            data = {
                authToken: authToken,
                authId: authId
            }
        }
        return new Promise((resolve, reject) => {
            axios.post(Setting.userLoginApiUrl, data).then(response => {
                let data = response.data;
                let user = data['user'];
                user['token'] = data['token'];
                resolve(user);
            }).catch(reason => {
                reject(reason);
            });
        });
    }

    static register(userData) {
        return new Promise((resolve, reject) => {
            axios.post(Setting.userApiUrl, userData).then(response => {
                resolve(response.data);
            }).catch(reason => {
                reject(reason);
            });
        });
    }

    static logout(userId) {
        return new Promise((resolve, reject) => {
            resolve();
        });
    }

    static getUser(userId) {
        return new Promise((resolve, reject) => {
            axios.get(Setting.userApiUrl + userId).then(response => {
                resolve(response.data);
            }).catch(reason => {
                reject(reason);
            });
        });
    }
}
