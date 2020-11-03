import React, { Fragment, useState, useEffect } from "react";
import NavbarHeader from "../../molecules/NavbarHeader/NavbarHeader";
import ArticleCard from "../../organisms/ArticleCard/ArticleCard";
import { makeStyles, Grid } from '@material-ui/core/';
import Header from "../../atoms/Header/Header";
import axios from "axios";

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
    const [articles, setArticles] = useState([]);
    const classes = useStyles();
    const getOrders = () => {
        axios.get('http://localhost:2020/users/favorites')
            .then(res => {
                let data = res.data;
                console.log(res)
                setArticles(data);
            })
            .catch(err => {
                console.error('ERROR: ', err);
            })
    } 

    useEffect(() => {
        getOrders();
        // eslint-disable-next-line
      }, []);

    return (
        <Fragment>
            <NavbarHeader />
            <Header
                text={"My favorites - overview"}
                style={classes.header}
                size={"h2"}
            />
            <Grid
                container
            >
                {articles.map((a) => (
                    <Grid item xs={4}>
                        <ArticleCard article={a} />
                    </Grid>
                    ))}
            </Grid>

        </Fragment>
    );
};
export default MyFavoritesPage;