import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context";


import css from "../styles/form.module.css" ;

const url = 'https://servertodoapp.herokuapp.com/api';


function Login() {
  const [email, setEmail] = useState('') ;
  const [password, setPassword] = useState('') ;

  const {userLogin} = useGlobalContext() ;

  const navigate = useNavigate() ;



  const handleSubmit = async (e) => {
    e.preventDefault() ;
   
    if(email && password) {
       try {
         const res = await fetch(`${url}/user/login`, {
           method: "POST",
           headers: {
             'Content-Type': 'application/json'
           },
           body: JSON.stringify({email, password})
         })
         const result = await res.json() ;
           if(result.status==='success') {
              localStorage.setItem('token', result.token) ;
              userLogin(result.data) ;
              navigate('/todo') ;
           }
           else {
              alert(result.message) ;
           }
       }
       catch(error) {
         // console.log(error) ;
       }
    }
    else {
       alert("All fields are requried!!") ;
    }

  }


  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <h1>Login</h1>
      <div className={css["form-input"]}>
        <input type="email" value={email} placeholder="Email address" id="email" onChange={(e)=> setEmail(e.target.value)} />
        <label htmlFor="email">Email Address</label>
      </div>
      <div className={css["form-input"]}>
        <input type="password" value={password} placeholder="Password" id="password" onChange={(e)=> setPassword(e.target.value) } />
        <label htmlFor="password">Password</label>
      </div>
      <button> Login </button>
    </form>
  );
}

export default Login;
