import * as yup from 'yup';

export const productSchema = yup.object().shape({
  image: yup
    .string().required('Bir dosya seçmelisiniz.')
    /*.test('fileSize', 'Dosya boyutu 3 MB\'dan küçük olmalıdır.', (value) => {
      return value && value[0].size <= 3000000;
    })*/
    /*.test('fileType', 'Dosya türü bir .png .jpg veya .jpeg. olmalıdır', (value) => {
      return value && ['image/jpeg', 'image/png', 'image/jpg'].includes(value[0].type);
    })*/,
  brand: yup.string().required('Brand alanı zorunludur.'),
  productName: yup.string().required('Name alanı zorunludur.'),
  category: yup.string().required('Category alanı zorunludur.'),
  subcategory: yup.string().required('Subcategory alanı zorunludur.'),
  color: yup.string().required('Color alanı zorunludur.'),
  price: yup
    .number()
    .typeError("Price alanı bir sayı olarak girilmelidir")
    .positive('Price pozitif bir sayı olmalıdır.')
    .required('Price alanı zorunludur.'),
    productDetail: yup.string().required('Details alanı zorunludur.'),
  gender: yup.string().required('Gender alanı zorunludur.'),

});