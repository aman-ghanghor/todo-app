import React, {useState, useEffect} from 'react'

import css from "../styles/home.module.css"
import todoImage from "../images/todo.png"
 

import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'


function Home() {

  return (
    <div className={css.container}>
      <Navbar />
      <Sidebar />
      <section className={`${css.section} ${css.hero}`}>
         <div className={css.text}>
            <h1> Organize your work and life, finally. </h1>
            <p>
              Become focused, organized, and calm with Todoist. The world’s #1 task manager 
              and to-do list app.
            </p>
            <div className={css.btn_container}>
              <button className={css.btn}> Start for free </button>
            </div>
         </div>
         <div className={css.image}>
            <img src={todoImage} alt="" />
         </div>
      </section>
    </div>
  )
}

export default Home;