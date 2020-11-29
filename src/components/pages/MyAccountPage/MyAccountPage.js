import React, { Fragment, useState, useContext, useEffect } from "react";
import Table from "../../organisms/Table/Table";
import { makeStyles, BottomNavigation, BottomNavigationAction, Paper } from '@material-ui/core';
import Header from "../../atoms/Header/Header";
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import FaceIcon from '@material-ui/icons/Face';
import StoreIcon from '@material-ui/icons/Store';
import SessionHandlerContext from "../../other/Context/SessionHandlerContext";
import PersonalData from "../../organisms/PersonalData/PersonalData";
import ArticleManagement from "../../organisms/ArticleManagement/ArticleManagement";
import UserService from "../../../service/UserService";


const useStyles = makeStyles((theme) => ({
    header: {
        color: "#87C4F4",
        margin: "10px"
    },
    paper: {
        border: "3px solid",
        borderColor: "#87C4F4",
        margin: "10px",

    }
}));

/*
    Data
*/
function createData(id, orderStatus, paymentStatus, total, articles) {
    return { id, orderStatus, paymentStatus, total, articles };
}

const rows = [
    createData('1', 'Delivered', 'Paid', '67.-', '-'),
    createData('2', 'Waiting for payment', 'Not paid yet', '193.50', '-'),
    createData('3', 'In processing', 'Bill', '99.-', '-'),
    createData('4', 'Canceled', 'Paid back', '42.90', '-'),
    createData('5', 'Shipped from warehouse', 'Paid', '149.-', '-'),
    createData('6', 'In processing', 'Paid', '87', '-'),
    createData('7', 'Delivered', 'Paid', '15.-', '-'),
    createData('8', 'Delivered', 'Bill', '432.-', '-'),
    createData('9', 'Delivered', 'Paid bill', '89.90', '-'),
    createData('10', 'Delivered', 'Paid', '115.-', '-'),
];

const headCells = [
    { id: 'id', label: 'Order ID' },
    { id: 'orderStatus', label: 'Order status' },
    { id: 'paymentStatus', label: 'Payment status' },
    { id: 'payAmount', label: 'Total' },
    { id: 'articles', label: 'Articles' },
];

const MyAccountPage = () => {

    const { user } = useContext(SessionHandlerContext);

    const classes = useStyles();

    const [articlesToManage, setArticlesToManage] = useState([]);


    const getArticlesToManage = () => {
        UserService.getOwnArticles(user.id)
            .then(res => {
                setArticlesToManage(res.data);
            })
            .catch(err => {
                console.error('Error in MyAccountPage: ', err);
            });
    }

    useEffect(() => {
       getArticlesToManage();
       // eslint-disable-next-line
    }, [])

    const [value, setValue] = useState('orders');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Fragment>
            <Header
                text={"My Account - " + user.firstName + " " + user.lastName}
                style={classes.header}
                size={"h4"}
            />
            <BottomNavigation
                value={value}
                onChange={handleChange}
            >
                <BottomNavigationAction style={{ color: "#87C4F4" }} title={"My Orders"} label="My Orders" value="orders" icon={<ShoppingBasketIcon />} />
                <BottomNavigationAction style={{ color: "#87C4F4" }} title={"My Personal Data"} label="My Personal Data" value="personalData" icon={<FaceIcon />} />
                <BottomNavigationAction style={{ color: "#87C4F4" }} title={"My Articles"} label="My Articles" value="articles" icon={<StoreIcon />} />
            </BottomNavigation>
            <Paper
                elevation={3}
                className={classes.paper}
            >
                {value === 'orders' ?
                    <Table
                        data={rows}
                        headCells={headCells}
                    />
                    : null}
                {value === 'personalData' ?
                    <PersonalData data={user} />
                    : null}
                {value === 'articles' ?
                    <ArticleManagement articles={articlesToManage}/>
                    : null}
            </Paper>
        </Fragment>
    );
};
export default MyAccountPage;