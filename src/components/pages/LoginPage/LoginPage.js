import React, { Fragment, useState, useEffect } from "react";
import { makeStyles, TextField, Typography, Button, Switch } from "@material-ui/core";
import { Formik } from "formik";
import { ValidationSchemaLight } from "../../other/ValidationSchemaLight";
import BrandTitle from "../../atoms/BrandTitle/BrandTitle";
import SessionHandler from "../../other/SessionHandler";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    title: {
        marginTop: "20px",
        textAlign: "center",
        color: "#87C4F4",

    },
    inputs: {
        textAlign: "center",
        margin: "20px"
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
    }
}));

const LoginPage = () => {
    const history = useHistory();

    const [showPassword, setShowPassword] = useState(false);
    const [typePassword, setTypePassword] = useState("password");
    const [textShowPassword, setTextShowPassword] = useState("Show password")
    const classes = useStyles();

    const object = {
        email: '',
        password: ''
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
            validationSchema={ValidationSchemaLight}
            onSubmit={(values) => {
                const dto = { ...object, ...values };
                console.log('DTO: ', dto)
                SessionHandler.getSignedIn(dto);
                history.push('/');
            }}
        >
            {({ handleSubmit, errors, touched, handleChange }) => {
                return (
                    <Fragment>
                        <form method="post" onSubmit={handleSubmit} onChange={handleChange}>
                            <BrandTitle
                                size={"h2"}
                                styleText={classes.title}
                                text={"Sign in"}
                            />
                            <div className={classes.inputs}>
                                <TextField
                                    id="email"
                                    name="email"
                                    label="Email"
                                    variant="outlined"
                                    required
                                    type="text"
                                    error={errors.email && touched.email}
                                    helperText={touched.email ? errors.email : null}
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
                                />
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
                                    Sign in
                                </Button>
                                <Typography className={classes.helperText}>
                                    Have you no account yet? Sign up <a className={classes.link} href="/signup">here</a>
                                </Typography>
                            </div>
                        </form>
                    </Fragment>
                )
            }}
        </Formik>
    );
};
export default LoginPage;