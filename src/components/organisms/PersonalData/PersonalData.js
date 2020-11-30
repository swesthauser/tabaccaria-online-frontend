import React from 'react';
import UserForm from '../../organisms/UserForm/UserForm';

const exampleUser = {
    email: 'admin@tbz.ch',
    firstname: 'Admin',
    lastname: 'Boss',
    streetAndNumber: 'Ausstellungsstrasse 70',
    zipAndPlace: '8308 Illnau',
    country: 'Switzerland'
}

const PersonalData = ({ data }) => {
    return (
        <UserForm initialObject={data} modeRegister={false}/>
       )
}
export default PersonalData;