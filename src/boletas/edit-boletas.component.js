import Axios from "axios";
import { Component } from "react";
import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Redirect } from "react-router-dom";
import '../App.css';
import { Form, Input, Button, Checkbox, DatePicker, InputNumber, Radio, Modal, Table, message } from 'antd';
import moment from "moment";

//ESTILOS PARA FORMULARIOS
const layout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 10,
    },
};

const columns = [
    {
        title: 'Codigo',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Nombre',
        dataIndex: 'nombre',
        key: 'nombre',

    },
    {
        title: 'Correo',
        dataIndex: 'correo',
        key: 'correo',
    },
    {
        title: 'Telefono',
        dataIndex: 'telefono',
        key: 'telefono',
    },
];

var boleta = [];
var hora_modificada = '';
const dateFormatList = 'MM/DD/YYYY';
export default class EditBoleta extends Component {


    state = {
        listaproductos: [], // tendra los productos de la boleta que se ha traido.   
        IsModalVisible: false,
        selectedusuario: []       
    }

    constructor(props) {
        super(props);

        this.miboleta = this.props.location.state.boleta.detalleBoleta
        this.misproductos = this.props.location.state.productos  
        this.direccion = this.props.location.state.boleta.direccion      
    }

    formRef = React.createRef();

    getData = (id) => {
        Axios.get('Boleta/' + id).then(
            res => {
                this.setState({
                    boleta: res.data,
                    fecha: res.data.fecha                    
                })               
                Axios.get('Usuario/' + this.state.boleta.usuarioId).then(
                    usuario => {
                        this.setState({
                            boleta_usuario: usuario.data,
                            selectedusuario: usuario.data.id                         
                        })
                        
                        this.formRef.current.setFieldsValue({
                            nombre_usuario: this.state.boleta_usuario.nombre + " " + this.state.boleta_usuario.apellido,
                            fecha_boleta: moment(this.state.boleta.fecha),
                            direccion: this.state.boleta.direccion,
                        })
                    },
                    err => {
                        console.log(err);
                    }
                )

            }
        ).catch(
            err => {
                console.log(err)
            }
        )
    }

    componentDidMount = () => {
        const url = window.location.href.split('/');
        const id = url[url.length - 1]
        this.getData(id);
        var test = []

        Axios.get('Usuario').then(
            res => {
                this.setUsers(res.data)
            },
            err => {
                console.log(err);
            }
        )

        this.props.location.state.boleta.detalleBoleta.forEach(element => {
            test.push({
                id: element.id, ProductoId: element.productoId, Cantidad: element.cantidad
            })
        });
        boleta = this.props.location.state.boleta;

        this.setState({
            listaproductos: test// aqui le estoy pasando el arreglo que contiene productid y la cantidad 
        })
    }

    setUsers = users => {
        this.setState({
            users: users
        })
    }

    showModal = () => {
       

        this.setState({
            IsModalVisible: true
        })
    };

    onChange(date, dateString) {
        hora_modificada = dateString
        
    }

    onFinish = () => {     

        if (hora_modificada == ""){
            hora_modificada = moment(this.state.fecha).format('MM/DD/YYYY')
        }                
    
        const data = {
            id: this.state.boleta.id,
            fecha: hora_modificada,
            UsuarioId: this.state.selectedusuario,
            Direccion: this.direccion,
            DetalleBoleta: this.state.listaproductos
        }
        
        Axios.put('Boleta', data).then(
            res => {
                message.success('Actualizacion con éxito');
                this.setState({ goBackToAdmBoleta: true })
            }
        ).catch(
            err => {
                console.log(err)
            }
        )

        
        

        
    };

    findproduct = id => {

        var producto;

        this.misproductos.map(element => {
            if (element.id == id) {
                producto = element;
            }
        })

        return producto;

    }

    agregarcantidad(cantidad, producto) {
        var idproducto = producto.id;

        var temp = this.state.listaproductos;

        var index = this.state.listaproductos.findIndex((value) => {
            return value.ProductoId == idproducto
        })
        if (index != -1)
            temp[index].Cantidad = parseInt(cantidad)


        var test = this.miboleta;

        test.map(element => {

            if (element.productoId == producto.id) {
                element.cantidad = cantidad;
                element.subtotal = cantidad * producto.precio
            }

        })
        this.setState({
            miboleta: test,
            listaproductos: temp
        })
    }

    render() {

        if (this.state.goBackToAdmBoleta) {
            return <Redirect to={'/adm-boletas'} />
        }

        return (
            <div>
                <h1 style={{ marginLeft: '18.8rem' }}>Editar Boleta</h1>
                <Form
                    {...layout}
                    name="basic"
                    ref={this.formRef}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}>

                    <Form.Item
                        onClick={this.showModal}
                        label="Seleccione usuario"
                        name="nombre_usuario"
                        rules={[
                            {
                                required: true,
                                message: 'Ingrese su nombre',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Modal title="Escoja al usuario" visible={this.state.IsModalVisible} footer={[]}>
                        <div >
                            <Table
                                style={{ width: 1200 }}
                                dataSource={this.state.users}
                                columns={columns}
                                onRow={(r) => ({
                                    onClick: () => {

                                        this.setState({
                                            selectedusuario: r.id
                                        })

                                        this.formRef.current.setFieldsValue({
                                            nombre_usuario: r.nombre + " " + r.apellido,
                                        });

                                        this.setState({
                                            IsModalVisible: false
                                        })

                                    }
                                })} />
                        </div>

                    </Modal>

                    <Form.Item label="Fecha" name="fecha_boleta">
                        <DatePicker onChange={this.onChange} format={dateFormatList} />
                    </Form.Item>

                    <Form.Item
                        label="Direccion"
                        name="direccion"
                        rules={[
                            {
                                required: true,
                                message: 'Ingrese la dirección',
                            },
                        ]}
                    >
                        <Input onChange={e => this.direccion = e.target.value} />
                    </Form.Item>

                    <Form.Item
                        label="Detalles producto"
                    >
                        <Button id="add-products" type="primary">
                            Agregar
                    </Button>
                    </Form.Item>                    
                </Form>
                <table style={{ marginLeft: '500px', width: '40%', textAlign: 'left', background: '#fff' }}>
                    <thead>
                        <tr>
                            <th scope="col">Producto</th>
                            <th scope="col">Cantidad</th>
                            <th scope="col">Precio</th>
                            <th scope="col">SubTotal</th>
                        </tr>
                    </thead>
                    <tbody style={{ background: 'white' }}>
                        {
                            this.miboleta.map((element, index) => {
                                return (
                                    <tr>
                                        <td>{this.findproduct(element.productoId).nombre}</td>
                                        <td><input type="number" className="form-control" placeholder="Cantidad"  onChange={e => this.agregarcantidad(e.target.value, this.findproduct(element.productoId))} defaultValue={element.cantidad}/></td>
                                        <td>{this.findproduct(element.productoId).precio}</td>
                                        <td>{element.subtotal}</td>
                                    </tr>
                                )

                            })
                        }
                    </tbody>
                </table>
                <Button type="primary"  onClick= {this.onFinish} style={{ marginLeft: '1130px', marginTop: '30px' }}>
                    Registrar boleta
                </Button>
            </div>
        )
    }
}
