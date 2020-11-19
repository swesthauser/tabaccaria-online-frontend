import React, { useContext } from 'react';
import { Route } from 'react-router-dom';
import NavbarHeader from '../../molecules/NavbarHeader/NavbarHeader';
import SessionHandlerContext from '../Context/SessionHandlerContext';

const SecureRoute = (props) => {
    const { component: Component, ...rest } = props;
    const {user} = useContext(SessionHandlerContext);
    
    return (
        <Route
            {...rest}
            render={props => (
                <div>
                    <NavbarHeader
                        isLoggedIn={user != null ? true : false}
                    />
                    <Component {...props} />
                </div>
            )}
        />
    )
}
export default SecureRoute;