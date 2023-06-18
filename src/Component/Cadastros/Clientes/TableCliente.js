import React, { useState, useEffect } from 'react';
import API from '../../../axios/Api_Cliente';
import NotFound from "../../../Pages/img/114398-no-transaction-history.gif";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  TableSortLabel,
  TablePagination
} from '@mui/material';



const TableCliente = () => {
    const [mhs, setMhs] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [ search, setSearch] = useState('');
    const [orderBy, setOrderBy] = useState('');
    const [order, setOrder] = useState('asc');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = async () => {
      await API.get('/viewdata.php').then((response) => {
        setMhs(response.data);
        setFilteredData(response.data);
      });
    };
  
    const handleSearchChange = (event) => {
      const { value } = event.target;
      setSearch(value);
      filterData(value);
    };
  
    const filterData = (searchValue) => {
      const filteredData = mhs.filter(
        (mhs) =>
          mhs.id_cliente.toLowerCase().includes(searchValue.toLowerCase()) ||
          mhs.nome.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredData(filteredData);
    };
  
    const handleSort = (property) => {
      const newOrder = orderBy === property && order === 'asc' ? 'desc' : 'asc';
      setOrderBy(property);
      setOrder(newOrder);
      sortData();
    };
  
    const sortData = () => {
      const sortedData = filteredData.sort((a, b) => {
        const aValue = a[orderBy];
        const bValue = b[orderBy];
  
        if (aValue && bValue) {
          if (order === 'asc') {
            return aValue.localeCompare(bValue);
          } else {
            return bValue.localeCompare(aValue);
          }
        } else {
          return 0; // Handle cases where the orderBy property is undefined
        }
      });
  
      setFilteredData([...sortedData]);
    };
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedData = filteredData.slice(startIndex, endIndex);
  
    const stripeRow = (index) => {
      return index % 2 === 1 ? 'table-row-stripe' : '';
    };
  
    const renderData = paginatedData.map((mhs, index) => {
      return (
        <TableCliente mhs={mhs} key={mhs.id} refresh={fetchData} stripeRow={stripeRow} index={index} />
      );
    });
  
    const noRecordsMessage = (
      <TableRow>
        <TableCell colSpan={6} align="center">
          <div className='notFound'>
            <img src={NotFound} alt='Não encontrado'/>
            Nenhum registro encontrado.
          </div>
        </TableCell>
      </TableRow>
    );

return (
<div className="container3" style={{ marginTop: '20px' }}>
      <div className="row">
        <div className="col-lg-12  tabela">
          <div className='div-header'>
            <TextField 
              id="search"
              label="Pesquisar"
              variant="outlined"
              onChange={handleSearchChange}
              style={{ marginBottom: '10px' }}
            />
            <h1>Cadastro de Clientes</h1>
            <span></span>
          </div>
          <Table className='white'>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'id_cliente'}
                    direction={order}
                    onClick={() => handleSort('id_cliente')}
                  >
                    <span className="cabecalho">ID</span>
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'nome'}
                    direction={order}
                    onClick={() => handleSort('nome')}
                  >
                    <span className="cabecalho">Nome</span>
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                    <span className="cabecalho">CPF/CNPJ</span>
                </TableCell>
                <TableCell>
                    <span className="cabecalho">Email</span>
                </TableCell>
                <TableCell>
                    <span className="cabecalho">Contato</span>
                </TableCell>
                <TableCell>
                  <span className="cabecalho">Bloqueado</span>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{renderData.length > 0 ? renderData : noRecordsMessage}</TableBody>
          </Table>

          <TablePagination className='white'
            rowsPerPageOptions={[10, 20, 30]}
            component="div"
            count={filteredData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </div>
    </div>


  );
};

export default TableCliente;