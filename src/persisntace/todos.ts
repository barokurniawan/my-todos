const TODOS_KEY = "TODO_LIST";

interface MyTodo {
    description: string;
    dueDate: string;
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
    let items = fetchTodos();
    if (items) {
        items?.push(todo);
    } else {
        items = [todo];
    }

    return localStorage.setItem(TODOS_KEY, JSON.stringify(items));
}

const removeTodo = (items: MyTodo[], title: string) => {
    const newItems = items.filter(e => e.description != title);
    replaceTodos(newItems);
}

const updateTodo = (items: MyTodo[], item: MyTodo, index: number) => {
    items[index] = item;
    replaceTodos(items);
}

export {
    fetchTodos,
    saveTodo,
    removeTodo,
    updateTodo,
    type MyTodo
}