import * as Yup from 'yup';


const phoneRegex = /^(\+90|0)?\d{10}$/;

const outsourceSchema = Yup.object().shape({
  companyName: Yup.string().required('Şirket adı zorunludur'),
  city: Yup.string().required('Şehir zorunludur'),
  email: Yup.string().email('Geçerli bir e-posta adresi giriniz').required('E-posta zorunludur'),
  contactPerson: Yup.string().required('İletişim kişisi zorunludur'),
  phone: Yup.string()
    .matches(phoneRegex, 'Geçerli bir Türkiye telefon numarası giriniz')
    .required('Telefon numarası zorunludur'),
  address: Yup.string().required('Adres zorunludur'),
});

export default outsourceSchema;
