import Alert from "@mui/material/Alert";

const AlertError = (props: {msg: string}) => {
    return <Alert severity="error">{props.msg}</Alert>;
}

const AlertWarning = (props: {msg: string}) => {
    return <Alert severity="warning">{props.msg}</Alert>;
}

const AlertSuccess = (props: {msg: string}) => {
    return <Alert severity="success">{props.msg}</Alert>;
}

export {
    AlertSuccess,
    AlertWarning,
    AlertError
}