import { fireEvent, render, screen } from "@testing-library/react"
import { BrowserRouter, Location } from "react-router-dom"
import FormTodo from "./todo-form"

describe("Test add todo", () => {
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
    })

    test('Can add a todo', () => {
        const vdom = render(
            <BrowserRouter>
                <FormTodo />
            </BrowserRouter>
        );

        expect(screen.getByText("Submit")).toBeInTheDocument();

        const inputDesc = vdom.container.querySelector("#description")!;
        fireEvent.change(inputDesc, { target: { value: 'test input todo' } });
        fireEvent.change(screen.getByPlaceholderText("⁦⁨DD⁩ / ⁨MM⁩ / ⁨YYYY⁩⁩"), { target: { value: '12/12/2024' } });

        fireEvent.click(screen.getByText("Submit"));

        expect(screen.getByRole("alert")).toBeVisible();
    });
});

// describe("Test edit todo", () => {
//     beforeEach(() => {
//         const localStorageMock = (function () {
//             let store: any = {
//                 TODO_LIST: '[{"description":"besok","dueDate":"2023-3-30","isDone":true,"id":"137c5131-5bc6-4c69-9b1e-5e32f2957acf"},{"description":"test4","dueDate":"2023-4-3","isDone":false,"imageSnapshot":"","id":"7de97520-91e1-4144-87b4-eb9bb2a8b246"}]'
//             }

//             return {
//                 getItem: function (key: any) {
//                     return store[key] || null
//                 },
//                 setItem: function (key: any, value: any) {
//                     store[key] = value.toString()
//                 },
//                 removeItem: function (key: any) {
//                     delete store[key]
//                 },
//                 clear: function () {
//                     store = {}
//                 }
//             }
//         })()

//         Object.defineProperty(window, 'localStorage', {
//             value: localStorageMock
//         });

//         jest.mock("react-router-dom", () => {
//             return {
//                 ...jest.requireActual("react-router-dom"),
//                 useLocation: jest.fn().mockImplementation(() => {
//                     return {
//                         pathname: "/form-todo?edit",
//                         search: "",
//                         hash: "",
//                         state: { data: { description: "besok", dueDate: "2023-3-30", isDone: true, id: "137c5131-5bc6-4c69-9b1e-5e32f2957acf" } },
//                         key: "default",
//                     } as Location;
//                 }),
//             };
//         });
//     })

//     test('Can edit a todo', () => {
//         render(
//             <BrowserRouter>
//                 <FormTodo />
//             </BrowserRouter>
//         );

//         expect(screen.getByText("Form Edit Todo")).toBeInTheDocument();
//     });
// });