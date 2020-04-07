import axios from 'axios';

export const USER_API_BASE_URL = 'http://localhost:3001/api/';

class AuthService {

    login(credentials){
        return axios.post(USER_API_BASE_URL + "customer/login", credentials);
    }

    getUserInfo(){
        return JSON.parse(localStorage.getItem("userToken"));
    }

    getAuthHeader() {
        return {headers: {Authorization: 'Bearer ' + this.getUserInfo() }};
    }

    refreshToken(){
        return axios.post(USER_API_BASE_URL + "customer/token", {"token": localStorage.getItem("userRefreshToken")});
    }
    logOut() {
        localStorage.removeItem("userInfo");
        return axios.post(USER_API_BASE_URL + 'logout', {}, this.getAuthHeader());
    }
}

export default new AuthService();