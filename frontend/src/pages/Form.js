import React, {useState, useEffect} from 'react'
import {useNavigate} from "react-router-dom" ;

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

import Register from "../components/Register"
import Login from "../components/Login"
import css from "../styles/form.module.css" ;
import { useGlobalContext } from '../context';

function Form() {
  const [isLogging, setIsLogging] = useState(false)
  const {user} = useGlobalContext();

  const navigate = useNavigate() ;

  useEffect(()=>{
    if(user) {
       navigate('/todo') ;
    }
  }, [])

  return (
    <div className={css.container}>
       <Navbar/>
       <Sidebar/>
       <div className={css.form_wrapper}>
        <div className={css.toggle}>
            <button className={isLogging ? css.active: ''} onClick={()=> setIsLogging(true)} > Login </button>
            <button className={isLogging ? '': css.active} onClick={()=> setIsLogging(false)} > Create Account </button>
        </div>
        {isLogging ? <Login />: <Register />}
       </div>
    </div>
  )
}


export default Form

