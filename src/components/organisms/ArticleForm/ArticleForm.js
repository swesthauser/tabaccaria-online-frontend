import React, { useState, useEffect } from "react";
import { makeStyles, TextField, Typography, Button, Switch } from "@material-ui/core";
import { Formik } from "formik";
import { ValidationSchemaArticle } from "../../other/Validation/ValidationSchemaArticle";
import OwnButton from "../../atoms/OwnButton/OwnButton";


const useStyles = makeStyles((theme) => ({
    title: {
        marginTop: "20px",
        textAlign: "center",
        color: "#87C4F4",

    },
    inputs: {
        textAlign: "center",
        margin: "20px",
    },
    input: {
        marginLeft: "20px",
    },
    button: {
        backgroundColor: "#87C4F4"
    },
    helperText: {
        margin: "10px"
    },
    link: {
        textDecoration: "none"
    },
    switch: {
        margin: "10px"
    },
    footer: {
        textAlign: "center",
        margin: "20px"
    }
}));

const ArticleForm = ({ article }) => {

    const classes = useStyles();

    return (
        <Formik
            initialValues={article}
            enableReinitialize
            validationSchema={ValidationSchemaArticle}
            onSubmit={(values) => {
                console.log('User data: ', values)
            }}
        >
            {({ handleSubmit, errors, touched, handleChange, initialValues, dirty }) => {
                return (
                    <form method="post" onSubmit={handleSubmit} onChange={handleChange}>
                        <div className={classes.inputs}>
                            <TextField
                                id="articleName"
                                name="articleName"
                                label="Article name *"
                                variant="outlined"
                                type="text"
                                error={errors.articleName && touched.articleName}
                                helperText={touched.articleName ? errors.articleName : null}
                                className={classes.input}
                                defaultValue={initialValues.articleName}
                            />
                            <TextField
                                id="articleDescription"
                                name="articleDescription"
                                label="Article description"
                                variant="outlined"
                                type="text"
                                multiline
                                error={errors.articleDescription && touched.articleDescription}
                                helperText={touched.articleDescription ? errors.articleDescription : null}
                                className={classes.input}
                                defaultValue={initialValues.articleDescription}
                            />
                        </div>
                        <div className={classes.inputs}>
                            <TextField
                                id="brand"
                                name="brand"
                                label="Brand"
                                variant="outlined"
                                type={"text"}
                                error={errors.brand && touched.brand}
                                helperText={touched.brand ? errors.brand : null}
                                className={classes.input}
                            />
                            {/* 
                                Here comes a switch --> Bench App
                            */}
                        </div>

                        <div className={classes.inputs}>
                            <TextField
                                id="price"
                                name="price"
                                label="Price"
                                variant="outlined"
                                type="text"
                                error={errors.price && touched.price}
                                helperText={touched.price ? errors.price : null}
                                className={classes.input}
                                defaultValue={initialValues.price}
                            />
                            <TextField
                                id="salePrice"
                                name="salePrice"
                                label="Sale Price"
                                variant="outlined"
                                type="text"
                                error={errors.salePrice && touched.salePrice}
                                helperText={touched.salePrice ? errors.salePrice : null}
                                className={classes.input}
                                defaultValue={initialValues.salePrice}
                            />
                        </div>
                        <div className={classes.inputs}>
                            <OwnButton
                                typeOfButton={"formikSubmit"}
                                isNotChanged={!dirty}
                                text={"Update"}
                            />
                        </div>
                    </form>
                )
            }}
        </Formik>
    );
}
export default ArticleForm;