import React, { Fragment } from "react";
import NavbarHeader from "../../molecules/NavbarHeader/NavbarHeader";
import Table from "../../organisms/Table/Table";
import { makeStyles } from '@material-ui/core/styles';
import Header from "../../atoms/Header/Header";

const useStyles = makeStyles((theme) => ({
    header: {
        color: "#87C4F4",
        margin: "10px"
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


const MyOrdersPage = (props) => {

    const classes = useStyles();

    return (
        <Fragment>
            <NavbarHeader/>
            <Header
                text={"My orders - overview"}
                style={classes.header}
                size={"h2"}
            />
            <Table
                data={rows}
                headCells={headCells}
            />       
        </Fragment>
    );
};
export default MyOrdersPage;