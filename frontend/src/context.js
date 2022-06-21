import React, {useContext, useEffect, useReducer} from "react";

const AppContext = React.createContext();

const url = 'https://servertodoapp.herokuapp.com/api' ;


const initialState = {
    token: null,
    user: null,
    isSidebarOpen: false,
    isLogged: false,
    todoList: []
}

const reducer = (state, action) => {
    const {type, payload} = action ;

    if(type==="SET_SIDEBAR_OPEN") {
        return {...state, isSidebarOpen: payload}
    }

    if(type==="LOGIN") {
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

    useEffect(()=>{
        const token = localStorage.getItem('token') ;
        if(token) {
          async function fetchUser() {
              try {
                  const res = await fetch(`${url}/user`, {
                     method: "GET",
                     headers: {
                         'Authorization': "Bearer " + token
                     }
                  })
                  const result = await res.json() ;
                  if(result.status==='success') {
                     dispatch({type: "SET_USER", payload: result.data}) ;
                  }
                  else {
                     alert("Unable to fetch user");
                  }
              }
              catch(error) {
                 // console.log(error) ;
              }
          }
          fetchUser() ;
        }
     }, [])

    const setIsSidebarOpen = (isOpen) => {
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




