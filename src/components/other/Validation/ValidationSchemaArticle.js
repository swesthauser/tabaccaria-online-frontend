import * as Yup from "yup";

const validationMaxNames = "Max. 50 characters";
const validationsMaxDescr = "Max. 250 characters";

export const ValidationSchemaArticle = Yup.object().shape({
    articleName: Yup.string()
        .trim()
        .required("Article name required")
        .max(50, validationMaxNames)
    ,
    articleDescription: Yup.string()
        .trim()
        .nullable()
        .max(250, validationsMaxDescr)
    ,
    brand: Yup.string()
        .trim()
        .nullable()
        .max(50, validationMaxNames)
    ,
    price: Yup.number()
        .positive('Must be a positive number')
        .required("Price required")
    ,
    salePrice: Yup.number()
        .positive('Must be a positive number')
        .lessThan(Yup.ref('price'), "Sale price must be smaller than price")
});