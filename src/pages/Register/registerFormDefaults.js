import * as yup from 'yup';

export const registerSchema = yup.object().shape({
    name: yup.string().required('Name field is required.'),
    surname: yup.string().required('Surname field is required.'),
    email: yup.string().email('Please enter a valid email address.').required('Email field is required.'),
    password: yup.string()
        .required('Password field is required.')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\d\s:])([^\s]){6,}$/,
            'Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
        ),
    phone: yup.string().required('Phone number field is required.')
});


export const registerDefault = {
    name: '',
    surname: '',
    email: '',
    password: '',
    phone: '',
};