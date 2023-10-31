import * as yup from "yup";

const contactSchema = yup.object({
    fullname: yup
        .string()
        .required("fullname cannot be empty")
        .min(8, "username must be at least 8 characters")
        .max(20, "username must be maximum 20 characters"),
    email: yup.string().email().required("email cannot be empty"),
    question: yup
        .string()
        .required("question cannot be empty")
})

export type ContactFormData = yup.InferType<typeof contactSchema>;
export default contactSchema;