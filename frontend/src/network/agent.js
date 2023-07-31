import axiosClient from "./apiClient.js";

export const validateEmail = (data) => {
    return axiosClient().post('user/validate_email', JSON.stringify(data)).then(response => response.data);
}