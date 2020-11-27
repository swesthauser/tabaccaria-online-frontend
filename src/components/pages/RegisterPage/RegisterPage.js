import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core";
import NavbarHeader from "../../molecules/NavbarHeader/NavbarHeader";
import UserForm from "../../organisms/UserForm/UserForm";


const useStyles = makeStyles((theme) => ({

}));

const onSubmit = (object, values) => {
    const dto = { ...object, ...values };
    console.log('DTO: ', dto)
}

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

const RegisterPage = () => {

    return (
        <Fragment>
            <NavbarHeader/>
            <UserForm
                initialObject={object}
                modeRegister
            />
        </Fragment>
    )
}
export default RegisterPage;