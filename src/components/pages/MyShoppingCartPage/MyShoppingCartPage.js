import React, { Fragment, useEffect, useState, useCallback } from "react";
import { makeStyles, Grid, Paper, Card, CardContent, CardActions, Typography, Button } from '@material-ui/core/';
import Header from "../../atoms/Header/Header";
import ArticleCard from "../../organisms/ArticleCard/ArticleCard";
import InputNumber from "../../atoms/InputNumber/InputNumber";
import ArticleService from "../../../service/ArticleService";
import OwnButton from "../../atoms/OwnButton/OwnButton";

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
        textAlign: "left",
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
    inputNumber: {
        marginLeft: "-80px",
        marginTop: "150px"
    }
}));

const MyShoppingCartPage = () => {
    const classes = useStyles();
    const [articles, setArticles] = useState([]);
    const [amount, setAmount] = useState();
    const [subtotal, setSubtotal] = useState(0);
    const [total, setTotal] = useState(0);
    // const [articles, setArticles] = useState([]);

    const getArticles = () => {
        ArticleService.getShoppingCart()
            .then(res => {
                console.log('RES: ', res.data)
                setArticles(res.data);
            })
            .catch(err => {
                console.error('Error in MyShoppingCartPage: ', err);
            })
    }

    const calculateSubtotal = () => {
        for (let i = 0; i < articles.length; i++) {
            let num;
            if (articles[i].salePrice == null) {
                num = (parseFloat(articles[i].price) * parseFloat(articles[i].amount));
            } else {
                num = (parseFloat(articles[i].salePrice) * parseFloat(articles[i].amount));
            }
            setSubtotal(s => s + num)
        }
    }

    const isInt = (n) => {
        return n % 1 === 0;
    }

    const checkFormat = () => {
        var numberInString;
        if (subtotal * 10 % 1 === 0) {
            numberInString = subtotal.toString();
            numberInString += "0";
            return numberInString;
        } else {
            return subtotal;
        }
    }

    const getFreightCharges = () => {
        if (subtotal >= 70) {
            return 0;
        } else {
            return 5;
        }
    }

    const calculateTotal = () => {
        setTotal(subtotal + getFreightCharges());
    }

    useEffect(() => {
        getArticles();
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        calculateSubtotal();
        // eslint-disable-next-line
    }, [articles, setArticles])

    useEffect(() => {
        calculateTotal();
        // eslint-disable-next-line
    }, [subtotal, setSubtotal])

    return (
        <Fragment>
            <Header
                text={"My shopping cart - overview"}
                style={classes.header}
                size={"h2"}
            />
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>
                            <i>My articles:</i>
                            {articles.map(a => (
                                <Grid container spacing={3}>
                                    <Grid item xs={9}>
                                        <ArticleCard article={a} shoppingCartView />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <div className={classes.inputNumber}>
                                            <InputNumber
                                                amount={parseInt(a.amount)}
                                                setAmount={setAmount}
                                            />
                                        </div>
                                    </Grid>
                                </Grid>

                            ))}
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>
                        <p><i>Total:</i></p>
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <table>
                                        <tr>
                                            <th>
                                                Subtotal
                                            </th>
                                            <td>
                                                Fr. {isInt(subtotal) ? subtotal + ".-" : checkFormat()}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                Freight charges
                                            </th>
                                            <td>
                                                Fr. {getFreightCharges() + ".-"}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                Total
                                            </th>
                                            <tr>
                                                Fr. {isInt(total) ? subtotal + ".-" : checkFormat()}
                                            </tr>
                                        </tr>
                                    </table>
                                </Grid>
                                <Grid item xs={6}>
                                    <OwnButton
                                        typeOfButton={"buy"}
                                    />
                                </Grid>

                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </Fragment>
    )
}
export default MyShoppingCartPage;