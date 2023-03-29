import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { AddAPhoto, ArrowBack, DeleteForever, Photo } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs'
import { AlertError, AlertSuccess } from '../widgets/alerts';
import { saveTodo } from '../persisntace/todos';
import FormImagePreview from './widgets/form-image-preview';
import FormSelectImage from './widgets/form-select-image';

const theme = createTheme();
export default function FormTodo() {
    const [desc, setDesc] = React.useState('');
    const [dueDate, setDueDate] = React.useState('');
    const [alert, setAlert] = React.useState<{ status: "warning" | "success" | "info" | "error", message: string } | null>(null);
    const [imageSnapshot, setImageSnapshot] = React.useState("");
    const navigateApp = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (dayjs(dueDate).format('YYYY-MM-DD') < dayjs().format('YYYY-MM-DD')) {
            setAlert({ status: "error", message: "Invalid date" });
            return;
        }

        if (!desc) {
            setAlert({ status: "error", message: "Description is required" });
            return;
        }

        try {
            saveTodo({
                description: desc,
                dueDate: dueDate,
                isDone: false,
                imageSnapshot: imageSnapshot
            });

            setAlert({
                status: "success",
                message: "Todo saved successfully"
            });
        } catch (error: any) {
            let errorMessage = "Unable to handle the request";
            if (typeof error == "string") {
                errorMessage = error.toString();
            }

            setAlert({
                status: "error",
                message: errorMessage
            });
        }
    };

    const onFileSelected = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = evt.target;
        if (files?.length == 0) {
            console.log("deleted");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = function () {
            if (!reader.result) {
                return;
            }

            setImageSnapshot(reader.result.toString());
        }

        reader.readAsDataURL(files![0]);
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >

                    <Grid container style={{ marginBottom: 20 }}>
                        <Grid item xs={4}>
                            <Button variant="text" onClick={() => navigateApp("/")}>
                                <ArrowBack />
                            </Button>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography>Form Create Todo</Typography>
                        </Grid>
                    </Grid>

                    {
                        alert && (alert.status == "success"
                            ? <AlertSuccess msg={alert.message} />
                            : <AlertError msg={alert?.message} />)
                    }

                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <Grid container>
                            <Grid item xs={12}>
                                <TextField
                                    type='text'
                                    style={{ marginBottom: 20 }}
                                    inputProps={{ maxLength: 32 }}
                                    required
                                    fullWidth
                                    id="description"
                                    label="Description"
                                    autoFocus
                                    onChange={evt => setDesc(evt.target.value)}
                                    helperText="Max 32 char"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker label="Due Date" format="DD/MM/YYYY" disablePast onChange={(evt: any) => setDueDate(`${evt.$y}-${(evt.$M + 1)}-${evt.$D}`)} />
                                </LocalizationProvider>
                            </Grid>

                            <Grid item xs={12}>
                                {
                                    imageSnapshot 
                                        ? (<FormImagePreview imageSnapshot={imageSnapshot} onDelete={() => setImageSnapshot("")} />) 
                                        : (<FormSelectImage onFileSelected={onFileSelected} />)
                                }

                            </Grid>
                        </Grid>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}