import React, { Fragment, useEffect } from "react";
import { makeStyles, Grid, Paper, Card, CardContent, CardActions, Typography, Button } from '@material-ui/core/';
import Header from "../../atoms/Header/Header";
import Table from "../../organisms/Table/Table";
import ArticleCard from "../../organisms/ArticleCard/ArticleCard";

const useStyles = makeStyles((theme) => ({
    header: {
        color: "#87C4F4",
        margin: "10px"
    },
    root: {
        flexGrow: 1,
        padding: "5px"
    },
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
    },
    card: {
        minWidth: 275,
        padding: "5px",
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
}));



let exampleArticle = {
    id: "1",
    title: "Winston Beuteltabak 25g",
    description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
    price: "5.20",
    salePrice: "3.50",
    isFavorite: true
};

const MyShoppingCartPage = () => {
    const classes = useStyles();
    // const [articles, setArticles] = useState([]);

    // const getArticles = () => {
    //     axios.get('http://localhost:8080/cart/' + user.id)
    //         .then(res => {
    //             let data = res.data;
    //             console.log(res)
    //             setArticles(data);
    //         })
    //         .catch(err => {
    //             console.error('ERROR: ', err);
    //         })
    // }

    useEffect(() => {
        // getArticles();
        // getUser();
        // eslint-disable-next-line
    }, [])

    return (
        <Fragment>
            <Header
                text={"My shopping cart - overview"}
                style={classes.header}
                size={"h2"}
            />
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={8}>
                        <Paper className={classes.paper}>
                            <i>My articles</i>
                            <Grid container spacing={3}>
                                <Grid item xs={9}>
                                    {/* <Card className={classes.card} variant="outlined">
                                        <CardContent>
                                            <p>{exampleArticle.title}</p>
                                        </CardContent>
                                        <CardActions>
                                            
                                        </CardActions>
                                    </Card> */}
                                    {/* Using ArticleCard --> edit it */}
                                    <ArticleCard article={exampleArticle}/>
                                </Grid>
                                <Grid item xs={3}>Da</Grid>
                            </Grid>

                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper className={classes.paper}>
                            <i>Total:</i>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </Fragment>
    )
}
export default MyShoppingCartPage;