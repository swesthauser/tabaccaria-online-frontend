import React from 'react';
import { Typography } from "@material-ui/core";

const Header = ({ size, style, text }) => {
    return (
            <Typography
                variant={size}
                className={style}
                align={"left"}
            >
                <b>{text}</b>
            </Typography>
    );
};
export default Header;