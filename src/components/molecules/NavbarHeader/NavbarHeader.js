import React from "react";
import { withRouter } from "react-router-dom";
import { makeStyles, Badge } from '@material-ui/core/';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import BrandTitle from "../../atoms/BrandTitle/BrandTitle";

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
}));

const NavbarHeader = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static" color="transparent">
                <Toolbar>
                    <BrandTitle
                        size={"h3"}
                        styleText={classes.title}
                    />
                    <Button
                        color="inherit"
                        title="Get signed in"
                        href="/login"
                    >
                        <ExitToAppIcon />
                    </Button>
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