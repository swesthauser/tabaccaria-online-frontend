import React, { Fragment, useState, useEffect, useContext } from "react";
import { makeStyles, TextField, Typography, Button, Switch } from "@material-ui/core";
import { Formik } from "formik";
import { ValidationSchemaLight } from "../../other/Validation/ValidationSchemaLight";
import SessionHandlerContext from "../../other/Context/SessionHandlerContext";
import NavbarHeader from '../../molecules/NavbarHeader/NavbarHeader';
import OwnButton from "../../atoms/OwnButton/OwnButton";

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
    const classes = useStyles();

    const [showPassword, setShowPassword] = useState(false);
    const [typePassword, setTypePassword] = useState("password");
    const [textShowPassword, setTextShowPassword] = useState("Show password")

    const { login } = useContext(SessionHandlerContext);

    const loginObject = {
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
            initialValues={loginObject}
            enableReinitialize
            validationSchema={ValidationSchemaLight}
            onSubmit={(values) => {
                const dto = { ...loginObject, ...values };
                login(dto);
            }}
        >
            {({ handleSubmit, errors, touched, handleChange }) => {
                return (
                    <Fragment>
                        <NavbarHeader isLoggedIn={false}/>
                        <form method="post" onSubmit={handleSubmit} onChange={handleChange}>
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
                                <OwnButton
                                    typeOfButton={"formikSubmit"}
                                    text={"Sign in"}
                                />
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