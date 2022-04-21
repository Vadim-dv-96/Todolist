import { addTodolistAC, changeTodolistEntityStatusAC, changeTodolistFilterAC, changeTodolistTittleAC, FilterValuesType, removeTodolistAC, TodolistDomainType, todolistsReducer } from './todolists-reducer';
import { v1 } from 'uuid';
import { TodolistType } from '../api/todolist-api';
import { RequestStatusType } from './app-reducer';

let todolistId1 = v1();
let todolistId2 = v1();


const startState: Array<TodolistDomainType> = [
    {
        id: todolistId1, title: "What to learn", filter: "all", addedDate: "",
        order: 0, entityStatus: "idle"
    },
    {
        id: todolistId2, title: "What to buy", filter: "all", addedDate: "",
        order: 0, entityStatus: "idle"
    }
]
const domainStartState = startState

test('correct todolist should be removed', () => {



    const endState = todolistsReducer(domainStartState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    let todolist: TodolistType = {
        title: "New Todolist",
        addedDate: "",
        order: 0,
        id: todolistId1
    };


    const endState = todolistsReducer(domainStartState, addTodolistAC(todolist))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(todolist.title);
    expect(endState[0].filter).toBe("all");
});

test('correct todolist should change its name', () => {
    let newTodolistTittle = "New Todolist";

    const action = changeTodolistTittleAC(todolistId2, newTodolistTittle)

    const endState = todolistsReducer(domainStartState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTittle);
});

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = "completed";

    const action = changeTodolistFilterAC(newFilter, todolistId2)

    const endState = todolistsReducer(domainStartState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});

test('correct entity status of todolist should be changed', () => {
    let newStatus: RequestStatusType = "loading";

    const action = changeTodolistEntityStatusAC(todolistId2, newStatus)

    const endState = todolistsReducer(domainStartState, action);

    expect(endState[0].entityStatus).toBe("idle");
    expect(endState[1].entityStatus).toBe(newStatus);
});

