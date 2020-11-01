import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, FormControl, FilledInput, InputAdornment } from '@material-ui/core';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import OwnButton from "../../atoms/OwnButton/OwnButton";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '15ch',
    },
}));

const DialogComp = ({ isOpen, handler, article }) => {

    const classes = useStyles();

    const [amount, setAmount] = useState(1);
    const [inputIsAllowed, setInputIsAllowed] = useState(false);


    const handleAmount = (event) => {
        if (inputIsAllowed && event.target.value <= 100) {
            setAmount(event.target.value);
            setInputIsAllowed(false);
        }
    }

    return (
        <div>
            <Dialog
                open={isOpen}
                onClose={handler}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">To shopping cart</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {"Select amount for '" + article.title + "' (Max. amount: 100 pcs.)"}
                    </DialogContentText>
                    <FormControl className={clsx(classes.margin, classes.textField)} variant="filled">
                        <KeyboardEventHandler
                            handleKeys={['numeric', 'backspace']}
                            onKeyEvent={(k, e) => {
                                setInputIsAllowed(true)
                            }}
                        >
                            <FilledInput
                                id="filled-adornment-amount"
                                value={amount}
                                onChange={(event) => handleAmount(event)}
                                endAdornment={<InputAdornment position="end">{"Pcs."}</InputAdornment>}
                                aria-describedby="filled-amount-helper-text"
                                inputProps={{
                                    'aria-label': 'amount',
                                }}
                            />
                        </KeyboardEventHandler>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <OwnButton
                        onClickFunc={handler}
                        typeOfButton={'cancel'}
                    />
                    <OwnButton
                        onClickFunc={() => console.log('Clicked on submit')}
                        typeOfButton={'submit'}
                    />
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default DialogComp;
