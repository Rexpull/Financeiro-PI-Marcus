import React from 'react';
import HomeRightbar from '../../Component/HomeRightbar/HomeRightbar';
import "./home.css"
import Header from '../../Component/Header/index.jsx';

export default function Home() {
 return (
   <div>
      <Header/>
    <div className='MainHomeContainer'>
        <HomeRightbar/>
    </div>
   </div>
 );
}