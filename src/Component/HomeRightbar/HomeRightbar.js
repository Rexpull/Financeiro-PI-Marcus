import React from 'react';
import "./homerightbar.css"
import { Cell, PieChart, Pie, ComposedChart, Bar, BarChart, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';
import API from '../../axios/Api_Dashboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCaretDown, faCaretUp ,faChartLine, faFolderOpen, faThumbsUp, faCalendarDays} from '@fortawesome/free-solid-svg-icons';


export default function HomeRightbar() {
  const [mesAtual, setMesAtual] = React.useState('');
  const [mesAnterior, setMesAnterior] = React.useState('');
  const [totalPieValue, setTotalPieValue] = React.useState(0);
  const [previousMonthCount, setPreviousMonthCount] = React.useState(0);

  React.useEffect(() => {
    // Fetch the previous month count from the API or use the prop value if passed from the parent component
    setPreviousMonthCount(2); // Replace with the actual value from the API or prop
    console.log(mesAnterior);
    // Calculate the percentage change
    const percentageChange = ((totalPieValue - previousMonthCount) / previousMonthCount) * 100;
   
    // Display the percentage change
    const displayPercentageChange = percentageChange > 0 ? `+${percentageChange.toFixed(2)}%` : `${percentageChange.toFixed(2)}%`;
    
    // Update the text
    const thumbsUpText = document.querySelector('.pieChartText');
    thumbsUpText.innerHTML = "<FontAwesomeIcon icon={faThumbsUp} /> " + displayPercentageChange + " Mais notinhas que o mês anterior";
  }, [totalPieValue, previousMonthCount]);
  
  
 
  const [data1, setData1] = React.useState([]);
  React.useEffect(() => {
    API.get('http://localhost/reactjs-mhs/dashboard/data1.php')
      .then(response => {
        const responseData = response.data;
        const data1 = responseData.map(item => ({
          dia: item.name,
          valor: item.cp,

        }));
        setData1(data1);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const [data2, setData2] = React.useState([]);
  React.useEffect(() => {
    API.get('http://localhost/reactjs-mhs/dashboard/data2.php')
      .then(response => {
        const responseData = response.data;
        const data2 = responseData.map(item => ({
          dia: item.name,
          valor: item.cr,

        }));
        setData2(data2);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const [data3, setData3] = React.useState([]);
  React.useEffect(() => {
    API.get('http://localhost/reactjs-mhs/dashboard/data3.php')
      .then(response => {
        const responseData = response.data;
        const data3 = responseData.map(item => ({
          name: item.name,
          CP: item.cp,
          CR: item.cr,

        }));
        setData3(data3);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const [data4, setData4] = React.useState([]);
  React.useEffect(() => {
    API.get('http://localhost/reactjs-mhs/dashboard/data4.php')
      .then(response => {
        const responseData = response.data;
        const data4 = responseData.map(item => ({
          name: item.name,
          Contas_pagar: item.cp,
          Contas_receber: item.cr,

        }));
        setData4(data4);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const [data6, setData6] = React.useState([]);
  React.useEffect(() => {
    API.get('http://localhost/reactjs-mhs/dashboard/data6.php')
      .then(response => {
        const responseData = response.data;
        const data6 = responseData.map(item => ({
          name: item.name,
          Contas_pagar: item.cp,
          Contas_receber: item.cr,
          
        }));
        setData6(data6);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

 // ...

 const [data7, setData7] = React.useState([]);
 React.useEffect(() => {
  API.get('http://localhost/reactjs-mhs/dashboard/data7.php')
    .then(response => {
      const responseData = response.data;
      const data7 = responseData.map(item => ({
        mes: item.mes,
        name: item.name,
        value: parseInt(item.value),
        color: item.color,
        mes_anterior: item.anterior,
      }));
      setData7(data7);

      // Calcular a soma de todos os valores do gráfico de pizza
      const sumPieValues = data7.reduce((total, item) => total + item.value, 0);
      setTotalPieValue(sumPieValues);

      // Obtenha o mês atual a partir dos dados da API
      const mesAtual = responseData.length > 0 ? responseData[0].mes : '';
      setMesAtual(mesAtual);
    })
    .catch(error => {
      console.log(error);
    });
}, []);

const [data7Previous, setData7Previous] = React.useState([]);
  React.useEffect(() => {
    API.get('http://localhost/reactjs-mhs/dashboard/data7-previous.php')
      .then(response => {
        const responseData = response.data;
        const data7Previous = responseData.map(item => ({
          anterior: item.anterior,
        }));
        setData7Previous(data7Previous);

        const mesAnterior = responseData.length > 0 ? responseData[0].mes : '';
      setMesAnterior(mesAnterior);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

 

// ...

  
  // Calcula a soma de todos os valores em data1
  const totalPayments = data1.reduce((total, item) => total + item.valor, 0);
  const totalReceives = data2.reduce((total, item) => total + item.valor, 0);


  return (
    <div className='mainHomeRightbar'>
      <div>
        <div className='ItemContainer'>
          <div className='ItemContainer1'>
            <div className='subitemContainer'>

              <div className='subitemContainer-up'>
                <p className='taskProgress'>Pagamentos <small>(em aberto)</small></p>
                <span className='box-pagar-semanal'>Semanal</span> 
              </div>
              <div className='subitemContainer-down'>
                <div className='subitemContainer-down-child'>
                  <p className='taskCounter'><FontAwesomeIcon style={{color:'red'}} icon={faCaretDown} /> R${totalPayments.toFixed(2)} </p>
                  <p className='currentmonth1'>Pagamentos para essa semana</p>
                </div>
                <div className='barchartContainer'>
                <BarChart width={265} height={130} data={data1} 
                  margin={{ right: 3, bottom: -14, top: 6 }}>
                    <Tooltip label={({ payload }) => payload[0]?.payload.dia} />
                    <Bar dataKey="valor" fill="orange" />
                    <XAxis dataKey="dia" height={14} />
                  </BarChart>
                </div>
              </div>
            </div>
          </div>
          <div className='ItemContainer1'>
            <div className='subitemContainer'>
              <div className='subitemContainer-up'>
                <p className='taskProgress'>Recebimentos <small>(em aberto)</small></p>
                <span className='box-pagar-semanal'>Semanal</span>
              </div>
              <div className='subitemContainer-down'>
                <div className='subitemContainer-down-child'>
                  <p className='taskCounter'><FontAwesomeIcon style={{color:'green'}} icon={faCaretUp} /> R${totalReceives.toFixed(2)}</p>
                  <p className='currentmonth1'>Recebimentos para essa semana</p>
                </div>
                <div className='barchartContainer'>
                  <BarChart width={265} height={130} data={data2} 
                  margin={{ right: 3, bottom: -14, top: 6 }}>
                    <Tooltip label={({ payload }) => payload[0]?.payload.dia} />
                    <Bar dataKey="valor" fill="#82ca9d" />
                    <XAxis dataKey="dia" height={14} />
                  </BarChart>
                </div>
              </div>
            </div>
          </div>
          <div className='ItemContainer1'>
            <div className='subitemContainer'>
              <div className='subitemContainer-up'>
                <p className='taskProgress'>Liquidados <small>(já recebidos ou pagos)</small></p>
                <span className='box-pagar-mensal'>Mensal</span>
              </div>
              <div className='subitemContainer-down'>
                <div className='barchartContainer2'>
                  <LineChart width={465} height={130} data={data3}
                    margin={{ top: 5, right:20, left:20, bottom: 4 }}>
                    <Tooltip />
                    <Line type="monotone" dataKey="CP" stroke="orange" />
                    <Line type="monotone" dataKey="CR" stroke="#82ca9d" />
                    <XAxis dataKey="name" />
                  </LineChart>
                </div>
              </div>
            </div>
          </div>



          <div className='MiddleTaskChart'>
            <div className='head-vencido'>
              <span className='head-vencido-child'></span>
              <p className='vencido_h1'>Vencimentos <small>(contas vencidas)</small></p>
              <span className='box-pagar-mensal mensal-right' >Mensal</span>
            </div>

            <AreaChart width={1450} height={190} data={data4}
              margin={{ top: 10, right: 5, left: 5, bottom: 10 }}>
              <defs>
                <linearGradient id="colorCp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ed6c02" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#ed6c02" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorCr" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#209f50" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#209f50" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="Contas_pagar" stroke="#ef5350" fillOpacity={1} fill="url(#colorCp)" />
              <Area type="monotone" dataKey="Contas_receber" stroke="#209f50" fillOpacity={1} fill="url(#colorCr)" />
            </AreaChart>
            <section className='TaskCreated'>
                <div className='vencido-info'>
                  <span className='box-pagar-small' ><FontAwesomeIcon icon={faChartLine} /></span> <small>à Pagar</small> 
                </div>
                <div className='vencido-info'>
                  <span className='box-receber-small'><FontAwesomeIcon icon={faChartLine} /></span>  
                  <small> à Receber</small>
                </div>
              </section>
          </div>


          <div className='TasksContainer'>
            <div className='TaskChart'>
              <div className='qnt_cr'>
                <p className='taskContainerText1'>Contas a Receber <small>(em quantidade)</small></p>
                <span className='box-pagar-mensal mensal-right' >Mensal</span>
              </div>
              <section className='taskPie'>
                <div className='task'>
                  <p className='taskText'><FontAwesomeIcon style={{color:'green'}} icon={faFolderOpen} /> {totalPieValue}</p>
                  <small className='taskRegister'>Registros</small>
                </div>
                <div className='heightPie'>
                  <PieChart width={325} height={110}>
                    <Pie
                      data={data7}
                      cx={155}
                      cy={80}
                      startAngle={180}
                      endAngle={0}
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={0}
                      dataKey="value"
                      label={({ cx, cy, midAngle, innerRadius, outerRadius, value }) => {
                        const RADIAN = Math.PI / 180;
                        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                        const x = cx + radius * Math.cos(-midAngle * RADIAN);
                        const y = cy + radius * Math.sin(-midAngle * RADIAN);
                        return (
                          <text
                            x={x}
                            y={y}
                            fill="#fff"
                            textAnchor={x > cx ? "start" : "end"}
                            dominantBaseline="central"
                          >
                            {value}
                          </text>
                        );
                      }}
                    >
                      {
                        data7.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))
                      }
                    </Pie>
                  <Tooltip formatter={(value, name) => [value, name === "value" ? "Total" : name]} />
                </PieChart>
                
                </div>
              </section>    
              <div className='qnt_cr-down'>
                <div>
                  <small className='pieChartText'><FontAwesomeIcon icon={faThumbsUp} /> 8% Mais notinhas que o mês anterior</small>
                </div>
                <p className='actual-month box-month'>
                  <b><FontAwesomeIcon icon={faCalendarDays} /> {mesAtual}</b>
                </p>
              </div>
            </div>


            <div className='MonthlyEarning'>
            <div className='subitemContainer-up'>
                <p className='taskProgress'>Registro anual <small>(Contas à receber x Contas à pagar)</small></p>
                <span className='box-pagar-anual'>Anual</span>
              </div>
              <div className='chartDirection'>
                <ComposedChart width={970} height={190} data={data6}>
                
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <CartesianGrid stroke="#f5f5f5" />
                  
                  <Bar dataKey="Contas_pagar" barSize={20} fill="orange" />
                  <Line type="monotone" dataKey="Contas_receber" stroke="#ff7300" />
                </ComposedChart>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}