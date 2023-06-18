import React from 'react';
import "./Register.css";
import Navbar from "./Navbar";
import { DataGrid } from '@mui/x-data-grid';
import Lapis from '../Component/Icons/lapis.png';
import Modal from "react-modal";
import { useState } from "react";



export default function Register() {
Modal.setAppElement("#root")
const [modalIsOpen, setIsOpen] = useState(false);
function openModal() {
  setIsOpen(true);
}
function closeModal() {
  setIsOpen(false);
}

const columns = [
  { field: 'id', headerName: 'id', width: 110 },
  { field: 'date', headerName: 'data', width: 110},
  { field: 'firstName', headerName: 'Nome', width: 150 },
  { field: 'lastName', headerName: 'Descrição', width: 130 },

  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  {
    field: 'action',
    headerName: 'Alterar',
    width:130,
    renderCell:(params) =>{
      return(
        <div className='selectModal'>
          <button onClick={openModal} className='buttonModal'>
             <img src={`${Lapis}`} className='sidebaricons' alt=""/> 
          </button>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel='Teste'
            overlayClassName="modal-overlay"
            className="modal-content"
          >
            <h3>test teste</h3>

            <button onClick={closeModal}>Fechar</button>
          </Modal>
        </div>

      )
    }
  },
];

const rows = [
  { id: '1', date: '12/05/2023', firstName: 'Clara' , lastName: 'Notinha'},
  { id: '2', date: '12/05/2023', firstName: 'Marcus', lastName: 'Notinha'},
  { id: '3', date: '18/05/2023', firstName: 'Jeferson', lastName: 'Notinha'},
  { id: '4', date: '25/05/2023', firstName: 'Simas', lastName: 'Notinha'},
  { id: '5', date: '27/05/2023', firstName: 'Paula', lastName: 'Notinha'},
  { id: '6', date: '11/05/2023', firstName: 'Cleide', lastName: 'Notinha'},
  { id: '7', date: '08/05/2023', firstName: 'Ana', lastName: 'Notinha'},
  { id: '8', date: '21/06/2023', firstName: 'Frances', lastName: 'Notinha'},
  { id: '9', date: '15/04/2023', firstName: 'Roberto', lastName: 'Notinha'},
  { id: '10', date: '01/04/2023', firstName: 'Laura', lastName: 'Notinha'},
];

 return (
   <div className='TeamMembers'>
      <Navbar/>
      <div style={{ height: '100vh', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
   </div>
 );
}

