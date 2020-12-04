export default class Setting {
    static useHttp = process.env.NODE_ENV !== 'production';
    static protocol = this.useHttp ? 'http://' : 'https://';
    static baseUrl = this.protocol + ((process.env.NODE_ENV === 'production') ? 'peterma.website/' : '0.0.0.0:3000/');
    static apiBaseUrl = this.baseUrl + 'api/';
    static userApiUrl = this.apiBaseUrl + 'user/';
    static userLoginApiUrl = this.apiBaseUrl + 'user/login/';
    static blogApiUrl = this.apiBaseUrl + 'blog/';
    static projectApiUrl = this.apiBaseUrl + 'project/';
}
