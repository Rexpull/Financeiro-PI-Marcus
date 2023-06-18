import React from 'react'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import Header from '../../../Component/Header/index';
import TableCliente from '../../Cadastros/Clientes/TableCliente';

function Cliente () {
    return (
        <div>
            <Header/>
            <TableCliente/>
        </div>
    )
}

export default Cliente