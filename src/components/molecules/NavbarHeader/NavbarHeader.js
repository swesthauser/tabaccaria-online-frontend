import React, { useContext } from "react";
// import { useHistory, withRouter, Redirect } from "react-router-dom";
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
        backgroundColor: "red",
    }
}));

const NavbarHeader = ({ isLoggedIn }) => {
    const classes = useStyles();
    const { user, logout } = useContext(SessionHandlerContext);
    // const history = useHistory();

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
                                logout();
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
                            <LockIcon />
                        </Button>
                        : null}

                    <Button
                        color="inherit"
                        title="My account"
                        href={isLoggedIn ? "/myaccount" : "/login"}
                    >
                        {isLoggedIn ?
                            <Avatar className={classes.avatar}>{user.firstName.substring(0, 1).toUpperCase()+user.lastName.substring(0, 1).toUpperCase()}</Avatar>
                        :
                            <PersonIcon />
                        }
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