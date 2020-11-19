import { Typography } from "@material-ui/core";
import React, { Fragment, useContext } from "react";
import NavbarHeader from "../../molecules/NavbarHeader/NavbarHeader";
import ArticleCard from "../../organisms/ArticleCard/ArticleCard";
import SessionHandlerContext from "../../other/Context/SessionHandlerContext";
// import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles((theme) => ({
    
// }));

const RootPage = (props) => {

    const { user } = useContext(SessionHandlerContext);

    console.log('USER ', user)
    // const classes = useStyles();

    let exampleArticle = {
        id: "1",
        title: "Winston Beuteltabak 25g",
        price: "5.20",
        salePrice: "3.50",
        isFavorite: true
    };

    return (
        <Fragment>
            <NavbarHeader isLoggedIn={user != null ? true : false}/>
            <Typography />
            <ArticleCard article={exampleArticle} />            
        </Fragment>
    );
};
export default RootPage;