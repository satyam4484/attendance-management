import axios from "axios";

const pincodeUrl = "https://api.postalpincode.in/pincode";

export const validatePincode = (pincode) => {
    return axios.get(`${pincodeUrl}/${pincode}`).then(response => response.data);
}
