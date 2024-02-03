import * as yup from 'yup';

export const faqSchema = yup.object().shape({
    question: yup.string().required("Bu alan zorunludur").max(100, "En fazla 100 karakter olabilir"),
    answer: yup.string().required("Bu alan zorunludur").max(500, "En fazla 500 karakter olabilir"),
    category: yup.string().required("Bu alan zorunludur").max(100, "En fazla 100 karakter olabilir"),
});


