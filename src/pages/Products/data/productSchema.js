import * as yup from 'yup';

export const productSchema = yup.object().shape({
    product: yup.object().shape({
        ProductName: yup.string().required('Product name is required.'),
        Category: yup.string().required('Category is required.'),
        Subcategory: yup.string().required('Subcategory is required.'),
        Brand: yup.string().required('Brand is required.'),
        Price: yup.number().positive().required('Price must be a positive number.'),
        ProductDetail: yup.string().required('Product detail is required.'),
        Color: yup.string().required('Color is required.'),
        ImagePath: yup.string().url().required('Image path must be a valid URL.'),
    }),
    stockDetails: yup.array().of(
        yup.object().shape({
            size: yup.string().required('Size is required.'),
            variationAmount: yup.number().positive().required('Variation amount must be a positive number.'),
            variationActiveAmount: yup.number().positive().required('Variation active amount must be a positive number.'),
            warehouseID: yup.number().positive().required('Warehouse ID must be a positive number.'),
        })
    ),
});

