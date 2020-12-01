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

    const { user, addFavorite, removeFavorite } = useContext(SessionHandlerContext);

    const [favorites, setFavorites] = useState([]);

    const [articles, setArticles] = useState([]);



    // const [favorites, setFavorites] = useState([]);


    // const classes = useStyles();

    const getFavorites = (userId) => {
        ArticleService.getFavorites(userId)
            .then(res => {
                setFavorites(res.data);
            })
            .catch(err => {
                console.error('Error in RootPage: ', err);
            })
    }


    const getArticles = () => {
        ArticleService.getAll()
            .then(res => {
                setArticles(res.data);
            })
            .catch(err => {
                console.error('Error in RootPage: ', err);
            });
    }

  


    // useEffect(() => {
    //     getFavorites(user.id);
    //     // eslint-disable-next-line
    // }, [user])

    // useEffect(() => {
    //     getFavorites(user.id);
    //     // eslint-disable-next-line
    // }, [])

    useEffect(() => {
        getArticles();
        // eslint-disable-next-line
    }, [favorites, setFavorites])

    const checkPartOfFavorites = (article) => {
        // console.log('Favorites', ownFavorites)
        // console.log('ARticle ', article)
        // return favorites != null || favorites != undefined ? favorites.includes(article) : false;
            let hasFound = (favorites !== undefined ? favorites.find(f => f.id === article.id) : false)
            return hasFound;
        // favorites.map((f) => {
        //     if(f.id === article.id) {
        //         return true;
        //     };
        // });
        // ArticleService.getFavorites(user.id)
        //     .then(res => {
        //         return res.data.some(f => f.id === article.id);
        //     })
    }

    const handleFavorite = (isFavorite, item) => {
        if (!isFavorite) {
            setFavorites(favorites.push(item));
            addFavorite(user, user.id, item.id);
        } else {
            let newArray = favorites.filter(a => a.id !== item.id)
            setFavorites(newArray);
            removeFavorite(user, user.id, item.id);
        }
    }

    return (
        <Fragment>
            <NavbarHeader />
            <Typography />
            <Grid container>
                {articles.map((a, i = 1) => (
                    <Grid item xs={4}>
                        <ArticleCard index={i }article={a} shoppingCartView={false} handleFavorite={handleFavorite} getFavorite={checkPartOfFavorites(a)} />
                    </Grid>
                ))}
            </Grid>
        </Fragment>
    );
};
export default RootPage;