import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, FormControl, FilledInput, InputAdornment } from '@material-ui/core';
import OwnButton from "../../atoms/OwnButton/OwnButton";
import InputNumber from "../../atoms/InputNumber/InputNumber";


const DialogComp = ({ isOpen, handler, article }) => {
    
    const [amount, setAmount] = useState(1);

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
                    <InputNumber
                        amount={amount}
                        setAmount={setAmount}
                    />
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
