import React from "react";
import { Box, Button, Card, Checkbox, Collapse, Container, CssBaseline, FormControl, Grid, IconButton, ImageListItem, InputLabel, List, ListItem, ListItemIcon, ListItemText, MenuItem, Select, ThemeProvider, Typography, createTheme } from "@mui/material";
import { MyTodo, fetchTodos, removeTodo, updateTodo } from "../persisntace/todos";
import { useNavigate } from "react-router-dom";
import { DeleteForever, Edit, Login, Logout } from "@mui/icons-material";
import * as Session from "../persisntace/session";
import { TransitionGroup } from 'react-transition-group';
import dayjs from "dayjs";

const theme = createTheme({
    palette: {
        background: {
            default: "#eaeaea"
        }
    }
});
const TodoList = () => {
    const [listTodo, setListTodo] = React.useState<MyTodo[]>([]);
    const [filter, setFilter] = React.useState("sortAscDueDate");
    const navigateApp = useNavigate();

    function getAllTodos() {
        let todos = fetchTodos();
        if (!todos) {
            todos = [];
        }

        todos.sort((a, b) => {
            if (filter == "sortDescDueDate") {
                return new Date(b.dueDate).valueOf() - new Date(a.dueDate).valueOf()
            }

            return new Date(a.dueDate).valueOf() - new Date(b.dueDate).valueOf()
        });

        setListTodo(todos);
    }

    function handleCheckTodo(item: MyTodo) {
        item.isDone = !item.isDone;
        updateTodo(item);
        getAllTodos();
    }

    function handleRemoveTodo(items: MyTodo[], title: string) {
        removeTodo(items, title);
        getAllTodos();
    }

    React.useEffect(() => {
        getAllTodos();
    }, [filter]);

    const handleLogout = () => {
        Session.clearSession();
        navigateApp("/login", {
            state: {
                logout: true,
            }
        });
    }

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
                    <Card style={{ width: 720 }}>
                        <Box padding={5}>
                            <Grid container spacing={2}>
                                <Grid item xs={7}>
                                    <Typography marginBottom={5} align="left">My Todo List</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Button variant="outlined" onClick={() => navigateApp("/form-todo")}>
                                        + New Todo
                                    </Button>
                                </Grid>
                                <Grid item xs={2}>
                                    {
                                        !Session.isLogedIn() ? (
                                            <Button variant="text" onClick={() => navigateApp("/login")}>
                                                <Login />
                                            </Button>
                                        ) : (
                                            <Button variant="text" onClick={handleLogout}>
                                                <Logout />
                                            </Button>
                                        )
                                    }
                                </Grid>
                            </Grid>

                            <Grid container spacing={2}>
                                <Grid item xs={8}></Grid>
                                <Grid item xs={4}>
                                    <FormControl variant="standard" fullWidth>
                                        <InputLabel id="demo-simple-select-label">Sort</InputLabel>
                                        <Select
                                            size="small"
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={filter}
                                            label="Sort"
                                            onChange={(evt) => setFilter(evt.target.value)}
                                        >
                                            <MenuItem value="sortAscDueDate">Asc Due Date</MenuItem>
                                            <MenuItem value="sortDescDueDate">Desc Due Date</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>

                            <Box sx={{ mt: 1 }}>
                                <List>
                                    <TransitionGroup>
                                        {listTodo.map((item) => (
                                            <Collapse key={item.id}>
                                                <ListItem
                                                    secondaryAction={Session.isLogedIn() && (
                                                        <div>
                                                            <IconButton
                                                                style={{ marginRight: 10 }}
                                                                edge="end"
                                                                aria-label="edit"
                                                                title="Edit"
                                                                onClick={() => navigateApp("/form-todo?edit", { state: { data: item } })}
                                                            >
                                                                <Edit color="warning" />
                                                            </IconButton>
                                                            <IconButton
                                                                edge="end"
                                                                aria-label="delete"
                                                                title="Delete"
                                                                onClick={() => handleRemoveTodo(listTodo, item.description)}
                                                            >
                                                                <DeleteForever color="error" />
                                                            </IconButton>
                                                        </div>
                                                    )}
                                                >
                                                    <ListItemIcon>
                                                        <Checkbox checked={item.isDone} onChange={() => handleCheckTodo(item)} />
                                                    </ListItemIcon>
                                                    <ListItemText primary={item.description} secondary={`Due date: ${dayjs(item.dueDate).format("DD/MM/YYYY")}`} />
                                                    <ListItem>
                                                        <Box component={"img"} width={120}
                                                            src={item.imageSnapshot}
                                                            style={{
                                                                border: "1x solid #eaeaea",
                                                                borderRadius: "10px",
                                                                backgroundColor: "grey"
                                                            }}
                                                        />
                                                    </ListItem>
                                                </ListItem>
                                            </Collapse>
                                        ))}
                                    </TransitionGroup>
                                </List>
                            </Box>
                        </Box>
                    </Card>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default TodoList;