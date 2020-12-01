import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, FormControl, FilledInput, InputAdornment } from '@material-ui/core';
import OwnButton from "../../atoms/OwnButton/OwnButton";
import InputNumber from "../../atoms/InputNumber/InputNumber";
import ArticleForm from "../../organisms/ArticleForm/ArticleForm";

const DialogComp = ({ isOpen, handler, article, mode, titleDialog, confirmAction }) => {

    const [amount, setAmount] = useState(1);

    return (
        <div>
            <Dialog
                open={isOpen}
                onClose={handler}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    {mode === 'inputNumber' ?
                        "To shopping cart"
                        : null}
                    {mode === 'removeArticle' || mode === 'editArticle' || mode === 'createArticle' ?
                        titleDialog
                        : null}
                </DialogTitle>
                <DialogContent>
                    {mode === 'inputNumber' ?
                        <div>
                            <DialogContentText>
                                {"Select amount for '" + article.articleName + "' (Max. amount: 100 pcs.)"}
                            </DialogContentText>
                            <InputNumber
                                amount={amount}
                                setAmount={setAmount}
                            />
                        </div>
                        : null}
                    {mode === 'editArticle' ?
                        <ArticleForm
                            article={article}
                            mode={'edit'}
                            handleDialog={handler}
                        />
                        : null}
                    {mode === 'createArticle' ?
                        <ArticleForm
                            article={article}
                            mode={'create'}
                            handleDialog={handler}
                        />
                        : null}
                </DialogContent>
                <DialogActions>
                    {mode !== 'editArticle' && mode !== 'createArticle' ?
                        <OwnButton
                            onClickFunc={handler}
                            typeOfButton={'cancel'}
                        />
                        : null}
                    {mode !== 'editArticle' && mode !== 'createArticle' ?
                        <OwnButton
                            onClickFunc={confirmAction}
                            typeOfButton={'confirm'}
                        />
                        : null}
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default DialogComp;
