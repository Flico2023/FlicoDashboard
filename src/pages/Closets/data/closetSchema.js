import * as yup from "yup";

export const closetSchema = yup.object().shape({
  closetID: yup.number(), //! BURASI ÇIKARTILABİLİR Mİ
  closetNo: yup
    .number()
    .typeError("Closet No must be a positive integer")
    .integer("Closet No must be a positive integer")
    .positive("Closet No must be a positive integer")
    .required("Closet No is required"),
  airportID: yup //!burası name mi olucak acaba
  .number()
  .required("Airport is required"),
  orderID: yup
  .number()
  .typeError("Order No must be a positive integer")
  .integer("Order No must be a positive integer")
  .positive("Order No must be a positive integer")
  .required("Order No is required"),
  password: yup.number().required("Password is required"),
  status: yup.string().required("isEmpty is required"),
});
