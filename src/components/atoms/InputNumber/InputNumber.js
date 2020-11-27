import React, { useState } from 'react';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import clsx from 'clsx';
import { makeStyles, FormControl, FilledInput, InputAdornment } from '@material-ui/core/';

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

const InputNumber = ({ amount, setAmount }) => {

    const classes = useStyles();
    const [inputIsAllowed, setInputIsAllowed] = useState(false);


    const handleAmount = (event) => {
        if (inputIsAllowed && event.target.value <= 100) {
            setAmount(event.target.value);
            setInputIsAllowed(false);
        }
    }

    return (
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
    )
}
export default InputNumber;



