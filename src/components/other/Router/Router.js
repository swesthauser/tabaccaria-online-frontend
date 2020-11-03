import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import RootPage from "../../pages/RootPage/RootPage";
import LoginPage from "../../pages/LoginPage/LoginPage";
import RegisterPage from "../../pages/RegisterPage/RegisterPage";
import MyOrdersPage from "../../pages/MyOrdersPage/MyOrdersPage";
import MyFavoritesPage from "../../pages/MyFavoritesPage/MyFavoritesPage";
import SecureRoute from "../Router/SecureRoute";

const Router = () => {
    return (
        <Switch>
            <Route exact path={"/"} component={RootPage}/>
            <Route exact path={"/login"} component={LoginPage}/>
            <Route exact path={"/signup"} component={RegisterPage}/>
            <SecureRoute exact path={"/myorders"} component={MyOrdersPage}/>
            <SecureRoute exact path={"/myfavorites"} component={MyFavoritesPage}/>
        </Switch>
    );
};
export default Router;