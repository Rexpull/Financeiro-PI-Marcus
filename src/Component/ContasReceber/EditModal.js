import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function EditModal({ show, handleClose, formData, handleChange, handleSubmit }) {
  
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Editar Cadastro</Modal.Title>
        <Button variant="link" className="close-btn" onClick={handleClose}>
          <FontAwesomeIcon icon={faTimes} className="fa-icon-xmark" />
        </Button>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="num_docto">
            <Form.Label>Numero do Documento</Form.Label>
            <Form.Control
              type="text"
              name="num_docto"
              value={formData.num_docto}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="cliente">
            <Form.Label>Cliente</Form.Label>
            <Form.Control
              type="text"
              name="cliente"
              value={formData.cliente}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="dt_lancamento">
            <Form.Label>Data de Emissão</Form.Label>
            <Form.Control
              type="text"
              name="dt_lancamento"
              value={formData.dt_lancamento}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="dt_vencimento">
            <Form.Label>Data de Vencimento</Form.Label>
            <Form.Control
              type="text"
              name="dt_vencimento"
              value={formData.dt_vencimento}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="valor">
            <Form.Label>Valor</Form.Label>
            <Form.Control
              type="text"
              name="valor"
              value={formData.valor}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="observacao">
            <Form.Label>Observação </Form.Label>
            <Form.Control
              type="text"
              name="observacao"
              value={formData.observacao}
              onChange={handleChange}
            />
          </Form.Group>
          <Modal.Footer className="custom-footer">
            <Button variant="primary" type="submit">
              Salvar Alterações
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default EditModal;
