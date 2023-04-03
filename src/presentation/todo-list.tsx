import React from "react";
import { Box, Button, Card, Checkbox, Container, CssBaseline, Grid, ThemeProvider, Typography, createTheme } from "@mui/material";
import { MyTodo, fetchTodos, removeTodo, updateTodo } from "../persisntace/todos";
import { useNavigate } from "react-router-dom";
import { DeleteForever, Edit, Login, Logout } from "@mui/icons-material";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import * as Session from "../persisntace/session";

const theme = createTheme();
const TodoList = () => {
    const [listTodo, setListTodo] = React.useState<MyTodo[]>([]);
    const navigateApp = useNavigate();
    const columns: GridColDef[] = [
        { field: 'description', headerName: 'Description', width: 130, sortable: false, },
        { field: 'dueDate', headerName: 'Due Date', width: 130 },
        {
            sortable: false,
            field: 'isDone', headerName: 'Done', width: 130,
            renderCell(value: any) {
                const { row } = value;
                return (<Checkbox checked={row.isDone} onChange={() => handleCheckTodo(row)} />);
            }
        },
        {
            sortable: false,
            field: "imageSnapshot", headerName: "Image", width: 115,
            renderCell(value: any) {
                const { row } = value as { row: MyTodo };
                if (!row.imageSnapshot) {
                    return "";
                }

                return (
                    <Box component={"img"} width={120}
                        src={row.imageSnapshot}
                        style={{
                            border: "1x solid #eaeaea",
                            borderRadius: "10px",
                            backgroundColor: "grey"
                        }}
                    />
                )
            }
        },
        {
            sortable: false,
            field: 'action', headerName: 'Action', width: 130,
            renderCell(value: any) {
                if(!Session.isLogedIn()) {
                    return "";
                }

                const { row } = value;
                return (
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Button onClick={() => navigateApp("/form-todo?edit", { state: { data: row } })}><Edit color="warning" /></Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button id="btn-delete" onClick={() => handleRemoveTodo(listTodo, row.description)}><DeleteForever color="error" /></Button>
                        </Grid>
                    </Grid>
                );
            },
        },
    ];

    function getAllTodos() {
        let todos = fetchTodos();
        if (!todos) {
            todos = [];
        }

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
    }, []);

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

                            <div style={{ height: 400, width: '100%' }}>
                                <DataGrid
                                    rows={listTodo}
                                    columns={columns}
                                    disableColumnMenu
                                    disableColumnSelector
                                    disableRowSelectionOnClick
                                    hideFooterPagination={true}
                                />
                            </div>
                        </Box>
                    </Card>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default TodoList;