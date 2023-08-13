import axiosClient from "./apiClient.js";

// User signup related services

export const validateData = (data) => {
    return axiosClient().post('user/validate_data', JSON.stringify(data)).then(response => response.data);
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

// User signin related services

export const signinUser = (data) => {
    return axiosClient().post('user/login', JSON.stringify(data)).then(response => response.data)
}

export const getUser = () => {
    return axiosClient().get('user').then(response => response.data);
}
