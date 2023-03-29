import Alert from "@mui/material/Alert";

const AlertError = (props: {msg: string, style?: React.CSSProperties}) => {
    return <Alert style={props.style} severity="error">{props.msg}</Alert>;
}

const AlertWarning = (props: {msg: string, style?: React.CSSProperties}) => {
    return <Alert style={props.style} severity="warning">{props.msg}</Alert>;
}

const AlertSuccess = (props: {msg: string, style?: React.CSSProperties}) => {
    return <Alert style={props.style} severity="success">{props.msg}</Alert>;
}

export {
    AlertSuccess,
    AlertWarning,
    AlertError
}