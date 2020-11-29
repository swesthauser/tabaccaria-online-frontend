import * as Yup from "yup";


export const ValidationSchemaLight = Yup.object().shape({
    email: Yup.string()
        .trim()
        .email("Invalid email")
        .required("Email required")
    ,
    password: Yup.string()
        .trim()
        .required('Password required')
    ,
});