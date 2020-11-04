import axios from "axios";
import ValidateUtility from "../common/utility/ValidateUtility";

axios.interceptors.response.use((response) => {
    ValidateUtility.hasGotErrorResponse = false;
    return response;
}, (error) => {
    console.log(error.response);
    if(ValidateUtility.hasGotErrorResponse)
        return Promise.reject(error.response);
    ValidateUtility.hasGotErrorResponse = true;
    if(error.response.status === 401) {
        ValidateUtility.clearAuthCookies(this.$store);
        router.push({name: 'login', params: {msg: 'Your session has expired, please login again!'}});
    }
    return Promise.reject(error.response);
});
