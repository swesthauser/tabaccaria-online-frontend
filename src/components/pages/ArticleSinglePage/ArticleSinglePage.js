import React, { useState, useEffect, Fragment, useContext } from 'react';
import { Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import ArticleService from '../../../service/ArticleService';
import NavbarHeader from '../../molecules/NavbarHeader/NavbarHeader';
import ArticleCard from '../../organisms/ArticleCard/ArticleCard';
import SessionHandlerContext from '../../other/Context/SessionHandlerContext';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "20px",
    },
}));

let exampleArticle = {
    id: "1",
    articleName: "Winston Beuteltabak",
    articleDescription: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
    price: "5.20",
    salePrice: "3.50",
    isFavorite: false,
}

const ArticleSinglePage = (props) => {

    // const { getSingleArticle, singleArticle } = useContext(SessionHandlerContext);

    // const articleId = props.match.params.id;

    const classes = useStyles();

    // useEffect(() => {
    //     getSingleArticle(articleId);
    //     // eslint-disable-next-line
    // }, [])

    return (
        <Fragment>
            <NavbarHeader />
            <Grid className={classes.root} container spacing={3}>
                <Grid item xs={3}></Grid>
                <Grid item xs={6}>
                    <ArticleCard article={exampleArticle} shoppingCartView={false} detailView />
                </Grid>
                <Grid item xs={3}></Grid>
            </Grid>
        </Fragment>

    )
};
export default ArticleSinglePage