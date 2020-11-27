import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
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

const useStyles = makeStyles((theme) => ({
    card: {
        maxWidth: 345,
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
    favoriteIcon: {
        color: 'red'
    }
}));


// TO DO: GRID
export default function ArticleCard({ article, shoppingCart }) {
    
    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [isFavorite, setIsFavorite] = useState(article.isFavorite);
    
    const handlerOpen = () => {
        setOpen(!open);
    }

    const handleFavorite = () => {
        setIsFavorite(!isFavorite);
        console.log('Change isFavorite-State');
        // TO DO
        // API REQUEST 
    }

    const getRandomImage = (w, h, key) => {
        var source = 'https://source.unsplash.com/random/' + w + 'x' + h + '/?smoke,tobacco' + key
        return source;
    }

    const getSaleInProcent = () => {
        return Math.round((article.price - article.salePrice) / article.price * 100);
    }

    const isInt = (n) => {
        return n % 1 === 0;
     }

    return (
        <Card className={classes.card}>
            <CardMedia
                className={classes.media}
                image={getRandomImage(500, 500, article.id)}
                onClick={() => console.log('Click on the card')}
            />
            <CardContent
                className={classes.content}
                onClick={() => console.log('Click on the card')}
            >
                <Typography
                    variant={"h6"}
                >
                    {article.title.length <= 33 ? article.title : article.title.substring(0, 29) + "..."}
                </Typography>
                <Typography
                    variant={"subtitle1"}
                    align={"right"}
                    className={article.salePrice ? classes.price : classes.priceExtraMargin}
                >
                    Fr. {isInt(article.price) ?
                    article.price + ".-"
                    :
                    article.price}
                </Typography>
                {article.salePrice ?
                    <Typography
                        variant={"subtitle1"}
                        align={"right"}
                        className={classes.salePrice}
                    >
                        <Avatar className={classes.avatar}>-{getSaleInProcent()}%</Avatar> <b>Fr. {article.salePrice}</b>
                    </Typography>
                    : null}

            </CardContent>
            {!shoppingCart ?
            <CardActions disableSpacing>
                <IconButton
                    title={isFavorite ? "Remove from my favorites" : "Add to my favorites"}
                    onClick={() => handleFavorite()}
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
                    onClick={() => console.log('Remove article with id ' + article.id)}
                    className={clsx(classes.expand)}
                >
                    <RemoveShoppingCartIcon/>
                </IconButton>
            </CardActions>
            }
            <DialogComp
                isOpen={open}
                handler={handlerOpen}
                article={article}
            />
        </Card>
    );
}