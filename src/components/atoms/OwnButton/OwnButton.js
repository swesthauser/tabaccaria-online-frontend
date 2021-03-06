import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    buttonSubmit: {
        backgroundColor: "#87C4F4",
        border: "none",
        color: "#FFFFFF",
        '&:hover': {
            color: "#87C4F4"
        },
        '&:disabled': {
            color: "grey",
            backgroundColor: "#FFFFFF",
        }
    },
    buttonCancel: {
        backgroundColor: "red",
        border: "none",
        color: "#FFFFFF",
        '&:hover': {
            color: "red"
        },
        '&:disabled': {
            color: "grey",
            backgroundColor: "#FFFFFF"
        }
    },
    buttonConfirm: {
        backgroundColor: "green",
        border: "none",
        color: "#FFFFFF",
        '&:hover': {
            color: "green"
        },
        '&:disabled': {
            color: "grey",
            backgroundColor: "#FFFFFF",
        }
    }
}));

const OwnButton = ({ onClickFunc, typeOfButton, hRef, text, isNotChanged }) => {

    const classes = useStyles();

    return (
        <div>
            {typeOfButton === 'submit' ?
                <Button onClick={onClickFunc} className={classes.buttonSubmit} href={hRef} variant="outlined">Submit</Button>
            : null}
            {typeOfButton === 'cancel' ?
                <Button onClick={onClickFunc} className={classes.buttonCancel} href={hRef} variant="outlined">Cancel</Button>
            : null}
            {typeOfButton === 'buy' ?
                <Button onClick={onClickFunc} className={classes.buttonSubmit} href={hRef} variant="outlined">Buy</Button>
            : null}
            {typeOfButton === 'formikSubmit' ?
                <Button type="submit" disabled={isNotChanged} onClick={onClickFunc} className={classes.buttonSubmit} href={hRef} variant="outlined">{text}</Button>
            : null}
            {typeOfButton === 'confirm' ?
                <Button onClick={onClickFunc} className={classes.buttonConfirm} variant={"outlined"}>Confirm</Button>
            : null}
        </div>
    );
};

export default OwnButton;
