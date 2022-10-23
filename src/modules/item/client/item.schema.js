import { string, object, number, date } from "yup";

export const itemSchema = object().shape({
    name: string()
        .min(2, "This field must be at least 2 characters long.")
        .max(50, "This field must be at most 50 characters long.")
        .required("This field must not be empty."),
    categoryId: string()
        .required("This field must not be empty."),
    brandId: string()
        .required("This field must not be empty."),
    purchaseDate: date()
        .required("This field must not be empty."),
    currency: string()
        .required("This field must not be empty."),
    price: number()
        .required("This field must not be empty."),
    payee: string()
        .min(2, "This field must be at least 2 characters long.")
        .max(30, "This field must be at most 50 characters long.")
});
