import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Collapse } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import clsx from 'clsx';
import { Avatar, CardContent } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import DialogComp from "../../molecules/DialogComp/DialogComp";
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import { useHistory } from 'react-router-dom';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ArticleService from '../../../service/ArticleService';
import UserService from '../../../service/UserService';
import SessionHandlerContext from '../../other/Context/SessionHandlerContext';


const useStyles = makeStyles((theme) => ({
    card: {
        maxWidth: 345,
        margin: "20px",
    },
    cardDetail: {
        maxWidth: "100%",
        margin: "20px",
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
        cursor: "pointer"
    },
    content: {
        cursor: "pointer"
    },
    price: {
        color: "#737373",
        textDecoration: 'line-through',
    },
    priceExtraMargin: {
        paddingBottom: "45px",
        fontWeight: "bold"
    },
    salePrice: {
        color: 'red',
    },
    avatar: {
        backgroundColor: "red",
        width: theme.spacing(7),
        height: theme.spacing(7),
        marginBottom: "-40px",
        marginLeft: "-10px",
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    favoriteIcon: {
        color: 'red'
    }
}));


export default function ArticleCard({ article, articleInfo, removeFunc, shoppingCartView, detailView, handleFavorite, getFavorite }) {

    const { user } = useContext(SessionHandlerContext);

    /* Try getArticle over ArticleSinglePage */
    const classes = useStyles();

    const history = useHistory();
    const [isFavorite, setIsFavorite] = useState(getFavorite);
    const [open, setOpen] = useState(false);
    const [expanded, setExpaned] = useState(false);

    const handlerOpen = () => {
        setOpen(!open);
    }

    const checkFormat = (nAsString) => {
        var n = parseFloat(nAsString);
        if (n % 1 === 0) {
            return n + ".-"
        } else if (n * 10 % 1 === 0) {
            return n + "0";
        } else {
            return nAsString;
        }
    }

    const handleExpanded = () => {
        setExpaned(!expanded);
    }

    const getRandomImage = (w, h, key) => {
        var source = 'https://source.unsplash.com/random/' + w + 'x' + h + '/?smoke,tobacco' + key
        return source;
    }

    const getSaleInProcent = () => {
        return Math.round((article.price - article.salePrice) / article.price * 100);
    }

    const getDetailView = () => {
        if (!detailView) {
            history.push('/articles/' + article.id);
        }
    }

    return (
        <Card key={article.id} className={detailView ? classes.cardDetail : classes.card}>
            <CardMedia
                className={classes.media}
                image={getRandomImage(500, 500, article.id)}
                onClick={getDetailView}
            />
            <CardContent
                className={classes.content}
                onClick={getDetailView}
            >
                <Typography
                    variant={"h6"}
                >
                    {article.articleName.length <= 33 ? article.articleName : article.articleName.substring(0, 29) + "..."}

                </Typography>
                {detailView && (
                    <div>
                        <Typography
                            variant={"body1"}
                        >
                            {article.articleDescription.length > 250 && !expanded ? article.articleDescription.substring(0, 246) + "..." : article.articleDescription}
                        </Typography>
                        {article.articleDescription.length > 250 &&
                            <div>
                                <Collapse in={expanded} timeout="auto" unmountOnExit />
                                <CardActions>
                                    <IconButton
                                        className={clsx(classes.expand, {
                                            [classes.expandOpen]: expanded,
                                        })}
                                        onClick={handleExpanded}
                                        aria-expanded={expanded}
                                        aria-label={!expanded ? "Show more" : "Show less"}
                                        title={!expanded ? "Show more" : "Show less"}
                                    >
                                        <ExpandMoreIcon />
                                    </IconButton>
                                </CardActions>
                            </div>
                        }
                    </div>
                )}
                <Typography
                    variant={"subtitle1"}
                    align={"right"}
                    className={article.salePrice ? classes.price : classes.priceExtraMargin}
                >
                    Fr. {checkFormat(article.price)}
                </Typography>
                {article.salePrice ?
                    <Typography
                        variant={"subtitle1"}
                        align={"right"}
                        className={classes.salePrice}
                    >
                        <Avatar className={classes.avatar}>-{getSaleInProcent()}%</Avatar> <b>Fr. {checkFormat(article.salePrice)}</b>
                    </Typography>
                    : null}

            </CardContent>
            {!shoppingCartView ?
                <CardActions disableSpacing>
                    <IconButton
                        title={isFavorite ? "Remove from my favorites" : "Add to my favorites"}
                        onClick={() => {
                            setIsFavorite(!isFavorite);
                            handleFavorite(isFavorite, article)}
                            }
                        className={isFavorite ? classes.favoriteIcon : null}
                    >
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton
                        title={"Add to my shopping cart"}
                        className={clsx(classes.expand)}
                        onClick={() => handlerOpen()}
                    >
                        <ShoppingCartIcon />
                    </IconButton>
                </CardActions>
                :
                <CardActions disableSpacing>
                    <IconButton
                        title={"Remove from my shopping cart"}
                        onClick={() => {
                            console.log('ZEIG MIR BITTE ', articleInfo.id)
                            {/* removeFunc(articleInfo.id) */}
                        }}
                        className={clsx(classes.expand)}
                    >
                        <RemoveShoppingCartIcon />
                    </IconButton>
                </CardActions>
            }
            <DialogComp
                isOpen={open}
                handler={handlerOpen}
                article={article}
                mode={'inputNumber'}
            />
        </Card>
    );
}