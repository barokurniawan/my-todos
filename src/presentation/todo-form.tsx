import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { ArrowBack } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs'
import { AlertError, AlertSuccess } from '../widgets/alerts';
import { saveTodo } from '../persisntace/todos';

const theme = createTheme();
export default function FormTodo() {
    const [desc, setDesc] = React.useState('');
    const [dueDate, setDueDate] = React.useState('');
    const [alert, setAlert] = React.useState<{status: "warning" | "success" | "info" | "error", message: string} | null>(null);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(dayjs(dueDate).format('YYYY-MM-DD') < dayjs().format('YYYY-MM-DD')) {
            setAlert({status: "error", message: "Invalid date"});
            return;
        }

        if(!desc) {
            setAlert({status: "error", message: "Description is required"});
            return;
        }

        try {
            saveTodo({
                description: desc, 
                dueDate: dueDate,
                isDone: false
            });

            setAlert({
                status: "success",
                message: "Todo saved successfully"
            });
        } catch (error) {
            setAlert({
                status: "error",
                message: "Unable to handle the request"
            });
        }
    };

    const navigateApp = useNavigate();
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

                    <Grid container style={{marginBottom: 20}}>
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
                        : <AlertError msg={alert?.message}/>) 
                    }

                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker label="Due Date" format="DD/MM/YYYY" disablePast onChange={(evt: any) => setDueDate(`${evt.$y}-${(evt.$M + 1)}-${evt.$D}`)} />
                        </LocalizationProvider>

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