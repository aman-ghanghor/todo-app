import React, {useState} from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";

import css from "../styles/navbar.module.css";

import logo from "../images/logo.svg";
import { CgMenu } from "react-icons/cg";
import { FiUser } from "react-icons/fi";

function Navbar() {
  const { isSidebarOpen, setIsSidebarOpen, isLogged, userLogout } = useGlobalContext();
  const [isActive, setIsActive] = useState(false) ;

  return (
    <nav className={css.nav}>
      <div className={css.logo}>
        <img src={logo} alt="" />
      </div>
      <ul>
        <li>
          <Link to="/"> Home </Link>
        </li>
        <li>
          <Link to="/"> About </Link>
        </li>
        <li>
          <Link to="/"> Contact </Link>
        </li>
        <li>
          <Link to="/"> Download </Link>
        </li>
        <li>
          <div className={`${css.popover_wrapper} ${isActive ? css.active: ''}`}>
              <div className={css.popover_title}>
                {isLogged ? (
                  <Link to='' className={css.btn} onClick={()=> setIsActive(!isActive)}>
                    <span className={css.icon}>
                      <FiUser />
                    </span>
                    <span className={css.text}>
                      Account
                    </span>
                  </Link>
                ) : (
                  <Link to="/form" className={css.btn}>
                    <span className={css.text}>
                      Login
                    </span>
                  </Link>
                )}
              </div>
              <div className={css.popover_content}>
                <ul className={`${css.dropdown} ${css.popover_message}`}>
                  <li>
                    <Link to='/todo'> My Profile </Link> 
                  </li>
                  <li> 
                    <Link to='/todo'> Todo List </Link> 
                  </li>
                  <li> 
                    <Link to='/' onClick={userLogout}> Logout </Link> 
                  </li>
                </ul>
              </div>
          </div>
        </li>
      </ul>
      <div className={css.menu} onClick={() => setIsSidebarOpen(true)}>
        <CgMenu />
      </div>
    </nav>
  );
}

export default Navbar;
