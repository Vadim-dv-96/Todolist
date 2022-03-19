import {addTodolistAC, changeTodolistFilterAC, changeTodolistTittleAC, removeTodolistAC, todolistsReducer} from './todolists-reducer';
import {v1} from 'uuid';
import {FilterValuesType, TodolistType} from '../App';

test('correct todolist should be removed', () => {
   let todolistId1 = v1();
   let todolistId2 = v1();

   const startState: Array<TodolistType> = [
       {id: todolistId1, tittle: "What to learn", filter: "all"},
       {id: todolistId2, tittle: "What to buy", filter: "all"}
   ]

   const endState = todolistsReducer(startState, removeTodolistAC(todolistId1)  )

   expect(endState.length).toBe(1);
   expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();
 
    let newTodolistTittle = "New Todolist";
 
    const startState: Array<TodolistType> = [
        {id: todolistId1, tittle: "What to learn", filter: "all"},
        {id: todolistId2, tittle: "What to buy", filter: "all"}
    ]
 
    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTittle) )
 
    expect(endState.length).toBe(3);
    expect(endState[0].tittle).toBe(newTodolistTittle);
    expect(endState[0].filter).toBe("all");
 });

 test('correct todolist should change its name', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();
 
    let newTodolistTittle = "New Todolist";
 
    const startState: Array<TodolistType> = [
        {id: todolistId1, tittle: "What to learn", filter: "all"},
        {id: todolistId2, tittle: "What to buy", filter: "all"}
    ]
    
    const action = changeTodolistTittleAC( todolistId2, newTodolistTittle )
 
    const endState = todolistsReducer(startState, action );
 
    expect(endState[0].tittle).toBe("What to learn");
    expect(endState[1].tittle).toBe(newTodolistTittle);
 });

 test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();
 
    let newFilter: FilterValuesType = "completed";
 
    const startState: Array<TodolistType> = [
        {id: todolistId1, tittle: "What to learn", filter: "all"},
        {id: todolistId2, tittle: "What to buy", filter: "all"}
    ]

    const action = changeTodolistFilterAC( newFilter, todolistId2 )
 
    const endState = todolistsReducer(startState, action );
 
    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
 });
 
  
 
