import { ADD_TODO, UPDATE_TODO, REMOVE_TODO, SHOW_LOADER, HIDE_LOADER, CLEAR_ERROR, SHOW_ERROR, FETCH_TODOS } from "../types"

export const todoReducer = ( state, action ) => {
    switch(action.type) {
        case ADD_TODO:
            return {...state, todo: [...state.todo, {
                id: action.id,
                title: action.title
            }]}
        case UPDATE_TODO:
            return {...state, todo: state.todo.map(item => {
                if(item.id === action.id) {
                    item.title = action.title
                }
                return item
            })}
        case REMOVE_TODO:
            return {...state, todo: state.todo.filter(todo => todo.id !== action.id)}
        case SHOW_LOADER:
            return ({...state, loading: true})
        case HIDE_LOADER:
            return ({...state, loading: false})
        case CLEAR_ERROR:
            return ({...state, error: null})
        case SHOW_ERROR:
            return ({state, error: action.error})
        case FETCH_TODOS:
            return ({state, todo: action.todos})
        default:
            return state
    }
}