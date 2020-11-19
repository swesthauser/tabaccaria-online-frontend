import React, { Fragment, useEffect } from "react";
import { makeStyles } from '@material-ui/core/';
import Header from "../../atoms/Header/Header";
import Table from "../../organisms/Table/Table";

const useStyles = makeStyles((theme) => ({
    header: {
        color: "#87C4F4",
        margin: "10px"
    }
}));

const MyShoppingCartPage = () => {
    const classes = useStyles();
    // const [articles, setArticles] = useState([]);

    // const getArticles = () => {
    //     axios.get('http://localhost:8080/cart/' + user.id)
    //         .then(res => {
    //             let data = res.data;
    //             console.log(res)
    //             setArticles(data);
    //         })
    //         .catch(err => {
    //             console.error('ERROR: ', err);
    //         })
    // }

    useEffect(() => {
        // getArticles();
        // getUser();
        // eslint-disable-next-line
    }, [])

    return (
        <Fragment>
            <Header
                text={"My shopping cart - overview"}
                style={classes.header}
                size={"h2"}
            />
           <Table
                headCells={[]}
                data={[]}
           />
        </Fragment>
    )
}
export default MyShoppingCartPage;