import React, { useState, useRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import API from '../../axios/Api_CR';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faForward, faCheck, faBackward } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, isValid } from 'date-fns';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

function ReceiveModal({ show, handleClose, formData, handleChange, handleSubmit, registroData, refresh }) {
  const [section, setSection] = useState('recebimento');
  const { cliente, num_docto, valor, dt_lancamento, situacao, dt_vencimento, id, multa, juros, desconto, observacao } = registroData;
  const [receiveSnackbarOpen, setReceiveSnackbarOpen] = useState(false);
  const dateRef = useRef(null);

  const handleNextSection = () => {
    setSection('formaPagamento');
  };
  const handlePreviousSection = () => {
    setSection('recebimento');
  };

  const handleReceiveSnackbarClose = () => {
    setReceiveSnackbarOpen(false);
  };
  const showReceiveSnackbar = () => {
    setReceiveSnackbarOpen(true);
  };

  function Transition(props) {
    return <Slide {...props} direction="right" />;
  }



  const handleValorRecebidoChange = (event) => {
    const valorRecebido = event.target.value.replace(',', '.');
    const parsedValue = parseFloat(valorRecebido);
  
    if (!isNaN(parsedValue) && parsedValue <= valor) {
      handleChange({
        target: {
          name: event.target.name,
          value: parsedValue.toFixed(2) // Arredonda para 2 casas decimais
        }
      });
    }
  };
  
  const handleDateChange = (name) => (date) => {
    if (isValidDate(date)) {
      handleChange({ target: { name, value: date } });
    } else {
      console.log('Data inválida');
    }
  };
  
  const handleFormSubmit = async (event) => {
    event.preventDefault();
  
     // Aqui você pode construir o objeto de dados que será enviado para o backend
    const data = {
      // Inclua os campos necessários para atualizar no banco de dados
      id: id,
      multa: multa,
      juros: juros,
      desconto: desconto,
      observacao: observacao,
      forma_quitacao: formData.forma_quitacao,
      valor_recebido: formData.valor_recebido,
      dt_recebimento: formData.data_recebimento ? format(formData.data_recebimento, 'yyyy-MM-dd') : '',
    };

   
  
    // Envia a requisição para o backend
    try {
      const response = await API.post('paymhs.php', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log(response.data);

      handleClose();
      
      window.location.reload();
      
    } catch (error) {
      console.log(error);
    }
  
    // Feche o modal após enviar os dados
    showReceiveSnackbar();
    handleClose();
  };
  
  

  const isValidDate = (date) => {
    return isValid(date);
  };

  const handleValorRecebidoKeyDown = (event) => {
    const charCode = event.which ? event.which : event.keyCode;
    const inputValue = event.target.value;
    const hasDecimalSeparator = inputValue.includes('.');
    const hasSelection = event.target.selectionStart !== event.target.selectionEnd;
    const isFirstDigit = event.target.selectionStart === 0 && inputValue.length === 1;
  
    if (
      (charCode !== 46 && charCode > 31 && (charCode < 48 || charCode > 57)) || // Não é número nem o ponto decimal
      (hasDecimalSeparator && charCode === 46 && !hasSelection) || // Já possui um ponto decimal e não há texto selecionado
      (isFirstDigit && charCode === 48 && !hasSelection) // É o primeiro dígito e é um zero, sem texto selecionado
    ) {
      event.preventDefault();
    }
  };
  

  return (
    <>
    <Modal show={show} onHide={handleClose} className="custom-modal">
      <Modal.Header>
        <Modal.Title>Recebimento</Modal.Title>
        <Button variant="link" className="close-btn" onClick={handleClose}>
          <FontAwesomeIcon icon={faTimes} className="fa-icon-xmark" />
        </Button>
      </Modal.Header>
      <Modal.Body>
        {section === 'recebimento' && (
          <div className="registro-info">
            <p>
              Cliente: <span><b>{cliente}</b></span>
            </p>
            <div className='registro-flex flex2'>
              <div>
                <p>
                  Documento: <span><b>{num_docto}</b></span>
                </p>
                <small className='small-liquida'>
                  Parcela: 1 de 1
                </small>
              </div>
              <div>
                <p>
                  Valor Documento: <span><b>{valor}</b></span>
                </p>
                  <small className='small-liquida'>
                    Data Lançamento: <span>{dt_lancamento}</span>
                  </small>
              </div>
              <div>
                <p>
                  Situação: <span className="situacao-info" style={{
                    backgroundColor:
                      situacao === 'Aberto'
                        ? '#348fe2'
                        : situacao === 'Vencido'
                          ? 'orange'
                          : situacao === 'Pago'
                            ? '#5cb85c'
                            : '',
                    boxShadow:
                      situacao === 'Aberto'
                        ? '0px 10px 14px -7px #0578dc'
                        : situacao === 'Vencido'
                          ? '0px 10px 13px -7px #b56f05'
                          : situacao === 'Pago'
                            ? '0px 10px 14px -7px #3e7327'
                            : ''
                  }}>{situacao}</span>
                </p>
                <small className='small-liquida'>
                  Data de vencimento: <span>{dt_vencimento}</span>
                </small>
              </div>
            </div>

            <Form className='liquida-primary' onSubmit={handleSubmit}>
              <div className="registro-flex">
                <div className="col">
                  <Form.Group controlId="multa">
                    <Form.Label>Multa R$</Form.Label>
                    <Form.Control
                      type="text"
                      name="multa"
                      value={formData.multa}
                      onChange={handleChange}
                      placeholder="0,00"
                    />
                  </Form.Group>
                </div>
                <div className="col">
                  <Form.Group controlId="juros">
                    <Form.Label>Juros R$</Form.Label>
                    <Form.Control
                      type="text"
                      name="juros"
                      value={formData.juros}
                      onChange={handleChange}
                      placeholder="0,00"
                    />
                  </Form.Group>
                </div>
                <div className="col">
                  <Form.Group controlId="desconto">
                    <Form.Label>Desconto R$</Form.Label>
                    <Form.Control
                      type="text"
                      name="desconto"
                      value={formData.desconto}
                      onChange={handleChange}
                      placeholder="0,00"
                    />
                  </Form.Group>
                </div>
              </div>
              <Form.Group className="mb-3" controlId="observacao">
                <Form.Label>Observação</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="observacao"
                  value={formData.observacao}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form>
          </div>
        )}

        {section === 'formaPagamento' && (
          <div className="registro-info-pagamento">
            <Form className='pagamento'>
            <Form.Group className='pagamento-child' controlId="formaQuitacao">
              <Form.Label>Método de Pagamento <span className="required-add">*</span></Form.Label>
              <Form.Control
                as="select"
                name="forma_quitacao"
                value={formData.forma_quitacao}
                onChange={handleChange}
                required
              >
                <option value="">Selecione</option>
                <option value="PIX">PIX</option>
                <option value="Dinheiro">Dinheiro</option>
              </Form.Control>
            </Form.Group>
              <Form.Group className='pagamento-child' controlId="valorRecebido">
                <Form.Label>Valor <span className="required-add">*</span></Form.Label>
                <Form.Control
                  type="text"
                  name="valor_recebido"
                  value={formData.valor_recebido}
                  onChange={handleValorRecebidoChange}
                  onKeyDown={handleValorRecebidoKeyDown}
                  placeholder={valor}
                  required
                />
              </Form.Group>
              <Form.Group className='pagamento-child' controlId="dataRecebimento">
                <Form.Label>Data Recebimento <span className="required-add">*</span></Form.Label>
                <DatePicker
                  className="form-control"
                  selected={formData.data_recebimento}
                  onChange={handleDateChange('data_recebimento')}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Selecione a data de recebimento"
                  showYearDropdown
                  scrollableYearDropdown
                  yearDropdownItemNumber={15}
                  ref={dateRef}
                  required
                />
            </Form.Group>
            </Form>
            <div className='registro-flex flex-pagamento'>
              <div>
                <p>
                  Documento: <span><b>{num_docto}</b></span>
                </p>
                <small className='small-liquida'>
                  Parcela: 1 de 1
                </small>
              </div>
              <div>
                <p>
                  Valor Documento: <span><b>{valor}</b></span>
                </p>
                  <small className='small-liquida'>
                    Data Lançamento: <span>{dt_lancamento}</span>
                  </small>
              </div>
              <div>
                <p>
                  Situação: <span className="situacao-info" style={{
                    backgroundColor:
                      situacao === 'Aberto'
                        ? '#348fe2'
                        : situacao === 'Vencido'
                          ? 'orange'
                          : situacao === 'Pago'
                            ? '#5cb85c'
                            : '',
                    boxShadow:
                      situacao === 'Aberto'
                        ? '0px 10px 14px -7px #0578dc'
                        : situacao === 'Vencido'
                          ? '0px 10px 13px -7px #b56f05'
                          : situacao === 'Pago'
                            ? '0px 10px 14px -7px #3e7327'
                            : ''
                  }}>{situacao}</span>
                </p>
                <small className='small-liquida'>
                  Data de vencimento: <span>{dt_vencimento}</span>
                </small>
              </div>
            </div>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        {section === 'formaPagamento' && (
           <>
           <Button variant="outline-secondary" onClick={handlePreviousSection}>
           <FontAwesomeIcon icon={faBackward} /> Voltar
           </Button>
           {formData.forma_quitacao && formData.valor_recebido && formData.data_recebimento ? (
             formData.valor_recebido !== 0 || formData.valor_recebido !== 0.00 ? (
               <Button variant="primary" onClick={handleFormSubmit} className='pagamento-button'>
                 Confirmar <FontAwesomeIcon icon={faCheck} className="receive" />
               </Button>
             ) : (
               <Button variant="primary" disabled className='pagamento-disabled pagamento-button'>
                 Confirmar <FontAwesomeIcon icon={faCheck} className="receive" />
               </Button>
             )
           ) : (
             <Button variant="primary" disabled className='pagamento-disabled pagamento-button'>
               Confirmar <FontAwesomeIcon icon={faCheck} className="receive" />
             </Button>
           )}
         </>
        )}
        {section === 'recebimento' && (
          <Button variant="primary" onClick={handleNextSection}>
            Próximo <FontAwesomeIcon icon={faForward} className="fa-icon-forward" />
          </Button>
        )}
      </Modal.Footer>
    </Modal>

      <Snackbar
      TransitionComponent={Transition}
      sx={{ color: 'white' }}
      maxSnack={3}
      open={receiveSnackbarOpen}
      autoHideDuration={3000}
      onClose={handleReceiveSnackbarClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
      <MuiAlert severity="success" sx={{ width: '100%', backgroundColor: '#4caf50', color: 'white' }}>
        Registro pago com sucesso!
      </MuiAlert>
      </Snackbar>
</>
  );
}

export default ReceiveModal;
