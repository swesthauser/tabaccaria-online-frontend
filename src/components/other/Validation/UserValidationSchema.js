import * as Yup from "yup";

const regexName = /^[a-zA-Z äöüéèàÜÖÄÉÈÀ,+-]+$/;
const regexLetter = /^[a-zA-Z äöüéèàÜÖÄÉÈÀ]+$/;
const validationName = "Must have only letters or ' ', '+', '-'";
const validationLetter = "Must have only letters";
const validationMaxNames = "Max. 50 characters";
const validationsMaxPasswords = "Max. 30 characters";
const validationsMaxAddress = "Max. 250 characters";

export const UserValidationSchema = Yup.object().shape({
    id: Yup.string()
        .nullable(true)
    ,
    email: Yup.string()
        .trim()
        .email("Invalid email")
        .required("Email required")
        .max(50, validationMaxNames)
    ,
    emailRepeat: Yup.string()
        .trim()
        .email("Invalid email")
        .nullable(true)
        .max(50, validationMaxNames)
        .oneOf([Yup.ref('email')], "Emails don't match")
    ,
    password: Yup.string()
        .trim()
        .required('Password required')
        .max(50, validationsMaxPasswords)
    ,
    passwordRepeat: Yup.string()
        .trim()
        .nullable(true)
        .max(50, validationsMaxPasswords)
        .oneOf([Yup.ref('password')], "Passwords don't match")
    ,
    firstName: Yup.string()
        .trim()
        .required('First name required')
        .matches(regexName, validationName)
        .max(50, validationMaxNames)
    ,
    lastName: Yup.string()
        .trim()
        .required('Last name required')
        .matches(regexName, validationName)
        .max(50, validationMaxNames)
    ,
    addressId: Yup.string()
        .trim()
        .required('Street and house number required')
        .max(250, validationsMaxAddress)
    ,
    zipPlace: Yup.object().shape({
        zip: Yup.string()
            .trim()
            .required('Zip required')
            .max(50, validationsMaxAddress),
        city: Yup.string()
            .trim()
            .required('Zip and place required')
            .max(50, validationsMaxAddress)
    })
});