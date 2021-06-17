import React, { useState, useEffect } from 'react';
import *  as FaIcons from "react-icons/fa";
import { Link, useHistory } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import "./Navbar.css"
import { IconContext } from 'react-icons';
import AuthService from '../Services/AuthenticationService';
import { NavDropdown } from 'react-bootstrap';

const Sidebar = props => {

    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    const [searchTerm, setSearchTerm] = useState(props.term);
    const [admin, setIsAdmin] = useState(null);
    let history = useHistory()
    const logOut = () => {
        AuthService.logout();
        history.push("/");
    }

    const handle = e =>{
        e.preventDefault();
        props.onChangeTerm(e.target.value);
        setSearchTerm(e.target.value);
    }

    const isAdmin = () => {

        if (localStorage.getItem("role") === "ROLE_ADMIN") {
            setIsAdmin(true);
        }
        else {
            setIsAdmin(false);
        }
    }
    useEffect(() => {
        isAdmin();
    });


    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>
                <div className='navbar fixed-top'>
                    {/* <Link to="#" className='menu-bars'>
                        <FaIcons.FaBars onClick={showSidebar} className = 'm-3' />
                    </Link> */}
                    <Link to="/dashboard" className='text-2xl icon-company'><FaIcons.FaTruckLoading /></Link>
                    <Link to="/dashboard" className='text-white ml-3'> My Inventory</Link>
                    <form className="form-inline mx-auto ">
                    <Link to ={`/results/${searchTerm}`}> 
                        <FaIcons.FaSearch className="text-white"  />
                        </Link>
                        <input className="form-control ml-2 " style={{ width: "500px" }} type="text" placeholder="Search"
                            aria-label="Search"  onChange = {(e)=>handle(e)} value = {searchTerm}/>
                    </form>

                    <NavDropdown title = "" style={{"fontSize": "25px"}}>
                        <NavDropdown.Item onClick={logOut}>Log out</NavDropdown.Item>
                    </NavDropdown>
                  

                </div>



                <nav className='nav-menu active'>
                    <ul className='nav-menu-items' onClick={showSidebar}>
                        <li className="navbar-toogle">
                            {/* <Link to='#' className='menu-bars'>
                                <AiIcons.AiOutlineClose />
                            </Link> */}
                        </li>
                        {SidebarData.map((item, index) => {
                            if (admin) {
                                return (
                                    <li key={index} className={item.cName}>
                                        <Link to={item.path}>
                                            {item.icon}
                                            <span>{item.title}</span>
                                        </Link>
                                    </li>
                                );
                            }
                            else {
                                if (item.title !== "Departments" && item.title !== "Employees") {
                                    if (item.title === "Products") {
                                        return (
                                            <li key={index} className={item.cName}>
                                                <Link to={`/departments/${localStorage.getItem("department")}/products`}>
                                                    {item.icon}
                                                    <span>{item.title}</span>
                                                </Link>
                                            </li>
                                        );
                                    }
                                    else if (item.title === "Pallets") {
                                        return (
                                            <li key={index} className={item.cName}>
                                                <Link to={`/departments/${localStorage.getItem("department")}/pallets`}>
                                                    {item.icon}
                                                    <span>{item.title}</span>
                                                </Link>
                                            </li>
                                        );
                                    }
                                    return (
                                        <li key={index} className={item.cName}>
                                            <Link to={item.path}>
                                                {item.icon}
                                                <span>{item.title}</span>
                                            </Link>
                                        </li>
                                    );
                                }
                                return null;
                            }

                        })}

                    </ul>
                </nav>

            </IconContext.Provider>
        </>
    )
}

export default Sidebar
