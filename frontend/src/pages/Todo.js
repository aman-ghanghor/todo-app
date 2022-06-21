import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom" ;

import css from "../styles/todo.module.css";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import { FiEdit2 } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { useGlobalContext } from "../context";


const url = 'https://servertodoapp.herokuapp.com/api/todo';


const Todo = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updatingIndex, setUpdatingIndex] = useState(null);
  const [text, setText] = useState("");

  const token = localStorage.getItem("token") ;
 
  const {user, todoList, updateTodoList} = useGlobalContext();

  const navigate = useNavigate() ;

  useEffect(()=>{
    if(user===null) {
       navigate('/form')
    }
  })


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text !== "") {
      if (isUpdating) {
        const note = [...todoList][updatingIndex];
        note.text = text ;
        try {
          const res = await fetch(url, {
            method: "PUT",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(note)
          });
          const result  = await res.json() ;
          if(result.status==='success') {
            updateTodoList(result.data) ;
            setIsUpdating(false);
            setUpdatingIndex(null);
          }
          else {
            alert(result.message)
          }
        }
        catch(error) {
          // console.log(error)
        }
      } 
      else {
        try {
          console.log({text})
          const res = await fetch(url, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({text})
          });
          const result  = await res.json() ;
          if(result.status==='success') {
            updateTodoList(result.data) ;
          }
          else {
            alert(result.message) ;
          }
        }
        catch(error) {
          // console.log(error)
        }
      }
      setText("");
    }
  };

  const handleUpdateClick = (updateIndex) => {
    setUpdatingIndex(updateIndex);
    setIsUpdating(true);
    setText(todoList[updateIndex].text);
  };

  const handleDeleteClick = async (deleteIndex) => {
    try {
      const noteId = todoList[deleteIndex]._id ;
      const res = await fetch(`${url}?noteId=${noteId}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const result  = await res.json() ;
      if(result.status==='success') {
        updateTodoList(result.data) ;
      }
      else {
        alert(result.message);
      }
    }
    catch(error) {
      // console.log(error)
    }
    if (isUpdating) {
      setIsUpdating(false);
      setUpdatingIndex(null);
      setText('') ;
    }
  };

  return (
    <div className={css.container}>
      <Navbar />
      <Sidebar />
      <div className={css.todo}>
        <form className={css.form} onSubmit={handleSubmit}>
          <input
            type="text"
            value={text}
            placeholder="Take note..."
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit" className={css.btn}>
            {isUpdating ? "Update" : "Add"}
          </button>
        </form>
        <div className={css.list}>
          <ul>
            {todoList.map((note, index) => {
              return (
                <li key={index}>
                  <div> {note.text} </div>
                  <div className={css.actions}>
                    <span
                      className={css.icon}
                      onClick={() => handleUpdateClick(index)}
                    >
                      <FiEdit2 />
                    </span>
                    <span
                      className={css.icon}
                      onClick={() => handleDeleteClick(index)}
                    >
                      <MdDeleteOutline />
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Todo;
