import axiosClient from "./apiClient.js";

export const validateEmail = (data) => {
    return axiosClient().post('user/validate_email', JSON.stringify(data)).then(response => response.data)
}

export const createUser = (data) => {
    return axiosClient().post('user/create/', JSON.stringify(data)).then(response => response.data);
}

export const getUser = (data) => {
    return axiosClient().get('user').then(response => response.data);
}