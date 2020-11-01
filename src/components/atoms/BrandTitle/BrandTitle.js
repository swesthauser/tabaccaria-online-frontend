import React from 'react';
import { Button, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    brand: {
        textAlign: "center",
        '&:hover': {
            backgroundColor: "transparent"
        },
    }
}));

const BrandTitle = ({ size, styleText, text }) => {
    const classes = useStyles();
    return (
        <Button
            href={"/"}
            className={classes.button}
            fullWidth
        >
            <Typography
                variant={size}
                className={styleText}
            >

                Tabacsabrivo - safely cheapest
            <p>{text}</p>
            </Typography>
        </Button>
    );
};
export default BrandTitle;