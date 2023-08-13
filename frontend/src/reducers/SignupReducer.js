// Initial state for the signup form
export const initialStateSignup = {
    // Fields for user details
    name: { value: "", touched: false, hasError: false, error: "", msgType: "danger" },
    email: { value: "", touched: false, hasError: false, error: "", msgType: "danger" },
    password: { value: "", touched: false, hasError: false, error: "", msgType: "danger" },
    confirmPassword: { value: "", touched: false, hasError: false, error: "", msgType: "danger" },
    phoneNumber: { value: "", touched: false, hasError: false, error: "", msgType: "danger" },
    dateOfBirth: { value: "", touched: false, hasError: false, error: "", msgType: "danger" },
    country: "India",
    stateNew: { value: "", touched: false, hasError: false, error: "", msgType: "danger" },
    city: { value: "", touched: false, hasError: false, error: "", msgType: "danger" },
    pincode: { value: "", touched: false, hasError: false, error: "", msgType: "danger" },
    address: { value: "", touched: false, hasError: false, error: "", msgType: "danger" },
    formValid: false,
    userType: { value: 0, touched: false, hasError: false, error: "", msgType: "danger" },
    gender: { value: "", touched: false, hasError: false, error: "", msgType: "danger" },
    otpCode: { value: "", touched: false, hasError: false, error: "", msgType: "danger" },
};

// Reducer for the signup form state
export const signupReducer = (state, action) => {
    switch (action.type) {

        case "SIGNUP_USER_TYPE":
            return {
                ...state,
                userType: {
                    ...state.userType,
                    value: Number(action.payload)
                }
            }

        case "SET_GENDER":
            return {
                ...state,
                gender: {
                    ...state.gender,
                    value: action.payload
                }
            }

        case 'SIGNUP_INPUT_FOCUSED':
            return {
                ...state,
                [action.payload]: { ...state[action.payload], touched: true }
            }


        case 'SIGNUP_INPUT_CHANGE':
            // Handling special validation for date of birth
            if (action.payload.key === 'dateOfBirth') {
                const selectedDate = new Date(action.payload.value);
                const minDate = new Date('1900-01-01');
                const maxDate = new Date(); // Today's date

                if (selectedDate < minDate || selectedDate > maxDate) {
                    return {
                        ...state,
                        [action.payload.key]: {
                            ...state[action.payload.key],
                            hasError: true,
                            error: `Please enter a valid Date of Birth!`,
                            value: action.payload.value
                        },
                        formValid: false
                    };
                }
            }

            // Handling other input changes
            return {
                ...state,
                [action.payload.key]: {
                    ...state[action.payload.key],
                    value: action.payload.value,
                    hasError: false
                }
            }

        case 'SIGNUP_INPUT_BLUR':
            // Handling blur events and validations for all fields
            if (action.payload.value.trim().length === 0) {
                return {
                    ...state,
                    [action.payload.key]: {
                        ...state[action.payload.key],
                        hasError: true,
                        error: `${action.payload.placeholder} field is required!`
                    },
                    formValid: false
                }
            }

            // Handling email validation when email is not in correct format
            if (action.payload.key === 'email' && action.payload.value.indexOf('@gmail.com') === -1) {
                return {
                    ...state,
                    [action.payload.key]: {
                        ...state[action.payload.key],
                        hasError: true,
                        error: `Email must be like "user@gmail.com"!`
                    },
                    formValid: false
                }
            }

            // Handling password validation when password is less than 8 characters
            if (action.payload.key === 'password' && action.payload.value.trim().length < 8) {
                return {
                    ...state,
                    [action.payload.key]: {
                        ...state[action.payload.key],
                        hasError: true,
                        error: `${action.payload.placeholder} must be at least 8 characters long!`
                    },
                    formValid: false
                }
            }

            // Handling confirmPassword validation when confirm password is not same as password
            if (action.payload.key === 'confirmPassword' && action.payload.value !== state.password.value) {
                return {
                    ...state,
                    [action.payload.key]: {
                        ...state[action.payload.key],
                        hasError: true,
                        error: `Password and Confirm Password must be same!`
                    },
                    formValid: false
                }
            }

            // Handling phoneNumber validation when phoneNumber is not 10 digits long
            if (action.payload.key === 'phoneNumber' && !/^\d{10}$/.test(action.payload.value)) {
                return {
                    ...state,
                    [action.payload.key]: {
                        ...state[action.payload.key],
                        hasError: true,
                        error: `${action.payload.placeholder} must be 10 digits long!`
                    },
                    formValid: false
                };
            }

            // Handling pincode validation when pincode is not 6 digits long
            if (action.payload.key === 'pincode' && !/^\d{6}$/.test(action.payload.value)) {
                return {
                    ...state,
                    [action.payload.key]: {
                        ...state[action.payload.key],
                        hasError: true,
                        error: `${action.payload.placeholder} must be 6 digits long!`,
                    },
                    formValid: false
                };
            }

            return {
                ...state,
                formValid: true // Set formValid to true when all validations pass
            };

        case 'CAPITALISE_DATA': // Capitalizing and updating field value
            const capitalizedValue = action.payload.value.trim().toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase());

            return {
                ...state,
                [action.payload.key]: {
                    ...state[action.payload.key],
                    value: capitalizedValue,
                    hasError: false,
                    error: action.payload.value,
                }
            }

        case 'SIGNUP_VALID_DATA':
            if (state[action.payload.key].hasError) return state; // Updating valid data

            return {
                ...state,
                [action.payload.key]: {
                    ...state[action.payload.key],
                    hasError: action.payload.error,
                    error: action.payload.value,
                    msgType: action.payload.msgType
                }
            }

        case "SIGNUP_FORM_VALID": // Checking if all required fields are filled
            if (
                state.name.value.length > 0 &&
                state.email.value.length > 0 &&
                state.password.value.length > 0 &&
                state.confirmPassword.value.length > 0 &&
                state.phoneNumber.value.length > 0 &&
                state.userType.value.length > 0 &&
                state.dateOfBirth.value.length > 0 &&
                state.stateNew.value.length > 0 &&
                state.city.value.length > 0 &&
                state.pincode.value.length > 0 &&
                state.address.value.length > 0 &&
                state.gender.value !== ""
            ) {
                return {
                    ...state,
                    formValid: true
                }
            }

            return {
                ...state,
                formValid: false
            }


        case 'SIGNUP_RESET': // Resetting form to initial state
            return {
                ...state,
                ...initialStateSignup, // Reset all fields
            };

        default:
            return state
    }
}