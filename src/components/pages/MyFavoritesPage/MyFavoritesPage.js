import React, { Fragment, useState, useEffect, useContext } from "react";
import ArticleCard from "../../organisms/ArticleCard/ArticleCard";
import { makeStyles, Grid } from '@material-ui/core/';
import Header from "../../atoms/Header/Header";
import ArticleService from '../../../service/ArticleService';
import SessionHandlerContext from '../../other/Context/SessionHandlerContext';
import UserService from '../../../service/UserService';

const useStyles = makeStyles((theme) => ({
    header: {
        color: "#87C4F4",
        margin: "10px"
    }
}));

/*
    Data
*/
// function createData(id, title, price, salePrice) {
//     return { id, title, price, salePrice };
// }

// const articles = [
//     createData('1', 'Winston Beuteltabak', '5.20', '3.50'),
//     createData('2', 'Pipe Hippie-Style', '79', null),
//     createData('3', 'BIC Feuerzeug XXL', '9.95', '7.95'),
//     createData('4', 'We Love Weed - T-Shrit OneSize', '19', null),
//     createData('5', 'Ritch for Rich Ones - Special Editon', '299', '149.95'),

// ];

const MyFavoritesPage = (props) => {
    const classes = useStyles();

    const { user, addFavorite, removeFavorite } = useContext(SessionHandlerContext);

    const [favorites, setFavorites] = useState([]);


    const handleFavorite = (isFavorite, item) => {
        if (!isFavorite) {
            setFavorites(favorites.push(item));
            addFavorite(user, user.id, item.id);
        } else {
            setFavorites(favorites.filter(a => a.id !== item.id));
            removeFavorite(user, user.id, item.id);
        }
    }

    const getFavorites = () => {
        ArticleService.getFavorites(user.id)
            .then(res => {
                setFavorites(res.data);
            })
            .catch(err => {
                console.error('Error in SessionHandlerContext: ', err);
            });
    }

    useEffect(() => {
        getFavorites(user.id);
        // setFavorites(getFavorites);
        // eslint-disable-next-line
    }, [])

    return (
        <Fragment>
            <Header
                text={"My favorites - overview"}
                style={classes.header}
                size={"h2"}
            />
            <Grid
                container
            >
                {favorites.map((a) => (
                    <Grid item xs={4}>
                        <ArticleCard article={a} handleFavorite={handleFavorite} pageMyFavorites getFavorite/>
                    </Grid>
                    ))}
            </Grid>

        </Fragment>
    );
};
export default MyFavoritesPage;