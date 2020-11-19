import React, { Fragment, useState, useEffect } from "react";
import { makeStyles, TextField, Typography, Button, Switch } from "@material-ui/core";
import { Formik } from "formik";
import { ValidationSchema } from "../../other/ValidationSchema";
import NavbarHeader from "../../molecules/NavbarHeader/NavbarHeader";


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

const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [typePassword, setTypePassword] = useState("password");
    const [textShowPassword, setTextShowPassword] = useState("Show password")
    const classes = useStyles();

    const object = {
        email: '',
        emailRepeat: '',
        password: '',
        passwordRepeat: '',
        firstname: '',
        lastname: '',
        streetAndNumber: '',
        zipAndPlace: '',
        country: ''
    }

    const changePasswordType = () => {
        setTypePassword(showPassword ? "text" : "password");
        setTextShowPassword(!showPassword ? "Show password" : "Hide password")
    }

    useEffect(() => {
        changePasswordType();
        // eslint-disable-next-line
    }, [showPassword])

    return (
        <Formik
            initialValues={object}
            enableReinitialize
            validationSchema={ValidationSchema}
            onSubmit={(values) => {
                const dto = { ...object, ...values };
                console.log('DTO: ', dto)
            }}
        >
            {({ handleSubmit, errors, touched, handleChange }) => {
                return (
                    <Fragment>
                        <NavbarHeader isLoggedIn={false} />
                        <form method="post" onSubmit={handleSubmit} onChange={handleChange}>
                            <div className={classes.inputs}>
                                <TextField
                                    id="email"
                                    name="email"
                                    label="Email"
                                    required
                                    variant="outlined"
                                    type="text"
                                    error={errors.email && touched.email}
                                    helperText={touched.email ? errors.email : null}
                                    className={classes.input}
                                />
                                <TextField
                                    id="emailRepeat"
                                    name="emailRepeat"
                                    label="Confirm email"
                                    required
                                    variant="outlined"
                                    type="text"
                                    error={errors.emailRepeat && touched.emailRepeat}
                                    helperText={touched.emailRepeat ? errors.emailRepeat : null}
                                    className={classes.input}
                                />
                            </div>
                            <div className={classes.inputs}>
                                <TextField
                                    id="password"
                                    name="password"
                                    label="Password"
                                    variant="outlined"
                                    required
                                    type={typePassword}
                                    error={errors.password && touched.password}
                                    helperText={touched.password ? errors.password : null}
                                    className={classes.input}
                                />
                                <TextField
                                    id="passwordRepeat"
                                    name="passwordRepeat"
                                    label="Confirm password"
                                    variant="outlined"
                                    required
                                    type={typePassword}
                                    error={errors.passwordRepeat && touched.passwordRepeat}
                                    helperText={touched.passwordRepeat ? errors.passwordRepeat : null}
                                    className={classes.input}
                                />
                            </div>
                            <div className={classes.inputs}>
                                <TextField
                                    id="firstname"
                                    name="firstname"
                                    label="First name"
                                    variant="outlined"
                                    required
                                    type="text"
                                    error={errors.firstname && touched.firstname}
                                    helperText={touched.firstname ? errors.firstname : null}
                                    className={classes.input}
                                />
                                <TextField
                                    id="lastname"
                                    name="lastname"
                                    label="Last name"
                                    variant="outlined"
                                    required
                                    type="text"
                                    error={errors.lastname && touched.lastname}
                                    helperText={touched.lastname ? errors.lastname : null}
                                    className={classes.input}
                                />
                            </div>
                            <div className={classes.inputs}>
                                <TextField
                                    id="streetAndNumber"
                                    name="streetAndNumber"
                                    label="Street + house number"
                                    variant="outlined"
                                    required
                                    multiline
                                    type="text"
                                    error={errors.streetAndNumber && touched.streetAndNumber}
                                    helperText={touched.streetAndNumber ? errors.streetAndNumber : null}
                                    className={classes.input}
                                />
                                <TextField
                                    id="zipAndPlace"
                                    name="zipAndPlace"
                                    label="Zip + place"
                                    variant="outlined"
                                    required
                                    multiline
                                    type="text"
                                    error={errors.zipAndPlace && touched.zipAndPlace}
                                    helperText={touched.zipAndPlace ? errors.zipAndPlace : null}
                                    className={classes.input}
                                />
                            </div>
                            <div className={classes.inputs}>
                                <TextField
                                    id="country"
                                    name="country"
                                    label="Country"
                                    variant="outlined"
                                    required
                                    type="text"
                                    error={errors.country && touched.country}
                                    helperText={touched.country ? errors.country : null}
                                    className={classes.input}
                                />
                            </div>
                            <div className={classes.footer}>
                                <Typography />
                                <Switch
                                    className={classes.switch}
                                    checked={showPassword}
                                    onChange={() => {
                                        setShowPassword(!showPassword);
                                    }}
                                    color="primary"
                                />
                                {textShowPassword}
                                <Typography />
                                <Button
                                    type="submit"
                                    className={classes.button}
                                >
                                    Sign up
                            </Button>
                                <Typography className={classes.helperText}>
                                    Have you an account yet? Sign in <a className={classes.link} href="/login">here</a>
                                </Typography>
                            </div>
                        </form>
                    </Fragment>
                )
            }}
        </Formik>
    );
};
export default RegisterPage;