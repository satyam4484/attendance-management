import axiosClient from "./apiClient.js";
import axios from "axios";

const pincodeUrl = "https://api.postalpincode.in/pincode";

export const validateEmail = (data) => {
    return axiosClient().post('user/validate_email', JSON.stringify(data)).then(response => response.data);
}

export const createUser = (data) => {
    return axiosClient().post('user/create', JSON.stringify(data)).then(response => response.data);
}

export const validatePhoneNumber = (data) => {
    return axiosClient().post('user/validate_contact', JSON.stringify(data)).then(response => response.data);
}

export const validatePincode = (pincode) => {
    return axios.get(`${pincodeUrl}/${pincode}`).then(response => response.data);
}
