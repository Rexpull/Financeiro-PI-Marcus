import React from 'react'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import Header from '../../Component/Header/index';
import DaftarMhs from './TableCP';
import BotaoAdd from './AddModal';


function ContasPagar () {
    return (
        <div>
            <Header/>
            <BotaoAdd/>
            <DaftarMhs/>
        </div>
    )
}

export default ContasPagar