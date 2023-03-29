import React from "react";
import { DeleteForever } from "@mui/icons-material";
import { Button } from "@mui/material";

const FormImagePreview = (props: {imageSnapshot: string, onDelete: () => void}) => {
    return (
        <div
            style={{
                border: "1px solid #aeaeae",
                borderRadius: 5,
                display: "flex",
                marginTop: 24,
                justifyContent: "center",
                alignItems: "center",
                height: "40vh",
                backgroundImage: `url(${props.imageSnapshot})`,
                backgroundSize: 'cover',
            }}
        >
            <Button onClick={props.onDelete} variant="contained" style={{ color: "white", backgroundColor: "rgba(244,67,54, 0.5)", }}>
                <DeleteForever />
            </Button>
        </div>
    );
}

export default FormImagePreview; 