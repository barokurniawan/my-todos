import { fireEvent, render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react"
import TodoList from "./todo-list"
import { BrowserRouter } from "react-router-dom";
import * as Session from "../persisntace/session";

test('display list todo', () => {
    render(
        <BrowserRouter>
            <TodoList />
        </BrowserRouter>
    );

    expect(screen.getByText("My Todo List")).toBeVisible();
});


describe("Test delete todo", () => {
    beforeEach(() => {
        const localStorageMock = (function () {
            let store: any = {
                TODO_LIST: '[{"description":"besok","dueDate":"2023-3-30","isDone":true,"id":"137c5131-5bc6-4c69-9b1e-5e32f2957acf"},{"description":"test4","dueDate":"2023-4-3","isDone":false,"imageSnapshot":"","id":"7de97520-91e1-4144-87b4-eb9bb2a8b246"}]'
            }

            return {
                getItem: function (key: any) {
                    return store[key] || null
                },
                setItem: function (key: any, value: any) {
                    store[key] = value.toString()
                },
                removeItem: function (key: any) {
                    delete store[key]
                },
                clear: function () {
                    store = {}
                }
            }
        })()

        Object.defineProperty(window, 'localStorage', {
            value: localStorageMock
        });

        jest.spyOn(Session, "isLogedIn").mockImplementation(() => true);
    })

    test('Can delete a todo', async () => {
        render(
            <BrowserRouter>
                <TodoList />
            </BrowserRouter>
        );

        const buttons = await screen.findAllByTitle("Delete");
        fireEvent.click(buttons[0]);
        await waitFor(() => {
            expect(buttons[0]).not.toBeInTheDocument()
        })
    });
});