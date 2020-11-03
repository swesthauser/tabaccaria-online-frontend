import React, { useState } from "react";
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
import SessionHandler from "../../other/SessionHandler";
import LockIcon from '@material-ui/icons/Lock';
import { SignalCellularNullOutlined } from "@material-ui/icons";


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
    const history = useHistory();
    const [user, setUser] = useState(SessionHandler.getLoggedUser(history));

    return (
        <div className={classes.root}>
            <AppBar position="static" color="transparent">
                <Toolbar>
                    <BrandTitle
                        size={"h3"}
                        styleText={classes.title}
                    />
                    {isLoggedIn ?
                        <Avatar
                            className={classes.avatar}
                            title={user.firstName + " " + user.lastName}
                        >
                            {user.firstName.substring(0, 1).toUpperCase() + user.lastName.substring(0, 1).toUpperCase()}
                        </Avatar>
                        : null}
                    {isLoggedIn ?
                        <Button
                            color="inherit"
                            title="Get logged out"
                            onClick={() => SessionHandler.getLoggedOut()}
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
                        href="/myorders"
                    >
                        <PersonIcon />
                    </Button>
                    <Button
                        color="inherit"
                        title="My favorites"
                        href="/myfavorites"
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
export default withRouter(NavbarHeader);