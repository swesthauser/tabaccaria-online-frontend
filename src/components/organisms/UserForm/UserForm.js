import React, { useState, useEffect, useContext } from "react";
import { makeStyles, TextField, Typography, Button, Switch } from "@material-ui/core";
import { Formik } from "formik";
import {  UserValidationSchema } from "../../other/Validation/UserValidationSchema";
import OwnButton from "../../atoms/OwnButton/OwnButton";
import UserService from "../../../service/UserService";
import SessionHandlerContext from "../../other/Context/SessionHandlerContext";


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

const UserForm = ({ initialObject, modeRegister, goToLogin }) => {

    const { setActiveUser } = useContext(SessionHandlerContext);

    const [showPassword, setShowPassword] = useState(false);
    const [typePassword, setTypePassword] = useState("password");
    const [textShowPassword, setTextShowPassword] = useState("Show password")
    const classes = useStyles();

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
            initialValues={initialObject}
            enableReinitialize
            validationSchema={UserValidationSchema}
            onSubmit={(values) => {
                var dto = { ...initialObject, ...values};
                delete dto.emailRepeat;
                delete dto.passwordRepeat;
                console.log('DTO ', dto)
                if (modeRegister) {
                    dto = { ...dto, username: values.email }
                    console.log('ZEIG ', dto)
                    UserService.create(dto)
                        .then(() => {
                            goToLogin();
                        })
                        .catch(err => {
                            console.error('Error in UserForm: ', err);
                        })
                } else {
                    UserService.update(dto.id, dto)
                        .then((res) => {
                            setActiveUser(res.data);
                        })
                        .catch(err => {
                            console.error('Error in UserForm: ', err);
                        })

                }
            }}
        >
            {({ handleSubmit, errors, touched, handleChange, initialValues, dirty, values }) => {
                return (
                    <form method="post" onSubmit={handleSubmit} onChange={handleChange}>
                        <div className={classes.inputs}>
                            {console.log('ERRORS ', initialValues)}
                            <TextField
                                id="email"
                                name="email"
                                label="Email *"
                                variant="outlined"
                                type="text"
                                error={errors.email && touched.email}
                                helperText={touched.email ? errors.email : null}
                                className={classes.input}
                                defaultValue={initialValues.email}
                            />
                            {modeRegister || initialValues.email !== values.email ?
                                <TextField
                                    id="emailRepeat"
                                    name="emailRepeat"
                                    label="Confirm email *"
                                    variant="outlined"
                                    type="text"
                                    error={errors.emailRepeat && touched.emailRepeat}
                                    helperText={touched.emailRepeat ? errors.emailRepeat : null}
                                    className={classes.input}
                                    defaultValue={initialValues.emailRepeat}
                                />
                                : null}
                        </div>
                        <div className={classes.inputs}>
                            <TextField
                                id="password"
                                name="password"
                                label="Password *"
                                variant="outlined"
                                type={typePassword}
                                error={errors.password && touched.password}
                                helperText={touched.password ? errors.password : null}
                                className={classes.input}
                                defaultValue={initialValues.password}
                            />
                            {modeRegister || initialValues.password !== values.password ?
                                <TextField
                                    id="passwordRepeat"
                                    name="passwordRepeat"
                                    label="Confirm password *"
                                    variant="outlined"
                                    type={typePassword}
                                    error={errors.passwordRepeat && touched.passwordRepeat}
                                    helperText={touched.passwordRepeat ? errors.passwordRepeat : null}
                                    className={classes.input}
                                />
                                : null}
                        </div>
                        <div className={classes.inputs}>
                            <TextField
                                id="firstName"
                                name="firstName"
                                label="First name *"
                                variant="outlined"
                                type="text"
                                error={errors.firstName && touched.firstName}
                                helperText={touched.firstName ? errors.firstName : null}
                                className={classes.input}
                                defaultValue={initialValues.firstName != null ? initialValues.firstName : null}
                            />
                            <TextField
                                id="lastName"
                                name="lastName"
                                label="Last name *"
                                variant="outlined"
                                type="text"
                                error={errors.lastName && touched.lastName}
                                helperText={touched.lastName ? errors.lastName : null}
                                className={classes.input}
                                defaultValue={initialValues.lastName != null ? initialValues.lastName : null}
                            />
                        </div>
                        <div className={classes.inputs}>
                            <TextField
                                id="addressId"
                                name="addressId"
                                label="Street + house number *"
                                variant="outlined"
                                multiline
                                type="text"
                                error={errors.addressId && touched.addressId}
                                helperText={touched.addressId ? errors.addressId : null}
                                className={classes.input}
                                defaultValue={initialValues.addressId != null ? initialValues.addressId : null}
                            />
                            <TextField
                                id="zipPlace.zip"
                                name="zipPlace.zip"
                                label="Zip *"
                                variant="outlined"
                                multiline
                                type="text"
                                error={errors.zip && touched.zip}
                                helperText={touched.zip ? errors.zip : null}
                                className={classes.input}
                                defaultValue={initialValues.zipPlace.zip}
                            />
                        </div>
                        <div className={classes.inputs}>
                            <TextField
                                id="zipPlace.city"
                                name="zipPlace.city"
                                label="City *"
                                variant="outlined"
                                multiline
                                type="text"
                                error={errors.city && touched.city}
                                helperText={touched.city ? errors.city : null}
                                className={classes.input}
                                defaultValue={initialValues.zipPlace.city}
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
                            <OwnButton
                                typeOfButton={"formikSubmit"}
                                isNotChanged={!modeRegister ? !dirty : false}
                                text={modeRegister ?
                                    "Sign up"
                                    : "Update"}
                                onClickFunc={() => {console.log('VALUES ', values)}}
                            />
                            <Typography className={classes.helperText}>
                                {modeRegister &&
                                    <div>
                                        Have you an account yet? Sign in <a className={classes.link} href={"/login"}>here</a>
                                    </div>
                                }
                            </Typography>
                        </div>
                    </form>
                )
            }}
        </Formik>
    );
};
export default UserForm;