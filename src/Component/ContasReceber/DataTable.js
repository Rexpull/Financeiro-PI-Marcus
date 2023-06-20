import React, { useState } from 'react';
import API from '../../axios/Api_CR';
import { TableRow, TableCell } from '@mui/material';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFile,faMoneyBillWave,faCheck,faTrashCan,faPenToSquare,faArrowRightArrowLeft,faInfo} from '@fortawesome/free-solid-svg-icons';
import { faPix } from '@fortawesome/free-brands-svg-icons';
import '../../styles/index.css';
import EditModal from './EditModal';
import ReceiveModal from './PayModal.js';
import { format } from 'date-fns';
import InfoModal from './InfoModal';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';


function DataTable({ mhs, refresh }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showReceiveModal, setShowReceiveModal] = useState(false); // Add state for receive modal
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [deleteSnackbarOpen, setDeleteSnackbarOpen] = useState(false);
  const [estornarSnackbarOpen, setEstornarSnackbarOpen] = useState(false);
  const [editSnackbarOpen, setEditSnackbarOpen] = useState(false);


 

  const [editFormData, setEditFormData] = useState({
    id: mhs.id,
    num_docto: mhs.num_docto,
    cliente: mhs.cliente,
    dt_lancamento: mhs.dt_lancamento,
    dt_vencimento: mhs.dt_vencimento,
    valor: mhs.valor,
    observacao: mhs.observacao,
    multa: '',
    juros: '',
    desconto: '',
    forma_pagamento: '',
    valor_pagamento: '',
    data_pagamento: ''
  });
  const [receiveFormData, setReceiveFormData] = useState({}); // Add state for receive form data
  

  const handleDeleteSnackbarClose = () => {
    setDeleteSnackbarOpen(false);
  };

  const handleEstornarSnackbarClose = () => {
    setEstornarSnackbarOpen(false);
  };

  const handleEditSnackbarClose = () => {
    setEditSnackbarOpen(false);
  };
  

  const showDeleteSnackbar = () => {
    setDeleteSnackbarOpen(true);
  };

  const showEstornarSnackbar = () => {
    setEstornarSnackbarOpen(true);
  };

  const showEditSnackbar = () => {
    setEditSnackbarOpen(true);
  };

  
  

  const formatDate = (date) => {
    if (!date) {
      return '';
    }

    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return '';
    }

    const formattedDate = format(parsedDate, 'dd/MM/yyyy');
    return formattedDate;
  };

  const handleInfoModalShow = () => {
    setShowInfoModal(true);
  };

  const handleInfoModalClose = () => {
    setShowInfoModal(false);
  };




  const deleteConfirm = async () => {
    confirmAlert({
      title: 'Confirme a ação',
      message: 'Deseja excluir o documento: ' + mhs.num_docto + ' ?',
      buttons: [
        {
          className: 'confirm-delete',
          label: 'Deletar',
          onClick: async () => {
          
            await deleteMhs();
            showDeleteSnackbar();
            setTimeout(() => {
              refresh();
            
            }, 3000);
          }
        },
        {
          className: 'cancel-delete',
          label: 'Cancelar',
          onClick: () => {}
        }
      ]
    });
  };
  
  
  
  
  

  const estornarConfirm = () => {
    confirmAlert({
      title: 'Confirme a ação',
      message: 'Deseja estornar o documento: ' + mhs.num_docto + ' ?',
      buttons: [
        {
          className: 'confirm-estorno',
          label: 'Estornar',
          onClick: async () => {
            await estornarMhs();
            showEstornarSnackbar();
            
          }
        },
        {
          className: 'delete-estorno',
          label: 'Cancelar',
          onClick: () => {}
        }
      ]
    })
  }

  const deleteMhs = async () => {
    try {
      await API.delete('deletemhs.php?id=' + mhs.id);
      
    } catch (error) {
      console.log(error);
    }
  };
  
  

  const estornarMhs = async () => {
    console.log('ID:', mhs.id); // Verifique o valor do ID
    try {
      const response = await API.post(`estornomhs.php?id=${mhs.id}`);
      console.log(response.data); // Verifique a resposta recebida do servidor
      refresh(); 
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleEditModalShow = () => {
    setShowEditModal(true);
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
  };

  const handleEditFormChange = (e) => {
    e.persist();
    setEditFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleEditFormSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log('Dados enviados para o servidor:', editFormData);

      const response = await API.put(`editmhs.php`, JSON.stringify(editFormData), {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Resposta do servidor:', response.data);
      
      handleEditModalClose();
      showEditSnackbar();
      

    } catch (error) {
      console.log(error);
    }
    refresh();
  };

  const getFormaQuitacaoIcon = (formaQuitacao) => {
    switch (formaQuitacao) {
      case 'Dinheiro':
        return <FontAwesomeIcon icon={faMoneyBillWave} />;
      case 'PIX':
        return <FontAwesomeIcon icon={faPix} />;
      default:
        return null;
    }
  };
  
  function Transition(props) {
    return <Slide {...props} direction="right" />;
  }

  const handleReceiveModalShow = () => {
    setShowReceiveModal(true);
  };

  const handleReceiveModalClose = () => {
    setShowReceiveModal(false);
  };

  const handleReceiveFormChange = (e) => {
    const { name, value } = e.target;
    setReceiveFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };
  const handleReceiveFormSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log('Dados enviados para o servidor:', receiveFormData);


      handleReceiveModalClose();

      refresh(); // Update the table after receiving payment
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <TableRow className={`status`}>
      <TableCell className="sit-flex">
        <div className="document-info">
          <FontAwesomeIcon icon={faFile} className="document-icon" />
          {mhs.num_docto}
        </div>
        <div
          className="situacao-info"
          style={{
            backgroundColor:
              mhs.situacao === 'Aberto'
                ? '#348fe2'
                : mhs.situacao === 'Vencido'
                ? 'orange'
                : mhs.situacao === 'Pago'
                ? '#5cb85c'
                : '',
            boxShadow:
              mhs.situacao === 'Aberto'
                ? '0px 10px 14px -7px #0578dc'
                : mhs.situacao === 'Vencido'
                ? '0px 10px 13px -7px #b56f05'
                : mhs.situacao === 'Pago'
                ? '0px 10px 14px -7px #3e7327'
                : ''
          }}
        >
          {mhs.situacao}
        </div>
      </TableCell>

      <TableCell>{mhs.cliente}</TableCell>
      <TableCell>{formatDate(mhs.dt_lancamento)}</TableCell>
      <TableCell>
        <span className="style-vencimento">{formatDate(mhs.dt_vencimento)}</span>
      </TableCell>
      <TableCell>R${mhs.valor}</TableCell>
      <TableCell className="nav-recebimento">
        <div className="recebimento">
          <div className="recebimento-child">{formatDate(mhs.dt_recebimento)}</div>
          <div className="recebimento-child">R$ {mhs.valor_recebido}</div>
          <div
            className="recebimento-child "
            style={{
              color:
                mhs.forma_quitacao === 'Dinheiro'
                  ? '#1b5e20'
                  : mhs.forma_quitacao === 'PIX'
                  ? 'orange'
                  : '',
              textShadow:
                mhs.forma_quitacao === 'Dinheiro'
                  ? '0px 10px 14px -7px #1b5e20'
                  : mhs.forma_quitacao === 'PIX'
                  ? '0px 10px 13px -7px #b56f05'
                  : ''
            }}
          >
            {getFormaQuitacaoIcon(mhs.forma_quitacao)} {mhs.forma_quitacao}
          </div>
        </div>
      </TableCell>
      
      <TableCell className="action-icons">
      
      {mhs.situacao === 'Pago' ? (
        <>
          <FontAwesomeIcon icon={faInfo} className="info" id="Info-icon"  onClick={handleInfoModalShow}/>
        </>
      ) : (
        <>
          <FontAwesomeIcon icon={faPenToSquare} className='edit' id="Edit-icon" onClick={handleEditModalShow} />
        </>
      )}
        <FontAwesomeIcon icon={faTrashCan} className={`delete ${mhs.situacao === 'Pago' ? 'disabled' : ''}`} id="Delete-icon" onClick={deleteConfirm} />
        {mhs.situacao === 'Pago' ? (
    <>
      <FontAwesomeIcon icon={faArrowRightArrowLeft} className="estornar" id="Estornar-icon" onClick={estornarConfirm} />
    </>
  ) : (
    <>
      <FontAwesomeIcon icon={faCheck} className="receive" id="Receive-icon" onClick={handleReceiveModalShow} />
    </>
  )}
      </TableCell>
      
      </TableRow>
      
      <EditModal
        show={showEditModal}
        handleClose={handleEditModalClose}
        formData={editFormData}
        handleChange={handleEditFormChange}
        handleSubmit={handleEditFormSubmit}
      />

      {/* Receive Modal */}
      <ReceiveModal
        show={showReceiveModal}
        handleClose={handleReceiveModalClose}
        formData={receiveFormData}
        handleChange={handleReceiveFormChange}
        handleSubmit={handleReceiveFormSubmit}
        registroData={{
          id: mhs.id,
          cliente: mhs.cliente,
          num_docto: mhs.num_docto,
          valor: mhs.valor,
          dt_lancamento: mhs.dt_lancamento,
          situacao: mhs.situacao,
          dt_vencimento: mhs.dt_vencimento,
          multa: '',
          juros:'',
          observacao: mhs.observacao,
          desconto:''
        }}
      />
      
      <InfoModal 
      show={showInfoModal} 
      handleClose={handleInfoModalClose} 
      mhs={mhs}
       />


      

    

<Snackbar
        TransitionComponent={Transition}
        sx={{ color: 'white' }}
        maxSnack={3}
        open={deleteSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleDeleteSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <MuiAlert severity="success" sx={{ width: '100%', backgroundColor: '#ef5350', color: 'white' }}>
          Registro deletado com sucesso!
        </MuiAlert>
      </Snackbar>

      <Snackbar
        TransitionComponent={Transition}
        sx={{ color: 'white' }}
        maxSnack={3}
        open={estornarSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleEstornarSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <MuiAlert severity="success" sx={{ width: '100%', backgroundColor: '#ff9800', color: 'white' }}>
          Registro estornado com sucesso!
        </MuiAlert>
      </Snackbar>

      <Snackbar
        TransitionComponent={Transition}
        sx={{ color: 'white' }}
        maxSnack={3}
        open={editSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleEditSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <MuiAlert severity="success" sx={{ width: '100%', backgroundColor: '#03a9f4', color: 'white' }}>
          Registro editado com sucesso!
        </MuiAlert>
      </Snackbar>

          

  </>
  );
}

export default DataTable;






