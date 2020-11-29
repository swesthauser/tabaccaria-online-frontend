import React from "react";
import { Route, Switch } from "react-router-dom";
import RootPage from "../../pages/RootPage/RootPage";
import LoginPage from "../../pages/LoginPage/LoginPage";
import RegisterPage from "../../pages/RegisterPage/RegisterPage";
import MyAccountPage from "../../pages/MyAccountPage/MyAccountPage";
import MyFavoritesPage from "../../pages/MyFavoritesPage/MyFavoritesPage";
import MyShoppingCartPage from "../../pages/MyShoppingCartPage/MyShoppingCartPage";
import SecureRoute from "../Router/SecureRoute";
import ArticleSinglePage from "../../pages/ArticleSinglePage/ArticleSinglePage";

const Router = () => {

    return (
        <Switch>
            <Route exact path={"/"} component={RootPage} />
            <Route exact path={"/login"} component={LoginPage} />
            <Route exact path={"/signup"} component={RegisterPage} />
            <Route exact path={"/articles/:id"} component={ArticleSinglePage} />
            <SecureRoute exact path={"/myaccount"} component={MyAccountPage} />
            <SecureRoute exact path={"/myfavorites"} component={MyFavoritesPage} />
            <SecureRoute exact path={"/myshoppingcart"} component={MyShoppingCartPage} />
        </Switch>
    );
};
export default Router;