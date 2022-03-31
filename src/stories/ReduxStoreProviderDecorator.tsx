import React from 'react'
import {Provider} from 'react-redux'
import {combineReducers, createStore} from 'redux'
import { tasksReducer } from '../state/tasks-reducer'
import {todolistsReducer} from '../state/todolists-reducer'
import {v1} from 'uuid'
import {AppRootState} from '../state/store'


const rootReducer = combineReducers({
   tasks: tasksReducer,
   todolists: todolistsReducer
})

const initialGlobalState = {
   todolists: [
       {id: "todolistId1", tittle: "What to learn", filter: "all"},
       {id: "todolistId2", tittle: "What to buy", filter: "all"}
   ] ,
   tasks: {
       ["todolistId1"]: [
           {id: v1(), tittle: "HTML&CSS", isDone: true},
           {id: v1(), tittle: "JS", isDone: true}
       ],
       ["todolistId2"]: [
           {id: v1(), tittle: "Milk", isDone: true},
           {id: v1(), tittle: "React Book", isDone: true}
       ]
   }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootState);

export const ReduxStoreProviderDecorator = (storyFn: any) => (
   <Provider store={storyBookStore} > {storyFn()} </Provider>)