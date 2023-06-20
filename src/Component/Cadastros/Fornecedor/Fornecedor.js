import React from 'react'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import Header from '../../../Component/Header/index'
import TableFornecedor from '../Fornecedor/TableFornecedor'
function Fornecedor () {
    return (
        <div>
            <Header/>
            <TableFornecedor />
        </div>
    )
}

export default Fornecedor