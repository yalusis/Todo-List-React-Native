import React, { useContext, useReducer } from "react";
import { ScreenContext } from "../screen/screenContext";
import { ADD_TODO, CLEAR_ERROR, FETCH_TODOS, HIDE_LOADER, REMOVE_TODO, SHOW_ERROR, SHOW_LOADER, UPDATE_TODO } from "../types";
import { TodoContext } from "./todoContext";
import { todoReducer } from "./TodoReducer";
import { Alert } from "react-native";
import { Http } from "../../http";

export const TodoState = ({ children }) => {
    const initialState = {
        todo: [],
        loading: false,
        error: null
    }

    const { changeScreen } = useContext(ScreenContext)
    const [state, dispatch] = useReducer(todoReducer, initialState)

    const addTodo = async title => {
      clearError()
      try {
        const data = await Http.post(`https://react-native-todo-list-d39e3-default-rtdb.firebaseio.com/todos.json`, 
        { title })
        dispatch({ type: ADD_TODO, title, id: data.name})
      } catch (e) {
        showError('Щось пошло не так!')
      }
    }

    const fetchTodos = async () => {
      showLoader()
      clearError()
      try {
        const data = await Http.get(`https://react-native-todo-list-d39e3-default-rtdb.firebaseio.com/todos.json`)
        console.log("Fetch data", data)
        if(data == null) {
          dispatch({ type: FETCH_TODOS, todos: [] })
        } else {
          const todos = Object.keys(data).map(key => ({...data[key], id: key}))
          dispatch({ type: FETCH_TODOS, todos })
        }
      } catch (e) {
          showError('Щось пішло не так...')
          console.log(e)
      } finally {
        hideLoader()
      }        
    }

    const removeTodo = id => {
        const choosen_todo = state.todo.find(item => item.id === id)
        Alert.alert(
            "Видалити елемент?",
            `Ви впевнені, шо хочете видалити "${choosen_todo.title}"`,
            [
              {
                text: "Скасувати",
                style: 'cancel'      
              },
              {
                text: 'Видалити',
                style: 'destructive',
                onPress: async () => {
                    changeScreen(null)
                    await Http.delete(`https://react-native-todo-list-d39e3-default-rtdb.firebaseio.com/todos/${id}.json`)
                    dispatch({ type: REMOVE_TODO, id})
                }
              }
            ],
            { cancelable: false }
          )
    } 

    const updateTodo = async (id, title) => {
      clearError()
      try {
        await Http.patch(`https://react-native-todo-list-d39e3-default-rtdb.firebaseio.com/todos/${id}.json`,
        { title })
        dispatch({ type: UPDATE_TODO, id, title})
      } catch (e) {
        showError('Щось пішло не так...')
        console.log(e)
      }
    }

    const showLoader = () => dispatch({ type: SHOW_LOADER })

    const hideLoader = () => dispatch({ type: HIDE_LOADER })

    const showError = error => dispatch({ type: SHOW_ERROR, error })

    const clearError = () => dispatch({ type: CLEAR_ERROR })

    return <TodoContext.Provider value={{
        todo: state.todo, showLoader, hideLoader, loading: state.loading, error: state.error, addTodo, removeTodo, updateTodo, fetchTodos
    }}>{children}</TodoContext.Provider>
}