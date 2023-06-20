import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { faTimes, faFile, faInfo, faQuestion, faMoneyBillWave,faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons';
import { faPix } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tabs, Tab, Table, TableHead, TableBody, TableRow, TableCell, TableContainer } from '@material-ui/core';


const InfoModal = ({ show, handleClose, mhs }) => {
    const [activeTab, setActiveTab] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
    
  const getFormaQuitacaoIcon = (formaQuitacao) => {
    switch (formaQuitacao) {
      case 'Dinheiro':
        return <FontAwesomeIcon icon={faMoneyBillWave} />;
      case 'PIX':
        return <FontAwesomeIcon icon={faPix} />;
      case 'Varias':
        return <FontAwesomeIcon icon={faFileInvoiceDollar} />
      default:
        return null;
    }
  };
  
  return (
    <Modal show={show} onHide={handleClose} className="info-modal">
      <Modal.Header>
        <Modal.Title>
          <FontAwesomeIcon icon={faInfo} style={{ color: 'green', paddingRight: '5px', paddingLeft: '5px', fontSize: '30px' }} /> Informações
        </Modal.Title>
        <Button variant="link" className="close-btn" onClick={handleClose}>
          <FontAwesomeIcon icon={faTimes} className="fa-icon-xmark" />
        </Button>
        
      </Modal.Header>
      <Tabs value={activeTab} onChange={handleTabChange} indicatorColor="primary">
          <Tab label="Documento" />
          <Tab label="Pagamento" />
        </Tabs>
      <Modal.Body>
        

        {activeTab === 0 && (
          <div className='info-documento'>
            {/* Conteúdo do Tab "Documento" */}
            <div className="info-head">
              <h2>
                <FontAwesomeIcon icon={faFile} className="document-icon" />
                Documento: {mhs.num_docto}
              </h2>
              <p>Parcela 1 de 1</p>
            </div>
            <div className='registro-flex flex2'>
              <div className='info-up'>
                <div>
                  <p className='grey'>
                    <b>Data de Lançamento:</b>
                  </p>
                  <small className='small-liquida'>
                    <span>{mhs.dt_lancamento}</span>
                  </small>
                </div>
                <div>
                  <p className='grey'>
                    <b>Data de Vencimento:</b>
                  </p>
                  <small className='small-liquida'>
                    <span>{mhs.dt_vencimento}</span>
                  </small>
                </div>
              </div>
              <div className='info-up'>
                <div>
                  <p className='grey'>
                    <b>Usuario:</b>
                  </p>
                  <small className='small-liquida'>
                    <span>Administrador</span>
                  </small>
                </div>
                <div>
                  <p className='grey'>
                    <b>Fornecedor:</b>
                  </p>
                  <small className='small-liquida'>
                    <span>{mhs.fornecedor}</span>
                  </small>
                </div>
              </div>
            </div>
            <div className='info-head'>
              <h2>
                <FontAwesomeIcon icon={faQuestion} /> Situação:{' '}
                <span
                  className="situacao-info-modal"
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
                        : '',
                  }}
                >
                  {mhs.situacao}
                </span>
              </h2>
            </div>
            <container className='info-observacao'>
                <div className='observacao'>
                    <p className='grey-obs'>
                        <b>Observação:</b>
                    </p>
                    <small className='small-liquida'>
                        <span>{mhs.observacao || 'Sem observação'}</span>
                    </small>
                </div>
                <div className='registro-flex '>
                <div className='info-up'>
                    <div>
                    <p className='grey'>
                        <b>Valor:</b>
                    </p>
                    <small className='small-liquida'>
                        <span>R$ {mhs.valor}</span>
                    </small>
                    </div>
                    <div>
                    <p className='grey'>
                        <b>Desconto:</b>
                    </p>
                    <small className='small-liquida'>
                        <span>R$ {mhs.desconto}</span>
                    </small>
                    </div>
                </div>
                <div className='info-up'>
                    <div>
                    <p className='grey'>
                        <b>Juros:</b>
                    </p>
                    <small className='small-liquida'>
                        <span>R$ {mhs.juros}</span>
                    </small>
                    </div>
                    <div>
                    <p className='grey'>
                        <b>Multa:</b>
                    </p>
                    <small className='small-liquida'>
                        <span>R$ {mhs.multa}</span>
                    </small>
                    </div>
                </div>
                </div>
            </container>
          </div>
        )}

        {activeTab === 1 && (
        <div>
            {/* Conteúdo do Tab "Pagamento" */}
            {mhs &&(
            <TableContainer>
                <Table>
                <TableHead>
                    <TableRow>
                    <TableCell>Forma</TableCell>
                    <TableCell>Data</TableCell>
                    <TableCell>Valor</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                    <TableCell
            className="recebimento-child "
            style={{
              color:
                  mhs.forma_quitacao === 'Dinheiro'
                  ? '#1b5e20'
                  : mhs.forma_quitacao === 'PIX'
                  ? 'orange'
                  : mhs.forma_quitacao === 'Varias'
                  ? '#884A39'
                  : '',
              textShadow:
                mhs.forma_quitacao === 'Dinheiro'
                  ? '0px 10px 14px -7px #1b5e20'
                  : mhs.forma_quitacao === 'PIX'
                  ? '0px 10px 13px -7px #b56f05'
                  : mhs.forma_quitacao === 'Varias'
                  ? '0px 10px 13px -7px #2B2A4C'
                  : ''
            }}
          >
            {getFormaQuitacaoIcon(mhs.forma_quitacao)} {mhs.forma_quitacao}
          </TableCell>
                    <TableCell>{mhs.dt_recebimento}</TableCell>
                    <TableCell>{mhs.valor}</TableCell>
                    </TableRow>
                </TableBody>
                </Table>
            </TableContainer>
            )}
        </div>
        )}

      </Modal.Body>
    </Modal>
  );
};

export default InfoModal;



