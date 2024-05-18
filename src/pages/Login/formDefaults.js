import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  mail: Yup.string()
    .email('Invalid email')
    .required('Email required'),
    password: Yup.string()
        .required('Password field is required.')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\d\s:])([^\s]){6,}$/,
            'Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
        ),
});

export const loginDefault = {
    mail: 'a@gmail.com',
    password: 'Ogme.1378',
};
