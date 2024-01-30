import * as yup from 'yup';

export const stockDetailsSchema = yup.object().shape({
  stockDetail: yup.array().of(
    yup.object().shape({
      size: yup.string().required('Size alanı zorunludur.'),
      variationAmount: yup
        .number()
        .typeError("Amount alanı bir sayı olarak girilmelidir")
        .integer('Amount tam sayı olmalıdır.')
        .positive('Amount pozitif bir sayı olmalıdır.')
        .required('Amount alanı zorunludur.'),
      variationActiveAmount: yup
        .number()
        .typeError("Current Amount alanı bir sayı olarak girilmelidir")
        .integer('Current Amount tam sayı olmalıdır.')
        .positive('Current Amount pozitif bir sayı olmalıdır.')
        .required('Current Amount alanı zorunludur.'),
      warehouseID: yup.number().required('Warehouse alanı zorunludur.'),
    })
  ),
});
