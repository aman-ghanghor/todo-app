import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context";

import css from "../styles/form.module.css";

const url = "https://servertodoapp.herokuapp.com/api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { userLogin } = useGlobalContext();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name && email && password) {
      if (name.length < 3) {
        alert("Name must contain alteast 3 characters");
      } else if (password.length < 6) {
        alert("password must contain alteast 6 characters");
      } else {
        try {
          const res = await fetch(`${url}/user/register`, {
            method: "POST",
            headers: {
              "Content-type": "application/json",
              "Access-control-allow-origin": "*",
            },
            body: JSON.stringify({ name, email, password }),
          });
          const result = await res.json();
          if (result.status === "success") {
            localStorage.setItem("token", result.token);
            userLogin(result.data);
            navigate("/todo");
          } else {
            alert(result.message);
          }
        } catch (error) {
          // console.log(error)
        }
      }
    } else {
      alert("All fields are required");
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <h1>Create Account</h1>
      <div className={css["form-input"]}>
        <input
          type="text"
          value={name}
          placeholder="Name"
          id="name"
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="name">Name</label>
      </div>
      <div className={css["form-input"]}>
        <input
          type="email"
          value={email}
          placeholder="Email address"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="email">Email Address</label>
      </div>
      <div className={css["form-input"]}>
        <input
          type="password"
          value={password}
          placeholder="Password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="password">Password</label>
      </div>
      <button> Create Account </button>
    </form>
  );
}

export default Register;
