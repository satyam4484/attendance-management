import axiosClient from "./apiClient.js";

export const validateEmail = (data) => {
    return axiosClient().post('user/validate_email', JSON.stringify(data)).then(response => response.data);
}

export const validatePhoneNumber = (data) => {
    return axiosClient().post('user/validate_contact', JSON.stringify(data)).then(response => response.data);
}

export const createUser = (data) => {
    return axiosClient().post('user/create', JSON.stringify(data)).then(response => response.data);
}

// OTP related services 

export const generateOtp = (data) => {
    return axiosClient().post('user/generate-otp', JSON.stringify(data)).then(response => response.data)
}

export const validateOtp = (data) => {
    return axiosClient().post('user/verify-otp', JSON.stringify(data)).then(response => response.data)
}
