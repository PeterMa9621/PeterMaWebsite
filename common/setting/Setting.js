export default class Setting {
    static useHttp = true;
    static protocol = this.useHttp ? 'http://' : 'https://';
    static baseUrl = this.protocol + 'localhost:3000/';
    static apiBaseUrl = this.baseUrl + 'api/';
    static userApiUrl = this.apiBaseUrl + 'user/';
    static userLoginApiUrl = this.apiBaseUrl + 'user/login/';
    static blogApiUrl = this.apiBaseUrl + 'blog/';
    static projectApiUrl = this.apiBaseUrl + 'project/';
}
