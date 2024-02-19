import * as yup from 'yup';

const validSizes = ["XS", "S", "M", "L", "XL", "XXL"];

export const cartSchema = yup.object().shape({
  productID: yup.number().integer().min(0).required().typeError("Product id must be a number."),
  size: yup.string().required("Size cannot be empty.").oneOf(validSizes, "Size must be one of: XS, S, M, L, XL, XXL"),
  amount: yup.number().integer().min(0).required().typeError("Amount must be a number."),
  userID: yup.number().integer().min(0).required().typeError("UserID must be a number.")
});


