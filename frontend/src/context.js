import React, {useContext, useState, useEffect, useReducer} from "react";

const AppContext = React.createContext();


const initialState = {
    user: null,
    isSidebarOpen: false,
    isLogged: false,
    todoList: []
}

const reducer = (state, action) => {
    const {type, payload} = action ;

    if(type==="SET_SIDEBAR_OPEN") {
        console.log(payload)
        return {...state, isSidebarOpen: payload}
    }

    if(type==="LOGIN") {
        console.log("login", payload.todoList) ;
        return {...state, isLogged: true, user: payload, todoList: payload.todoList}
    }

    if(type==="LOGOUT") {
        return {...state, isLogged: false, user: null, todoList: []}   
    }
    
    if(type==="UPDATE_TODO") {        
        return {...state, todoList: payload}
    }

    return state ;
}



const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState) ;

    const {user, isSidebarOpen, isLogged, todoList} = state  ;
    console.log(state)

    const setIsSidebarOpen = (isOpen) => {
        console.log("setIssidebar called", isOpen) ;
        dispatch({type: "SET_SIDEBAR_OPEN", payload: isOpen}) ;
    } 
    
    const userLogin =(user) => {
        dispatch({type: "LOGIN", payload: user})
    }

    const userLogout = () => {
        localStorage.removeItem('token') ;
        dispatch({type: "LOGOUT"}) ;
    }

    const updateTodoList = (newTodo) => {
        dispatch({type: "UPDATE_TODO", payload: newTodo}) ;
    }



    return (
        <AppContext.Provider value={{
            user,
            todoList,
            isSidebarOpen, 
            isLogged,
            setIsSidebarOpen,
            userLogin,
            updateTodoList,
            userLogout
        }}>
           {children}
        </AppContext.Provider>
    )
}

const useGlobalContext = () => {
    return useContext(AppContext) ;
}



export {AppProvider, useGlobalContext}




