import React from "react";
import { Link } from "react-router-dom";
import { ImCross } from "react-icons/im";

import css from "../styles/sidebar.module.css";
import { useGlobalContext } from "../context";

function Sidebar() {
  const { isSidebarOpen, setIsSidebarOpen, isLogged, userLogout } = useGlobalContext();

  return (
    <aside className={`${css.sidebar} ${isSidebarOpen ? css.open : ""}`}>
      <div className={css.topbar}>
        <div onClick={() => setIsSidebarOpen(false)}>
          <ImCross />
        </div>
      </div>
      <ul>
        <li onClick={() => setIsSidebarOpen(false)}>
          <Link to="/"> Home </Link>
        </li>
        <li onClick={() => setIsSidebarOpen(false)}>
          <Link to="/"> about </Link>
        </li>
        <li onClick={() => setIsSidebarOpen(false)}>
          <Link to="/"> Contact </Link>
        </li>
        <li onClick={() => setIsSidebarOpen(false)}>
          <Link to="/"> Download </Link>
        </li>
        <li onClick={() => setIsSidebarOpen(false)}>
          {isLogged ? (
            <Link to="/" onClick={userLogout}> Logout </Link>
          ) : (
            <Link to="/form"> Login</Link>
          )}
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
