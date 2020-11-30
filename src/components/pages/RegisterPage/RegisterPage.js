import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core";
import NavbarHeader from "../../molecules/NavbarHeader/NavbarHeader";
import UserForm from "../../organisms/UserForm/UserForm";
import { useHistory } from "react-router-dom";


const useStyles = makeStyles((theme) => ({

}));

const object = {
    email: '',
    emailRepeat: '',
    password: '',
    passwordRepeat: '',
    firstName: '',
    lastName: '',
    streetNumber: '',
    zipPlace: ''
}

const RegisterPage = () => {

    const history = useHistory();

    return (
        <Fragment>
            <NavbarHeader/>
            <UserForm
                initialObject={object}
                modeRegister
                goToLogin={() => {
                    history.push('/login');
                }}
            />
        </Fragment>
    )
}
export default RegisterPage;