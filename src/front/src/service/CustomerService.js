import axios from 'axios';

import AuthService , {USER_API_BASE_URL} from "./AuthService";


class CustomerService {

    isAuthenticated(){
        return localStorage.getItem("userToken")
    }

    getInfo(id) {
        return axios.post(USER_API_BASE_URL + "customer/" + id, {}, AuthService.getAuthHeader());
    }
}

export default new CustomerService()