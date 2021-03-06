import Axios from 'axios';
import React, { Component } from 'react';
import Datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Bar, Pie } from 'react-chartjs-2';


class Graficos extends Component {

    constructor() {
        super();
        this.state = {
            pieChartData: {},
            barChartData: {},
            fechaDesde: '',
            fechaHasta: ''

        }
    }

    componentDidMount() {
        this.getChartData();

    }

    getChartData() {

        Axios.get('Boleta/FetchTop5Customers').then(
            res => {
                var labelsToChart = [];
                var totalToChart = [];
                for (var i = 0; i < res.data.length; i++) {
                    labelsToChart.push(res.data[i].nombre);
                    totalToChart.push(res.data[i].total);
                }
                this.setState({
                    pieChartData: {
                        labels: labelsToChart,
                        datasets: [
                            {
                                label: 'Nombre clientes',
                                data: totalToChart,
                                backgroundColor: [
                                    'rgba(255,99,132,0.6)',
                                    'rgba(54,162,235,0.6)',
                                    'rgba(255,206,86,0.6)',
                                    'rgba(75,192,192,0.6)',
                                    'rgba(153,102,255,0.6)',
                                ]
                            }
                        ]
                    }
                })
            }, err => {
                console.log(err)
            })
    }

    onChangeDateDesde = (fecha) => {

        var d = new Date(fecha);
        var curr_date = d.getDate();
        var curr_month = d.getMonth() + 1;
        var curr_year = d.getFullYear();
        var fechaDesdeParsed = curr_date + "/" + curr_month + "/" + curr_year;

        this.setState({
            fechaDesde: fecha,
            fechaToServiceDesde: fechaDesdeParsed
        })

        Axios.get('Boleta/FetchTop5Products?inicio=' + fechaDesdeParsed + "&fin=" + this.state.fechaToServiceHasta).then(
            res => {
                console.log(res.data)
                var labelsToChart = [];
                var totalToChart = [];
                for (var i = 0; i < res.data.length; i++) {
                    labelsToChart.push(res.data[i].nombre);
                    totalToChart.push(res.data[i].cantidad);
                }
                this.setState({
                    barChartData: {
                        labels: labelsToChart,
                        datasets: [
                            {
                                label: 'Cantidad',
                                data: totalToChart,
                                backgroundColor: [
                                    'rgba(255,150,99,0.6)',
                                    'rgba(54,82,130,0.6)',
                                    'rgba(53,206,30,0.6)',
                                    'rgba(250,10,100,0.6)',
                                    'rgba(153,102,255,0.6)',
                                ]
                            }
                        ]
                    }
                })
            }, err => {
                console.log(err);
            }
        )



    }

    onChangeDateHasta = (fecha) => {

        var fechaToServiceHasta = fecha.toLocaleDateString('en-US')

        var d = new Date(fecha);
        var curr_date = d.getDate();
        var curr_month = d.getMonth() + 1;
        var curr_year = d.getFullYear();
        var fechaHastaParsed = curr_date + "/" + curr_month + "/" + curr_year;

        this.setState({
            fechaHasta: fecha,
            fechaToServiceHasta: fechaHastaParsed
        })

        Axios.get('Boleta/FetchTop5Products?inicio=' + this.state.fechaToServiceDesde + "&fin=" + fechaHastaParsed).then(
            res => {
                var labelsToChart = [];
                var totalToChart = [];
                for (var i = 0; i < res.data.length; i++) {
                    labelsToChart.push(res.data[i].nombre);
                    totalToChart.push(res.data[i].cantidad);
                }
                this.setState({
                    barChartData: {
                        labels: labelsToChart,
                        datasets: [
                            {
                                label: 'Cantidad',
                                data: totalToChart,
                                backgroundColor: [
                                    'rgba(255,150,99,0.6)',
                                    'rgba(54,82,130,0.6)',
                                    'rgba(53,206,30,0.6)',
                                    'rgba(250,10,100,0.6)',
                                    'rgba(153,102,255,0.6)',
                                ]
                            }
                        ]
                    }
                })
            }, err => {
                console.log(err);
            }
        )
    }

    render() {
        return (

            <div className="adm-card" >
                <h1>Gasto de clientes mas frecuentes</h1>
                <Pie className="chart" width={100}
                    height={100}
                    options={{ maintainAspectRatio: false }}
                    data={this.state.pieChartData}
                    options={{
                        title: {
                            display: true,

                            fontSize: 20
                        },
                        legend: {
                            display: false,
                            position: 'bottom'
                        }
                    }}
                />
                <br></br>

                <h1>Promedio de productos mas vendidos</h1>
                <Bar height="100px"
                    data={this.state.barChartData}
                    options={{
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        },
                        title: {
                            display: true,
                            text: 'Promedio de productos mas vendidos',
                            fontSize: 20
                        },
                        legend: {
                            display: false,
                            position: 'bottom'
                        }
                    }}
                />

                <label>Seleccione intervalo de fechas</label>
                <div className="date-desde">
                    <div className="form-group ml-5">
                        <label>Fecha desde</label>
                        <Datepicker className="form-control ml-4" selected={this.state.fechaDesde} onChange={e => this.onChangeDateDesde(e)} dateFormat='dd/MM/yyyy'
                            showYearDropdown scrollableMonthYearDropdown />
                    </div>
                    <div className="form-group ">
                        <label className="ml-5">Fecha hasta</label>
                        <Datepicker className="form-control ml-4" selected={this.state.fechaHasta} onChange={this.onChangeDateHasta} dateFormat='dd/MM/yyyy'
                            showYearDropdown scrollableMonthYearDropdown />
                    </div>
                </div>
            </div>
        )
    }
}

export default Graficos;
