import * as Yup from 'yup';

export const itemSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'This field must be at least 2 characters long.')
        .max(50, 'This field must be at most 30 characters long.')
        .required('This field must not be empty.'),
    categoryId: Yup.string()
        .required('This field must not be empty.'),
    brandId: Yup.string()
        .required('This field must not be empty.'),
    purchaseDate: Yup.date()
        .required('This field must not be empty.'),
    price: Yup.number()
        .required('This field must not be empty.')
});
