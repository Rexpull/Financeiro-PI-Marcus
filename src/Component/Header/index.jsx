import React, { useState, useEffect } from 'react';
import Logo from '../Icons/Logo.png';
import Usuario from '../../Pages/img/Quintal_logo.png';
import { Container } from './styles';
import { FaBars } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faLock, faChevronDown, faCheck, faBell , faTriangleExclamation} from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '../Header/index.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { Link } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Modal, Button, Form } from 'react-bootstrap';

const Header = () => {
  const [sidebar, setSidebar] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [badgeContent, setBadgeContent] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');

  const handleOpenModal = () => {
    setShowModal(true);
    console.log('ABRIU!')
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveChanges = () => {
    if (newPassword !== confirmPassword) {
      setPasswordError('As senhas não coincidem.');
    } else {
      // Lógica para salvar as alterações da senha
      setShowModal(false);
    }
  };


  const fetchBadgeContent = () => {
    // Replace the fictitious API call with your actual backend code to fetch the badge value
    fetch('http://localhost/reactjs-mhs/dashboard/badge.php')
      .then(response => response.json())
      .then(data => {
        setBadgeContent(data.total);
      })
      .catch(error => {
        console.error('Error fetching badge value from backend:', error);
      });
  };

  const fetchNotifications = () => {
    // Replace the fictitious API call with your actual backend code to fetch notifications
    fetch('http://localhost/reactjs-mhs/dashboard/notifyMessage.php')
      .then(response => response.json())
      .then(data => {
        setNotifications(data.notifications);
      })
      .catch(error => {
        console.error('Error fetching notifications from backend:', error);
      });
  };

  useEffect(() => {
    fetchBadgeContent();
    fetchNotifications();
  }, []);

  const handleNotificationClick = (notification) => {
    // Logic to handle click on a specific notification
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <Container>
      <div className="teste">
        <span></span>
        <div>
          <Link to="/home">
            <img src={Logo} alt="Company Logo" />
          </Link>
        </div>

        <div className="icons">
          <div className="dropdown-center">
            <div className="nav-user">
              <div className="n2">
                <button
                  type="button"
                  onClick={() => setNotificationOpen(true)}
                  className="d-flex align-items-center"
                >
                  <Badge
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    className="badge"
                    badgeContent={badgeContent}
                    color="warning"
                    overlap="circular"
                  >
                    <FontAwesomeIcon icon={faBell} className="sino" />
                  </Badge>
                </button>
              </div>
              <Menu
                anchorEl={anchorEl}
                open={notificationOpen}
                onClose={() => setNotificationOpen(false)}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                className="custom-menu" // Add this custom CSS class to the Menu component
              >
                {notifications.map((notification) => (
                  <MenuItem
                    className='notifi-item'
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification)}
                  >
                   
                    <FontAwesomeIcon icon={faTriangleExclamation}  style={{marginRight:'5px', width:'15px',height:'15px' ,
                  color:
                  notification.tipo === 'CR'
                    ? 'green'
                    : notification.tipo === 'CP'
                    ? 'orange'
                    : ''}}
                    />
                    {` O documento ${notification.num_docto} do ${
                      notification.tipo === 'CR' ? 'cliente' : 'fornecedor' 
                    } ${notification.cliente} `}
                    {`está vencendo hoje! Valor de R$ ${notification.valor}`}
                   
                  </MenuItem>
                ))}
              </Menu>

              <Menu
                className="dropdown"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleOpenModal} className="dropdown-child">
                  <FontAwesomeIcon icon={faLock} /> Alterar senha
                </MenuItem>
                <MenuItem
                  component={Link}
                    to="/" // ajuste o caminho para o diretório correto
                    onClick={handleClose}
                    className="dropdown-child"
>
                    <FontAwesomeIcon icon={faRightFromBracket} rotation={180} /> Log Out
                </MenuItem>
              </Menu>
            </div>
          </div>
          <div className="dropdown-center">
            <div className="nav-user">
              <div className="p-container">
                <button
                  type="button"
                  onClick={handleClick}
                  className="d-flex align-items-center"
                >
                  <div className="d-flex-child">
                    <Badge
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      className="badge"
                      badgeContent={<FontAwesomeIcon icon={faCheck} />}
                      color="success"
                      overlap="circular"
                    >
                      <img src={Usuario} alt="User" className="me-2" />
                    </Badge>
                    <div className="d-user">
                      <p
                        style={{ marginBottom: '0', fontWeight: '700' }}
                      >
                        <b>Quintal Bar</b>
                      </p>
                      <small style={{ marginBottom: '0' }}>
                        Administrator
                      </small>
                    </div>
                  </div>
                  <FontAwesomeIcon
                    className="seta"
                    icon={faChevronDown}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>


  <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Alterar Senha</Modal.Title>
        </Modal.Header>
  <Modal.Body>
  <Form>
    <Form.Group controlId="currentPassword">
      <Form.Label>Senha Atual: <span className="required-add">*</span></Form.Label>
      <Form.Control
        type="password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        required
      />
    </Form.Group>

    <Form.Group controlId="newPassword">
      <Form.Label>Nova Senha: <span className="required-add">*</span></Form.Label>
      <Form.Control
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
      />
    </Form.Group>

    <Form.Group controlId="confirmPassword">
      <Form.Label>Confirmar Senha: <span className="required-add">*</span></Form.Label>
      <Form.Control
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
    </Form.Group>

    {passwordError && <div className="error-message">{passwordError}</div>}
  </Form>
</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSaveChanges}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
      
      <FaBars onClick={showSidebar} />
      {sidebar && <Sidebar active={setSidebar} />}
    </Container>
  );
};

export default Header;
