import React, { useState, useRef, useEffect  } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import API from '../../axios/Api_CR';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faForward, faCheck, faBackward, faTrash, faMoneyBillWave, faPlus, faMinus, faEquals} from '@fortawesome/free-solid-svg-icons';
import { faPix } from '@fortawesome/free-brands-svg-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, isValid } from 'date-fns';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import NotFound from '../../Pages/img/114398-no-transaction-history.gif'

function ReceiveModal({ show, handleClose, formData, handleChange, handleSubmit, registroData, refresh }) {
  const [section, setSection] = useState('recebimento');
  const { cliente, num_docto, valor, dt_lancamento, situacao, dt_vencimento, id, multa, juros, desconto, observacao } = registroData;
  const [formasPagamento, setFormasPagamento] = useState([]);
  const [valorRestante, setValorRestante] = useState(parseFloat(valor) || 0); // Valor restante inicial é igual ao valor do documento
  const isValorRestanteZero = valorRestante === 0;
  const [pagamentoConfirmado, setPagamentoConfirmado] = useState(null);
  const [temPagamentosMultiplos, setTemPagamentosMultiplos] = useState(false);

  const atualizarValorRestante = () => {
    const somaPagamentos = formasPagamento.reduce((total, pagamento) => total + pagamento.valor, 0);
    setValorRestante(valor - somaPagamentos);
  };

  useEffect(() => {
    atualizarValorRestante();
  }, [formasPagamento]);
  
  const [receiveSnackbarOpen, setReceiveSnackbarOpen] = useState(false);
  const dateRef = useRef(null);

  const handleNextSection = () => {
    setSection('formaPagamento');
  };
  
  const handleNextSectionConfirma = () => {
    setSection('confirmacao');
  };

  const handlePreviousSectionConfirma = () => {
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

  const getFormaQuitacaoIcon = (forma) => {
    switch (forma) {
      case 'Dinheiro':
        return <FontAwesomeIcon icon={faMoneyBillWave} />;
      case 'PIX':
        return <FontAwesomeIcon icon={faPix} />;
      default:
        return null;
    }
  };

  const adicionarFormaPagamento = () => {
    const novoValorRecebido = parseFloat(formData.valor_recebido);
    const somaPagamentos = formasPagamento.reduce((total, pagamento) => total + pagamento.valor, 0);
    const novoValorRestante = valor - (somaPagamentos + novoValorRecebido);
    const novaFormaQuitacao = formData.forma_quitacao;
    const temPagamentosDiferentes = formasPagamento.some(pagamento => pagamento.forma !== novaFormaQuitacao);
    setTemPagamentosMultiplos(temPagamentosDiferentes);

    
    if (novoValorRestante >= 0) {
      const novaFormaPagamento = {
        forma: formData.forma_quitacao,
        data: formData.data_recebimento,
        valor: novoValorRecebido
      };

      setFormasPagamento([...formasPagamento, novaFormaPagamento]);

      // Atualizar o valor restante
      setValorRestante(novoValorRestante);

      // Limpar os campos após adicionar
      handleChange({ target: { name: 'forma_quitacao', value: '' } });
      handleChange({ target: { name: 'data_recebimento', value: null } });
      handleChange({ target: { name: 'valor_recebido', value: '' } });
    } else {
      console.log('O valor total dos pagamentos não pode exceder o valor do documento');
    }

    if (formasPagamento.length === 0 && novoValorRecebido > 0) {
      handleNextSection(); // Ativar a próxima seção se não houver registros
    }
  };

  
  const handleDeleteFormaPagamento = (index) => {
    const pagamentoRemovido = formasPagamento[index];
    const novoValorRestante = valorRestante + pagamentoRemovido.valor;
  
    setFormasPagamento((prevFormasPagamento) => {
      const updatedFormasPagamento = [...prevFormasPagamento];
      updatedFormasPagamento.splice(index, 1);
  
      // Atualizar o valor restante
      setValorRestante(novoValorRestante);
  
      return updatedFormasPagamento;
    });
  };
  

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
    
  const valorRecebido = temPagamentosMultiplos ? "Varias" : parseFloat(formData.valor_recebido);
  console.log(formData.valor_recebido)

const data = {
  id: id,
  multa: formData.multa,
  juros: formData.juros,
  desconto: formData.desconto,
  observacao: formData.observacao,
  forma_quitacao: formData.forma_quitacao,
  valor_recebido: isNaN(valorRecebido) ? null : valorRecebido,
  dt_recebimento: formData.data_recebimento ? format(formData.data_recebimento, 'yyyy-MM-dd') : '',
};

  const dataPayment = {
    id: id,
    forma_quitacao: formData.forma_quitacao,
    valor_recebido: isNaN(valorRecebido) ? null : valorRecebido,
    dt_recebimento: formData.data_recebimento 
  }

    setPagamentoConfirmado(dataPayment); // Atualiza o estado com os dados de pagamento confirmados

  
    // Envia a requisição para o backend
    try {
      const response = await API.post('paymhs.php', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log(response.data);

      handleClose();

      
    } catch (error) {
      console.log(error);
    }
  
    // Feche o modal após enviar os dados
    showReceiveSnackbar();
    handleClose();
  };
  
  useEffect(() => {
    const enviarDadosParaAPI = async () => {
      if (pagamentoConfirmado) {
        try {
          const response = await API.post('payregistermhs.php', pagamentoConfirmado, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
  
          console.log(response.data);
  
          handleClose();
        } catch (error) {
          console.log(error);
        }
  
        showReceiveSnackbar();
      }
    };
  
    enviarDadosParaAPI();
  }, [pagamentoConfirmado]);

  

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
                <Form.Label className='valor-restante'>
                  <div>
                    Valor <span className="required-add">*</span> 
                  </div>
                    <small>(R$ {valorRestante.toFixed(2)})</small>
                  
                </Form.Label>
                <Form.Control
                  type="text"
                  name="valor_recebido"
                  value={formData.valor_recebido}
                  onChange={handleValorRecebidoChange}
                  onKeyDown={handleValorRecebidoKeyDown}
                  placeholder={valorRestante.toFixed(2)}
                />
              </Form.Group>
              <Form.Group className='pagamento-child' controlId="dataRecebimento">
                <Form.Label>Data Recebimento <span className="required-add">*</span></Form.Label>
                <DatePicker
                  className="form-control"
                  value={formData.data_recebimento}
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
            <Form.Group>
            <Button
              variant={isValorRestanteZero ? "success" : "primary"}
              onClick={adicionarFormaPagamento}
              disabled={!formData.forma_quitacao || !formData.valor_recebido || !formData.data_recebimento || isValorRestanteZero}
            >
              {isValorRestanteZero ? "Documento Pago" : "Adicionar forma de pagamento"}
            </Button>

            </Form.Group>
            </Form>
            <span style={{borderRight: '1px solid #dee2e6'}}></span> {/* Linha de separação */}
            {formasPagamento.length === 0 ? (
               <container className='rightSide-payment'>
                  <h1>Lista de Pagamentos</h1>
                  <img style={{width: '150px',height: '150px', }} src={NotFound} alt="Nenhum registro encontrado" />
                  <p>Pagamentos não encontrados.</p>
                </container>
              ) : (
              <container className='rightSide-payment'>
                <h1>Lista de Pagamentos</h1>
                <table className="table table-payment">
                  <thead>
                    <tr>
                      <th>Forma</th>
                      <th>Data</th>
                      <th>Valor</th>
                      <th></th> {/* Add an empty header cell for the delete icon */}
                    </tr>
                  </thead>
                  <tbody>
                    {formasPagamento.map((forma, index) => (
                      <tr key={index}>
                        <td style={{
                          color:
                            forma.forma === 'Dinheiro'
                              ? '#1b5e20'
                              : forma.forma === 'PIX'
                              ? 'orange'
                              : '',
                          textShadow:
                          forma.forma === 'Dinheiro'
                              ? '0px 10px 14px -7px #1b5e20'
                              : forma.forma === 'PIX'
                              ? '0px 10px 13px -7px #b56f05'
                              : ''
                        }}>{getFormaQuitacaoIcon(forma.forma)} {forma.forma}</td>
                        <td>{format(forma.data, 'dd/MM/yyyy')}</td>
                        <td>{forma.valor.toFixed(2)}</td>
                        <td>
                          <FontAwesomeIcon
                            icon={faTrash}
                            id="Delete-payment-icon"
                            onClick={() => handleDeleteFormaPagamento(index)} // Add onClick event handler for delete
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </container>
            )}

          
          </div>
        )} {section === 'confirmacao' && (
          <div className="registro-info-confirmacao">
            <div className='confirm-payment-section'>
              <div className='confirm-payment-div'>
                <div className='column-payment'>
                  <div className='row-payment'>
                    <span><FontAwesomeIcon icon={faPlus} style={{color: 'green'}}/> Valor do Documento: </span>
                    <span className='row-payment-value'>R$ {valor}</span>
                  </div>
                  <div className='row-payment'>
                    <span><FontAwesomeIcon icon={faPlus} style={{color: 'green'}}/> Juros: </span>
                    <span className='row-payment-value'>R$ {juros}</span>
                  </div>
                  <div className='row-payment'>
                    <span><FontAwesomeIcon icon={faPlus} style={{color: 'green' }}/> Multa: </span>
                    <span className='row-payment-value'>R$ {multa}</span>
                  </div>
                  <div className='row-payment '>
                    <span><FontAwesomeIcon icon={faMinus} style={{color: 'red'}}/> Desconto: </span>
                    <span className='row-payment-value'>R$ {desconto}</span>
                  </div>
                  <div className='row-payment'>
                    <span><FontAwesomeIcon icon={faEquals} style={{color: 'orange'}}/> Total do Documento: </span>
                    <span className='row-payment-value'>R$ {valor + juros + multa - desconto}</span>
                  </div>
                  <div className='row-payment row-total'>
                    <span><FontAwesomeIcon icon={faMoneyBillWave} />Total dos Pagamentos:</span>
                    <span className='row-payment-value'>R$ {valorRestante.toFixed(2)}</span>
                  </div>
                </div>
              </div>
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
            
          </div>
        )}

      </Modal.Body>
      <Modal.Footer>
      {section === 'formaPagamento' && (
        <>
          <Button variant="outline-secondary" onClick={handlePreviousSection} className='btn-footer'> 
            <FontAwesomeIcon icon={faBackward} /> Voltar
          </Button>
              <>
                {formasPagamento.length > 0 ? (
                  <Button variant="primary" onClick={handleNextSectionConfirma} className='btn-next2'>
                    Próximo <FontAwesomeIcon icon={faForward} className="receive" />
                  </Button>
                ) : (
                  <Button variant="primary" disabled className='pagamento-disabled btn-next2'>
                    Próximo <FontAwesomeIcon icon={faForward} className="receive" />
                  </Button>
                )}
              </>
        </>
      )}
        {section === 'recebimento' && (
          <Button variant="primary" onClick={handleNextSection} className='btn-next'>
            Próximo <FontAwesomeIcon icon={faForward} className="fa-icon-forward" />
          </Button>
        )}
        {section === 'confirmacao' && (
        <>
          <Button variant="outline-secondary" onClick={handlePreviousSectionConfirma} className='btn-footer'> 
            <FontAwesomeIcon icon={faBackward} /> Voltar
          </Button>
          <Button variant="primary" onClick={handleFormSubmit} className='pagamento-button'>
              Confirmar <FontAwesomeIcon icon={faCheck} className="receive" />
          </Button>
        </>
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
