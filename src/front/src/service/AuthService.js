import axios from 'axios';
import {string} from "prop-types";

export const USER_API_BASE_URL = 'http://localhost:3001/api/';

class AuthService {

    async login(credentials){
        return await axios.post(USER_API_BASE_URL + "customer/login", credentials);
    }

    getUserInfo(){
        return JSON.parse(localStorage.getItem("userToken"));
    }

    getAuthHeader() {
        return {headers: {Authorization: 'Bearer ' + this.getUserInfo() }};
    }

    async refreshToken(){
        return await axios.post(USER_API_BASE_URL + "customer/token", {"token": localStorage.getItem("userRefreshToken").replace(/"/g, '')});
    }

    logOut() {
        localStorage.removeItem("userInfo");
        return axios.post(USER_API_BASE_URL + 'logout', {}, this.getAuthHeader());
    }
}

export default new AuthService();