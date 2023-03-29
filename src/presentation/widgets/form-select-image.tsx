import React from "react";
import { AddAPhoto } from "@mui/icons-material";
import { Box, Button } from "@mui/material";

const FormSelectImage = (props: {onFileSelected: (evt: React.ChangeEvent<HTMLInputElement>) => void}) => {
    return (
        <Box
            border={"1px solid #aeaeae"}
            borderRadius={5}
            display="flex"
            marginTop={3}
            justifyContent="center"
            alignItems="center"
            minHeight="40vh"
        >
            <Button variant="contained" component="label" style={{ margin: "auto 0" }}>
                <AddAPhoto /> <div style={{ marginLeft: 10 }}>Add Image</div>
                <input onChange={props.onFileSelected} type='file' style={{ display: "none" }} />
            </Button>
        </Box>
    );
}

export default FormSelectImage;