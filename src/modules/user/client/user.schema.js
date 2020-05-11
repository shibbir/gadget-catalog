import { string, object, ref } from "yup";

export const loginSchema = object().shape({
    email: string()
        .email("This field should be an valid email address.")
        .required("This field must not be empty."),
    password: string()
        .min(6, "This field must be at least 6 characters long.")
        .required("This field must not be empty.")
});

export const registerSchema = object().shape({
    name: string()
        .min(2, "This field must be at least 2 characters long.")
        .max(20, "This field must be at most 20 characters long.")
        .required("This field must not be empty."),
    email: string()
        .email("This field should be an valid email address.")
        .required("This field must not be empty."),
    password: string()
        .min(6, "This field must be at least 6 characters long.")
        .required("This field must not be empty.")
});

export const changePasswordSchema = object().shape({
    currentPassword: string()
        .min(6, "This field must be at least 6 characters long.")
        .required("This field must not be empty."),
    newPassword: string()
        .min(6, "This field must be at least 6 characters long.")
        .required("This field must not be empty."),
    confirmNewPassword: string()
        .min(6, "This field must be at least 6 characters long.")
        .required("This field must not be empty.")
        .oneOf([ref("newPassword"), null], "Passwords doesn't match.")
});

export const resetPasswordSchema = object().shape({
    newPassword: string()
        .min(6, "This field must be at least 6 characters long.")
        .required("This field must not be empty."),
    confirmNewPassword: string()
        .min(6, "This field must be at least 6 characters long.")
        .required("This field must not be empty.")
        .oneOf([ref("newPassword"), null], "Passwords doesn't match.")
});

export const forgotPasswordSchema = object().shape({
    email: string()
        .email("This field should be an valid email address.")
        .required("This field must not be empty.")
});
