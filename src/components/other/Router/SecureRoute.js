import React from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import SessionHandler from '../../other/SessionHandler';

const SecureRoute = (props) => {
    const {component: Component, ...rest} = props;
    let history = useHistory();

    if (SessionHandler.isLoggedIn(history)) {
        return (
            <Route
               {...rest}
               render={props => (
                   <Component {...props}/>
               )}
            />
        )
    } else {
        console.error('Authorization failed');
        // return (
        //     <Redirect to="/"/>
        // )
    }
}
export default SecureRoute;