import { Typography, Grid } from "@material-ui/core";
import React, { Fragment, useContext, useState, useEffect } from "react";
import NavbarHeader from "../../molecules/NavbarHeader/NavbarHeader";
import ArticleCard from "../../organisms/ArticleCard/ArticleCard";
import SessionHandlerContext from "../../other/Context/SessionHandlerContext";
import ArticleService from "../../../service/ArticleService";
// import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles((theme) => ({

// }));

const RootPage = (props) => {

    const [articles, setArticles] = useState([]);

    const { user } = useContext(SessionHandlerContext);

    // const classes = useStyles();

    const getArticles = () => {
        ArticleService.getAll()
            .then(res => {
                setArticles(res.data);
            })
            .catch(err => {
                console.error('Error in RootPage: ', err);
            });
    }

    const getRandomValue = () => {
        let number = Math.random()*100;
        if (number >= 50) {
            return true;
        } else {
            return false;
        }
    }

    // let exampleArticle = {
    //     id: "1",
    //     title: "Winston Beuteltabak 25g",
    //     price: "5.20",
    //     salePrice: "3.50",
    //     isFavorite: true
    // };

    useEffect(() => {
        getArticles();
        // eslint-disable-next-line
    }, [])

    return (
        <Fragment>
            <NavbarHeader isLoggedIn={user != null ? true : false} />
            <Typography />
            <Grid
                container
            >
                {articles.map((a) => (
                    <Grid item xs={4}>
                        <ArticleCard article={{ ...a, isFavorite: getRandomValue() }} pageMyFavorites />
                    </Grid>
                ))}
            </Grid>
        </Fragment>
    );
};
export default RootPage;