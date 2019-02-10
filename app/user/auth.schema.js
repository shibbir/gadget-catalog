import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
    email: Yup.string()
        .email('This field should be an valid email address.')
        .required('This field must not be empty.'),
    password: Yup.string()
        .min(6, 'This field must be at least 6 characters long.')
        .required('This field must not be empty.')
});

export const registerSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'This field must be at least 2 characters long.')
        .max(20, 'This field must be at most 20 characters long.')
        .required('This field must not be empty.'),
    email: Yup.string()
        .email('This field should be an valid email address.')
        .required('This field must not be empty.'),
    password: Yup.string()
        .min(6, 'This field must be at least 6 characters long.')
        .required('This field must not be empty.')
});

export const passwordSchema = Yup.object().shape({
    currentPassword: Yup.string()
        .min(6, 'This field must be at least 6 characters long.')
        .required('This field must not be empty.'),
    newPassword: Yup.string()
        .min(6, 'This field must be at least 6 characters long.')
        .required('This field must not be empty.'),
    confirmNewPassword: Yup.string()
        .min(6, 'This field must be at least 6 characters long.')
        .required('This field must not be empty.')
});
