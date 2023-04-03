import React from "react";
import { Button, ButtonPropsVariantOverrides, CircularProgress, SxProps, Theme } from "@mui/material";
import {OverridableStringUnion} from "@mui/types";

const SpinButton = (props: { 
    label: string,
    type: "submit" | "button", 
    fullWidth: boolean, 
    variant: OverridableStringUnion<'text' | 'outlined' | 'contained', ButtonPropsVariantOverrides>, 
    loading?: boolean,
    sx?: SxProps<Theme> }
) => {
    return (
        <Button
            type={props.type}
            fullWidth={props.fullWidth}
            variant={props.variant}
            sx={{ mt: 3, mb: 2, ...props.sx }}
        >
            {props.loading && <CircularProgress color='inherit' size={14} style={{ marginRight: 10 }} />}
            {props.label}
        </Button>
    );
}

export default SpinButton;