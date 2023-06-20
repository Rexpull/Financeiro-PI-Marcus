import React from "react";
import { Container, Content } from './styles.js';
import Logo from "../Icons/Logo.png";
import {
    FaTimes,
    FaHome,
    FaRegSun,
    FaRegFileAlt,
    FaSortAmountUp,
    FaSortAmountDownAlt,
    FaUserPlus,
    FaTruck
} from 'react-icons/fa';
import SidebarItem from '../SidebarItem/index.jsx';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

const Sidebar = ({ active }) => {
    const closeSidebar = () => {
        active(false)
    }

    return (
        
        <Container sidebar={active}> 
            <FaTimes onClick={closeSidebar} />
            <Content>
                <Link to={'/Home'} style={{textDecoration:'none'}}>
                    <SidebarItem  Icon={FaHome} Text="DashBoard"/>
                </Link>
                <Link to={"/ContasPagar"} style={{textDecoration:'none'}}>
                    <SidebarItem  Icon={FaSortAmountUp} Text="Contar à Pagar" />
                </Link >
                <Link to={"/ContasReceber"} style={{textDecoration:'none'}}>
                    <SidebarItem  Icon={FaSortAmountDownAlt} Text="Contas à Receber"/>
                </Link>
                <Link to={"/Cadastros/Cliente"} style={{textDecoration:'none'}}>
                    <SidebarItem  Icon={FaUserPlus} Text="Cliente"/>
                </Link>
                <Link to={"/Cadastros/Fornecedor"} style={{textDecoration:'none'}}>
                    <SidebarItem  Icon={FaTruck} Text="Fornecedor"/>
                </Link>
                <SidebarItem  Icon={FaRegFileAlt} Text="Relatórios"/>
                <SidebarItem  Icon={FaRegSun} Text="Configurações"/>

                <div className="logo-under" >
                    <img src={Logo} alt="Logo da empresa" style={{width: '120px' , paddingTop: '22%' }}/>
                </div> 
            </Content>
        </Container>
    )
}

export default Sidebar;
