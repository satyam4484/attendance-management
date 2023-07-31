import axiosClient from "./apiClient.js";

// this file contains all the api code

export const email =() => {
    return axiosClient().post('user/validate_email',{"email":"abhicaptain99@gmail.com"}).then(response => response.data);
}