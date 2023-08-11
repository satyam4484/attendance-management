export const userTypeOptions = [
    { value: 1, label: 'Organization' },
    { value: 2, label: 'Teacher' },
    { value: 3, label: 'Student' }
];


export const genderOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Other', label: 'Other' }
];

export const customStyles = {
    control: (baseStyles, state) => ({
        ...baseStyles,
        borderRadius: '1rem',
        paddingLeft: '0.625rem',
        paddingBottom: '0.625rem',
        paddingTop: '0.625rem',
        width: '100%',
        color: '#1C1C1C',
        appearance: 'none',
        outline: 'none',
        boxShadow: 'none',
    })
};