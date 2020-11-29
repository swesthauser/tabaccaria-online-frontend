import React, { useContext, useState, useEffect, useCallback } from "react";
import { makeStyles, Badge } from '@material-ui/core/';
import { Avatar, AppBar } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import BrandTitle from "../../atoms/BrandTitle/BrandTitle";
import SessionHandlerContext from "../../other/Context/SessionHandlerContext";
import LockIcon from '@material-ui/icons/Lock';
import ArticleService from "../../../service/ArticleService";
import UserService from "../../../service/UserService";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: "#2A95ED",
        color: "#ffffff"
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        color: "#ffffff",
        marginTop: "20px",
    },
    avatar: {
        backgroundColor: "red",
    }
}));

const NavbarHeader = () => {

    const classes = useStyles();
    const { user, logout } = useContext(SessionHandlerContext);

    // const [countFavorites, setCountFavorites] = useState([]);
    // const [countShoppingCart, setCountShoppingCart] = useState([]);

    // const getFavorites = () => {
    //     UserService.getFavoritesByUser(JSON.parse(localStorage.getItem('user')).id)
    //     .then(res => {
    //         setCountFavorites(res.data.length);
    //     })
    //     .catch(err => {
    //         console.error('Error in NavbarHeader: ', err);
    //         return null;
    //     })
    // }
    
    // const getShoppingCart = () => {
    //     ArticleService.getShoppingCart()
    //     .then(res => {
    //         setCountShoppingCart(res.data.length);
    //     })
    //     .catch(err => {
    //         console.error('Error in NavbarHeader ', err);
    //         return null;
    //     })
    // };

    // useEffect(() => {
    //    getShoppingCart();
    //    getFavorites();
    // }, [logout])

    return (
        <div className={classes.root}>
            <AppBar position="static" color="transparent">
                <Toolbar>
                    <BrandTitle
                        size={"h3"}
                        styleText={classes.title}
                    />
                    {user != null ?
                        <Button
                            color="inherit"
                            title="Get logged out"
                            onClick={() => {
                                logout();
                            }}
                        >
                            <ExitToAppIcon />
                        </Button>
                        : null}
                    {user == null ?
                        <Button
                            color="inherit"
                            title="Get signed in"
                            href="/login"
                        >
                            <LockIcon />
                        </Button>
                        : null}

                    <Button
                        color="inherit"
                        title="My account"
                        href={user != null ? "/myaccount" : "/login"}
                    >
                        {user != null ?
                            <Avatar className={classes.avatar}>{user.firstName.substring(0, 1).toUpperCase()+user.lastName.substring(0, 1).toUpperCase()}</Avatar>
                        :
                            <PersonIcon />
                        }
                    </Button>
                    <Button
                        color="inherit"
                        title="My favorites"
                        href={user != null ? "/myfavorites" : "/login"}
                    >
                        <Badge
                            badgeContent={user != null ? 1 : null}
                            color="secondary"
                        >
                            <FavoriteIcon />
                        </Badge>
                    </Button>
                    <Button
                        color="inherit"
                        title="My shopping cart"
                        href={user != null ? "/myshoppingcart" : "/login"}
                    >
                        <Badge
                            badgeContent={user != null ? 1 : null}
                            color="secondary"
                        >
                            <ShoppingCartIcon />
                        </Badge>
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
};
export default NavbarHeader;