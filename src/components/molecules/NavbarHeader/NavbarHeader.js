import React, { useContext } from "react";
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
import { useHistory } from 'react-router-dom'
import Logo from './../../../logo.png'

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
    const history = useHistory();
    const { user, logout } = useContext(SessionHandlerContext);

    const goToLogin = () => {
        history.push('/login');
    };

    const goToAccount = () => {
        history.push('/myaccount');
    };

    const goToFavorites = () => {
        history.push('/myfavorites');
    };

    const goToShoppingCart = () => {
        history.push('/myshoppingcart');
    }

    const goToStart = () => {
        history.push('/');
    }


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
                <img src={Logo} alt="" width={'150px'} onClickFunc={goToStart}/>
                    <BrandTitle
                        size={"h3"}
                        styleText={classes.title}
                        onClickFunc={goToStart}
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
                            onClick={goToLogin}
                        >
                            <LockIcon />
                        </Button>
                        : null}

                    <Button
                        color="inherit"
                        title="My account"
                        onClick={user != null ? goToAccount : goToLogin}
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
                        onClick={user != null ? goToFavorites : goToLogin}
                    >
                        <Badge
                            badgeContent={null}
                            color="secondary"
                        >
                            <FavoriteIcon />
                        </Badge>
                    </Button>
                    <Button
                        color="inherit"
                        title="My shopping cart"
                        onClick={user != null ? goToShoppingCart : goToLogin}
                    >
                        <Badge
                            badgeContent={null}
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