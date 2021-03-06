import * as Yup from "yup";

const regexName = /^[a-zA-Z äöüéèàÜÖÄÉÈÀ,+-]+$/;
const regexLetter = /^[a-zA-Z äöüéèàÜÖÄÉÈÀ]+$/;
const validationName = "Must have only letters or ' ', '+', '-'";
const validationLetter = "Must have only letters";
const validationMaxNames = "Max. 50 characters";
const validationsMaxAddress = "Max. 250 characters";

export const ValidationSchemaUpdate = Yup.object().shape({
    email: Yup.string()
        .trim()
        .email("Invalid email")
        .required("Email required")
        .max(50, validationMaxNames)
    ,
    emailRepeat: Yup.string()
        .trim()
        .email("Invalid email")
        .required("Email required")
        .max(50, validationMaxNames)
        .oneOf([Yup.ref('email')], "Emails don't match")
    ,
    firstname: Yup.string()
        .trim()
        .required('First name required')
        .matches(regexName, validationName)
        .max(50, validationMaxNames)
    ,
    lastname: Yup.string()
        .trim()
        .required('Last name required')
        .matches(regexName, validationName)
        .max(50, validationMaxNames)
    ,
    streetAndNumber: Yup.string()
        .trim()
        .required('Street and house number required')
        .max(250, validationsMaxAddress)
    ,
    zipAndPlace: Yup.string()
        .trim()
        .required('Zip and place required')
        .max(250, validationsMaxAddress)
    ,
});