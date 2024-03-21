import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password required'),
});

export const loginDefault = {
    email: '',
    password: '',
    };
