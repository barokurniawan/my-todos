import uuidv4 from "../helpers/uuidv4";
import { isLogedIn } from "./session";

const TODOS_KEY = "TODO_LIST";

interface MyTodo {
    id?: string;
    description: string;
    dueDate: string;
    imageSnapshot?: string;
    isDone: boolean;
}

const fetchTodos = () => {
    const items = localStorage.getItem(TODOS_KEY);
    if (!items) {
        return null;
    }

    return JSON.parse(items) as MyTodo[];
}

const replaceTodos = (items: MyTodo[]) => {
    localStorage.setItem(TODOS_KEY, JSON.stringify(items));
}

const saveTodo = (todo: MyTodo) => {
    if(!isLogedIn()) {
        throw "Authentication is required";
    }

    if(!todo.dueDate) {
        throw "Due date is required";
    }

    todo.id = uuidv4();
    let items = fetchTodos();
    if (!items) {
        items = [todo];
    } else {
        const checkUnique = items.filter(e => e.description == todo.description);
        if (checkUnique.length > 0) {
            throw "Todo is already exists";
        }

        items?.push(todo);
    }

    return localStorage.setItem(TODOS_KEY, JSON.stringify(items));
}

const removeTodo = (items: MyTodo[], title: string) => {
    if(!isLogedIn()) {
        throw "Authentication is required";
    }

    const newItems = items.filter(e => e.description != title);
    replaceTodos(newItems);
}

const updateTodo = (item: MyTodo) => {
    if(!isLogedIn()) {
        throw "Authentication is required";
    }

    let items = fetchTodos();
    if(items == null || items.length == 0) {
        throw new Error("Update failed, list todo is empty!");
    }

    items = items.filter(i => i.id != item.id);
    items.push(item);
    replaceTodos(items);
}

export {
    fetchTodos,
    saveTodo,
    removeTodo,
    updateTodo,
    type MyTodo
}