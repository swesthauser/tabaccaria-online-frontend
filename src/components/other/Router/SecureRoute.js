import React from 'react';
import { Route } from 'react-router-dom';
import NavbarHeader from '../../molecules/NavbarHeader/NavbarHeader';

const SecureRoute = (props) => {
    const { component: Component, ...rest } = props;
    
    return (
        <Route
            {...rest}
            render={props => (
                <div>
                    <NavbarHeader
                    />
                    <Component {...props} />
                </div>
            )}
        />
    )
}
export default SecureRoute;