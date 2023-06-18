import React from 'react'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import Header from '../Header/index';
import DaftarMhs from './TableCR';
import BotaoAdd from './AddModal';


function ContasReceber () {
    return (
        <div>
            <Header/>
            <BotaoAdd/>
            <DaftarMhs/>
        </div>
    )
}

export default ContasReceber