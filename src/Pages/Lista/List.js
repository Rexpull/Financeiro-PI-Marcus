import React from 'react';
import "./list.css";
import Sidebar from '../../Component/Sidebar';
import "./list.css";
import Register from "../../Component/Register";

export default function List() {
 return (
   <div className='teamContainer'>
        <Sidebar/>
        <Register/>
   </div>
 );
}