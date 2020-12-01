import React, { useState, useEffect, useContext } from "react";
import { makeStyles, TextField, Typography, Button, Switch, FormControlLabel } from "@material-ui/core";
import { Formik } from "formik";
import { withStyles } from '@material-ui/core/styles';
import { ValidationSchemaArticle } from "../../other/Validation/ValidationSchemaArticle";
import OwnButton from "../../atoms/OwnButton/OwnButton";
import ArticleService from "../../../service/ArticleService";
import SessionHandlerContext from "../../other/Context/SessionHandlerContext";
import { useHistory } from "react-router-dom";


const BlueSwitch = withStyles({
    switchBase: {
        color: "#F3FAF0",
        '&$checked': {
            color: "#87C4F4",
        },
        '&$checked + $track': {
            backgroundColor: "#87C4F4",
        },
    },
    checked: {},
    track: {},
})(Switch);

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
        margin: "10px",
        marginRight: "80px"

    },
    footer: {
        textAlign: "center",
        margin: "20px"
    }
}));

const ArticleForm = ({ article, mode, handleDialog }) => {

    const { getAllArticles } = useContext(SessionHandlerContext);

    const classes = useStyles();

    const [isAvailable, setIsAvailable] = useState(article.available);

    const handleAvailable = () => {
        setIsAvailable(!isAvailable);
    }

    return (
        <Formik
            initialValues={article}
            enableReinitialize
            validationSchema={ValidationSchemaArticle}
            onSubmit={(values) => {
                var dto = {};
                if (mode === 'edit') {
                    dto = { ...article, ...values };
                    ArticleService.update(dto.id, dto)
                        .then(() => {
                        })
                        .catch(err => {
                            console.error('Error in ArticleForm: ', err);
                        })
                        .finally(() => {
                            handleDialog();
                            getAllArticles();
                        })
                } else {
                    dto = values;
                    ArticleService.create(dto)
                        .then(() => {
                        })
                        .catch(err => {
                            console.error('Error in ArticleForm: ', err);
                        })
                        .finally(() => {
                            handleDialog();
                            getAllArticles();
                        })
                }
                console.log('ArticleForm output ', dto);
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
                                defaultValue={initialValues.brand}
                            />
                            <FormControlLabel
                                control={<BlueSwitch
                                    checked={isAvailable}
                                    onChange={handleAvailable}
                                    color="primary"
                                    name="available"
                                    inputProps={{ 'aria-label': 'available checkbox' }}
                                />}
                                label="Available"
                                className={classes.switch}
                            />
                        </div>
                        <div className={classes.inputs}>
                            <TextField
                                id="price"
                                name="price"
                                label="Price *"
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
                                text={mode === 'edit' ? "Update" : "Create"}
                            />
                        </div>
                    </form>
                )
            }}
        </Formik>
    );
}
export default ArticleForm;