import React, { useState, useEffect, useContext } from "react";
import { useHistory, withRouter, Redirect } from "react-router-dom";
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
        backgroundColor: "#C6E2FA"
    }
}));

const NavbarHeader = ({ isLoggedIn }) => {
    const classes = useStyles();
    // const {logout} = useContext(SessionHandler);
    const history = useHistory();
    // const [user, setUser] = useState(isLoggedIn ? SessionHandler.getLoggedUser(history) : {});



    // useEffect(() => {
    //     if (isLoggedIn) {
    //         setUser(SessionHandler.getLoggedUser(history));
    //     } else {
    //         setUser({});
    //     }
    // }, [isLoggedIn, history])

    return (
        <div className={classes.root}>
            <AppBar position="static" color="transparent">
                <Toolbar>
                    <BrandTitle
                        size={"h3"}
                        styleText={classes.title}
                    />
                    {isLoggedIn ?
                        <Button
                            color="inherit"
                            title="Get logged out"
                            onClick={() => {
                                console.log('Logout')
                                }}
                        >
                            <ExitToAppIcon />
                        </Button>
                        : null}
                    {!isLoggedIn ?
                        <Button
                            color="inherit"
                            title="Get signed in"
                            href="/login"
                        >
                            <LockIcon/>
                        </Button>
                    : null}

                    <Button
                        color="inherit"
                        title="My account"
                        href={isLoggedIn ? "/myorders" : "/login"}
                    >
                        <PersonIcon />
                    </Button>
                    <Button
                        color="inherit"
                        title="My favorites"
                        href={isLoggedIn ? "/myfavorites" : "/login"}
                    >
                        <Badge
                            badgeContent={3}
                            color="secondary"
                        >
                            <FavoriteIcon />
                        </Badge>
                    </Button>
                    <Button
                        color="inherit"
                        title="My shopping cart"
                        href={isLoggedIn ? "/myshoppingcart" : "/login"}
                    >
                        <Badge
                            badgeContent={1}
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