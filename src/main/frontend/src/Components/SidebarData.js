import React from 'react';
import *  as FaIcons from "react-icons/fa";
import *  as AiIcons from "react-icons/ai";
import *  as IoIcons from "react-icons/io";

export const SidebarData = [
    
    {
        title: 'Dashboard',
        path: '/dashboard',
        icon: <AiIcons.AiOutlineDashboard />,
        cName: 'nav-text'
    },
    {
        title: 'Departments',
        path: '/departments',
        icon: <FaIcons.FaBuffer />,
        cName: 'nav-text'
    },
    {
        title: 'Employees',
        path: '/employees',
        icon: <IoIcons.IoMdPeople />,
        cName: 'nav-text'
    },
    {
        title: 'Products',
        path: '/products',
        icon: <FaIcons.FaCartPlus />,
        cName: 'nav-text'
    },
    {
        title: 'Pallets',
        path: '/pallets',
        icon: <FaIcons.FaPallet />,
        cName: 'nav-text'
    },
    {
        title: 'Settings',
        path: '/settings',
        icon: <FaIcons.FaCog />,
        cName: 'nav-text'
    },
]