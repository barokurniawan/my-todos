import React from "react";
import { Box, Button, Card, Checkbox, Container, CssBaseline, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ThemeProvider, Typography, createTheme } from "@mui/material";
import { MyTodo, fetchTodos, removeTodo, updateTodo } from "../persisntace/todos";
import { useNavigate } from "react-router-dom";

const theme = createTheme();
const TodoList = () => {
    const [checked, setChecked] = React.useState([1]);
    const [listTodo, setListTodo] = React.useState<MyTodo[]>([]);
    const navigateApp = useNavigate();

    const handleToggle = (value: number) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    function getAllTodos() {
        let todos = fetchTodos();
        if (!todos) {
            todos = [];
        }

        setListTodo(todos);
    }

    function handleCheckTodo(items: MyTodo[], item: MyTodo, index: number) {
        const newItem = items.at(index);
        if (!newItem) {
            return;
        }

        newItem.isDone = !newItem.isDone;
        updateTodo(items, newItem, index);
        getAllTodos();
    }

    function handleRemoveTodo(items: MyTodo[], title: string) {
        removeTodo(items, title);
        getAllTodos();
    }

    React.useEffect(() => {
        getAllTodos();
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="md">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Card style={{ width: 640 }}>
                        <Box padding={5}>
                            <Grid container spacing={2}>
                                <Grid item xs={8}>
                                    <Typography marginBottom={5} align="left">My Todo List</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Button variant="outlined" onClick={() => navigateApp("/form-todo")}>
                                        + New Todo
                                    </Button>
                                </Grid>
                            </Grid>

                            <TableContainer>
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Descriptio</TableCell>
                                            <TableCell>Due Date</TableCell>
                                            <TableCell>Done</TableCell>
                                            <TableCell>#</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            listTodo.length > 0 ? listTodo.map((row, i) => (
                                                <TableRow
                                                    key={row.description}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell component="th" scope="row">{row.description}</TableCell>
                                                    <TableCell>{row.dueDate}</TableCell>
                                                    <TableCell>
                                                        <Checkbox checked={row.isDone} onChange={() => handleCheckTodo(listTodo, row, i)} />
                                                    </TableCell>
                                                    <TableCell>
                                                        <Button onClick={() => handleRemoveTodo(listTodo, row.description)}>[X]</Button>
                                                    </TableCell>
                                                </TableRow>
                                            )) : <div style={{ color: "grey", padding: 10 }}>No data available</div>
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Card>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default TodoList;