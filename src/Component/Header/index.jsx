import React, { useState } from 'react';
import Logo from '../Icons/Logo.png';
import Notificacao from '../Icons/Notificacao.png';
import Usuario from '../../Pages/img/Quintal_logo.png';
import { Container } from './styles';
import { FaBars } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faLock, faChevronDown, faCheck } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '../Header/index.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { Link } from 'react-router-dom';
import Badge from '@mui/material/Badge';

const Header = () => {
  const [sidebar, setSidebar] = useState(false)
  const showSidebar = () => setSidebar(!sidebar)

  return (
    <Container>
      <div className="teste" >
        <span></span>
        <div>
          <Link to="/">
            <img src={Logo} alt="Logo da empresa" />
          </Link>
        </div>

        <div className="icons">
        <div className="dropdown-center">
            <div className="nav-user">
              <div className="n2">
                <button type="button" data-bs-toggle="dropdown" className="d-flex align-items-center">
                  <img src={Notificacao} alt="Notificação" />
                </button>
              </div>
            </div>
          </div>
          <div className="dropdown-center">
             <div className="nav-user">
              <div className="p-container">
                <button type="button" data-bs-toggle="dropdown" className="d-flex align-items-center">
                  <div className='d-flex-child'>
                    <Badge  anchorOrigin={{vertical: 'bottom',horizontal: 'right', }} className="badge" badgeContent={<FontAwesomeIcon icon={faCheck} />} color="success" overlap="circular">
                        <img src={Usuario} alt="Usuário" className="me-2" />
                    </Badge>
                    <div style={{widht:'200px'}} className='d-user'>
                      <p style={{ marginBottom: '0', fontWeight: '700' }}> <b>Quintal Bar</b></p>
                      <small style={{ marginBottom: '0' }}>Administrador</small>
                    </div>
                  </div>
                  <FontAwesomeIcon className="seta" icon={faChevronDown} />
                </button>
                <div style={{widht:'500px !important'}} className='menu-config'>
                    <ul className="dropdown-menu" >
                    <li><a className="dropdown-item" href="/"><FontAwesomeIcon icon={faLock} /> Alterar Senha</a></li>
                        <li><a className="dropdown-item" href="/contasPagar"><FontAwesomeIcon icon={faRightFromBracket} rotation={180} /> Sair</a></li>
                        
                    </ul>
                </div>    
              </div>
            </div>
          </div>
          
        </div>
      </div>

      <FaBars onClick={showSidebar} />
      {sidebar && <Sidebar active={setSidebar} />}

        
    </Container>
  )
}

export default Header;
