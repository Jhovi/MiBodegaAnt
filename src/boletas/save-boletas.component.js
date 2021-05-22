import Axios from "axios";
import { Component } from "react";
import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Redirect } from "react-router-dom";
import '../App.css';
import { Form, Input, Button, Checkbox, DatePicker, InputNumber, Radio, Modal, Table } from 'antd';

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

const columns_add_productos = [
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Producto',
        dataIndex: 'nombre',
        key: 'nombre',
    },
    {
        title: 'Precio',
        dataIndex: 'precio',
        key: 'precio',
    },
    {
        title: 'Stock',
        dataIndex: 'stock',
        key: 'stock',
    },
];

const dateFormatList = 'MM/DD/YYYY';
var fecha = '';
var test = [];

export default class SaveBoleta extends Component {

    state = {
        subtotales: [],
        detalleproducto: [],
        IsModalVisible: false,
        ModalVisible: false

    }
    formRef = React.createRef();



    onFinish = () => {

        
        const data = {
            UsuarioId: this.state.selectedusuario,
            Fecha: fecha,
            Direccion: this.direccion,
            DetalleBoleta: this.state.detalleproducto            
        }

        Axios.post('Boleta', data).then(
            res => {
                this.setState({ goBackToAdmProducto: true })
            }
        ).catch(
            err => {
                console.log(err)
            }
        )                 

        //console.log('Success:', values);
    };

    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    showModal = () => {


        this.setState({
            fecha: test
        })

        Axios.get('Usuario').then(
            res => {
                this.setUsers(res.data)
            },
            err => {
                console.log(err);
            }
        )
        this.setState({
            IsModalVisible: true
        })
    };

    setUsers = users => {
        this.setState({
            users: users
        })
    }

    onChange(date, dateString) {
        fecha = dateString

    }

    mostrarModal = () => {

        Axios.get('Producto/').then(
            res => {
                this.setProducts(res.data);
            }
        ).catch(
            err => {
                console.log(err)
            }
        )

        this.setState({
            ModalVisible: true
        })

    };

    setProducts = products => {

        this.setState({
            products: products
        })
    }

    agregarcantidad(cantidad, producto, indice) {
        var idproducto = producto.id
        var detalle = { ProductoId: idproducto, Cantidad: cantidad }

        var index = this.state.detalleproducto.findIndex((value) => {
            return value.ProductoId == producto.id
        })
        var det = this.state.detalleproducto

        if (index == -1) {
            det.push(detalle)
        }
        else {
            det[index].Cantidad = cantidad
        }

        var test = this.state.subtotales
        test[indice] = cantidad * producto.precio
        this.setState({
            subtotales: test,
            detalleproducto: det
        })
        console.log(this.state.detalleproducto)

    }




    render() {

        if (this.state.goBackToAdmProducto) {
            return <Redirect to={'/adm-boletas'} />
        }

        return (
            <div>
                <h1 style={{ marginLeft: '18.8rem' }}>Registrar Boleta</h1>
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

                    <Form.Item label="Fecha">
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
                        <Button id="add-products" type="primary" onClick={this.mostrarModal} >
                            Agregar
                    </Button>
                    </Form.Item>

                    <Modal title="Escoja el producto" visible={this.state.ModalVisible} footer={[]}>
                        <div >
                            <Table
                                style={{ width: 1200 }}
                                dataSource={this.state.products}
                                columns={columns_add_productos}
                                onRow={(r) => ({
                                    onClick: () => {
                                        test.push(r)

                                        this.setState({
                                            ModalVisible: false,
                                            Saveproducts: test
                                        })
                                        console.log(this.state.Saveproducts)

                                    }
                                })} />
                        </div>
                    </Modal>
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
                        {this.state.Saveproducts && this.state.Saveproducts.map((product, index) => {
                            return (
                                <tr key={index}>
                                    <td>{product.nombre}</td>
                                    <td><input type="number" className="form-control" onChange={e => this.agregarcantidad(e.target.value, product, index)} placeholder="Cantidad" /></td>
                                    <td>{product.precio}</td>
                                    <td>{this.state.subtotales[index]}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <Button type="primary" onClick= {this.onFinish} style={{ marginLeft: '1130px', marginTop: '30px'}}>
                    Registrar boleta
                </Button>
            </div>
        )
    }
}
