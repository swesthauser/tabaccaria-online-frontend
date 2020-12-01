import React, { Fragment, useEffect, useState, useCallback, useContext } from "react";
import { makeStyles, Grid, Paper, Card, CardContent, CardActions, Typography, Button } from '@material-ui/core/';
import Header from "../../atoms/Header/Header";
import ArticleCard from "../../organisms/ArticleCard/ArticleCard";
import InputNumber from "../../atoms/InputNumber/InputNumber";
import ArticleService from "../../../service/ArticleService";
import OwnButton from "../../atoms/OwnButton/OwnButton";
import OrderService from "../../../service/OrderService";
import SessionHandlerContext from "../../other/Context/SessionHandlerContext";


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
    const { user, getShoppingCart, personalShoppingCart, personalArticleInfo, personalArticles } = useContext(SessionHandlerContext);
    // const [articles, setArticles] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [total, setTotal] = useState(0);
    const [freight, setFreight] = useState(5);

    const calculateSubtotal = () => {
        var num = 0;
        for (let i = 0; i < personalArticleInfo.length; i++) {
            if (personalArticleInfo[i].article.salePrice !== null) {
                num += parseFloat(personalArticleInfo[i].article.salePrice) * parseFloat(personalArticleInfo[i].quantity);
            } else {
                num += parseFloat(personalArticleInfo[i].article.price) * parseFloat(personalArticleInfo[i].quantity);
            }
        }
        setSubtotal(num);
        let freightCharges = getFreightCharges(num);
        console.log('LIEFERKOSTEN ', freightCharges);
        let total = num + freightCharges;
        console.log('Total ', total)
        setFreight(freightCharges);
        setTotal(total);
    }

    const checkFormat = (n) => {
        var numberInString;
        if (n % 1 === 0) {
            numberInString = n.toString();
            return numberInString + ".-"
        }
        else if (n * 10 % 1 === 0) {
            numberInString = n.toString();
            return numberInString + "0";
        } else {
            return n;
        }
    }

    const getFreightCharges = (num) => {
        if (num >= 70) {
            return 0;
        } else {
            return 5;
        }
    }

    // const calculateTotal = () => {
    //     setTotal(subtotal + getFreightCharges());
    // };

    // const getElements = () => {
    //     console.log('ZEIG ', ownShoppingCart.orderDetailsList)
    //    setElements(ownShoppingCart.orderDetailsList);
    // }

    const handleQuantity = (e, i) => {
        const dto = {...i, quantity: e.target.value};
        OrderService.updateOrderDetails(dto.id, dto)
            .then(() => {
            })
            .catch(err => {
                console.error('Error in MyShoppingCartPage: ', err);
            })
            .finally(() => {
                getShoppingCart(user.id);
            });
    }

    const removeArticleFromShoppingCart = (id) => {
        console.log('Delete orderDetail with id: ', id)
        // TO DO
        // OrderService.deleteOrderDetails(id)
        //     .then(() => {
        //     })
        //     .catch(err => {
        //         console.error('Error in MyShoppingCartPage: ', err);
        //     })
        //     .finally(() => {
        //         getShoppingCart(user.id);
        //     });
    }

    // const updateArticleInfo = (orderDetailId, dto) => {
    //     OrderService.updateOrderDetails(orderDetailId, dto)
    //         .then(() => {
    //             getShoppingCart(user.id);

    //         })
    //         .catch(err => {
    //             console.error('Error in MyShoppingCartPage: ', err);
    //         });
    // }

    useEffect(() => {
        getShoppingCart(user.id);
        // console.log('ZEIG 1', personalShoppingCart)
        // console.log('ZEIG 2', personalArticleInfo)
        // console.log('ZEIG 3', personalArticles)
        // eslint-disable-next-line
    }, [user])

    // useEffect(() => {
    //     getElements();
    //     // eslint-disable-next-line
    // }, [user])

    useEffect(() => {
        calculateSubtotal();
        // eslint-disable-next-line
    }, [personalArticleInfo])

    // useEffect(() => {
    //     calculateTotal();
    //     // eslint-disable-next-line
    // }, [subtotal, setSubtotal])


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
                            {personalArticleInfo.map(i => (
                                <Grid container spacing={3}>
                                    <Grid item xs={9}>
                                        <ArticleCard
                                            article={i.article}
                                            articleInfo={i}
                                            shoppingCartView
                                            removeFunc={removeArticleFromShoppingCart}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <div className={classes.inputNumber}>
                                            <InputNumber
                                                quantity={parseInt(i.quantity)}
                                                handleQuantity={handleQuantity}
                                                articleInfo={i}
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
                                    {subtotal !== 0 ?
                                        <table>
                                            <tr>
                                                <th>
                                                    Subtotal
                                            </th>
                                                <td>
                                                    Fr. {checkFormat(subtotal)}
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>
                                                    Freight charges
                                            </th>
                                                <td>
                                                    Fr. {checkFormat(freight)}
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>
                                                    Total
                                            </th>
                                                <tr>
                                                    Fr. {checkFormat(total)}
                                                </tr>
                                            </tr>
                                        </table>
                                        : null}
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