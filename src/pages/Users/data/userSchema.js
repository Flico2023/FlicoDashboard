/**const userDefault = {
    name: '',
    surname: '',
    email: '',
    password: '',
    phone: '',
} */

import * as yup from 'yup';

const phoneRegex2 = /^(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/;

const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

const withNonEnglishLetters = /[a-zçğıöşü]/i;

export const userSchema = yup.object().shape({
    name: yup.string().required('İsim zorunlu'),
    surname: yup.string().required('Soyisim zorunlu'),
    email: yup.string().email('Geçersiz e-posta').required('E-posta zorunlu'),
    password: yup.string()
        .required('Şifre zorunlu')
        .min(6, 'Şifre en az 6 karakter olmalıdır')
        .matches(withNonEnglishLetters
            , 'Şifre en az bir küçük harf içermelidir')
        .matches(withNonEnglishLetters
            , 'Şifre en az bir büyük harf içermelidir'),
    phone: yup.string()
        .required('Telefon numarası zorunlu')
        .matches(phoneRegex, 'Geçerli bir telefon numarası giriniz'),
});


