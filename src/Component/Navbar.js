import React from 'react';
import "./navbar.css";
import Notification from "../Component/Icons/notification.png";
import Search from "../Component/Icons/search.png";
import Profile from "../Component/Icons/perfil.png";

export default function Navbar() {
 return (
   <div className='MainNavbarContainer'>
        <div className='dashboardContainer'>

        </div>
        <div className='searchItemsContainer'>
            <img src={`${Search}`} className='searchIcon' alt=""/>
            <input className='searchInput' placeholder='Procurar' type="search"/>
        </div>
        <div className='profileItemsContainer'>
            <img src={`${Notification}`} className='NotificationIcon' alt=""/>
            <div className='profileItems'>
                <img src={`${Profile}`} className='ProfileIcon' alt=""/>
                <p className='profileName'>Quintal</p>
            </div>
        </div>
    </div>
 );
}