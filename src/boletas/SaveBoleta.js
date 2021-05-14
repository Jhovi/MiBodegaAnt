import React from 'react';
import { Form, Input, Button, Checkbox, DatePicker, InputNumber, Radio, Modal } from 'antd';
import Axios from "axios";
import { Table, Tag, Space } from 'antd';
import { useHistory } from "react-router-dom";

//SIEMPRE SE PONE ESTO PARA QUE NO SE CAIGA EL SITE
const { useState, useEffect } = React;


//ESTILOS PARA FORMULARIOS
const layout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 10,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 6,
        span: 16,
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

const columns_productos = [
    {
        title: 'Producto',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Cantidad',
        dataIndex: 'cantidad',
        key: 'cantidad',
    },
    {
        title: 'Precio',
        dataIndex: 'precio',
        key: 'precio',
    },
    {
        title: 'Subtotal',
        dataIndex: 'subtotal',
        key: 'subtotal',
    },
];

const dateFormatList = 'MM/DD/YYYY';

export const SaveBoleta = () => {

    const [value, setValue] = React.useState();
    const [fechaSelected, setFechaSelected] = React.useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [usuarios, setUsuarios] = useState([]);
    const [tableproducts, settableproducts] = useState([]);
    const [form] = Form.useForm();

    const fechaChange = (date, dateString) => {
        setFechaSelected(dateString);

    }


    const onFinish = values => {


        const data = {
            nombre: values.nombre,
            apellido: values.apellido,
            correo: values.correo,
            fechaNacimiento: fechaSelected,
            dni: values.dni,
            genero: value,
            telefono: values.telefono,
            password: values.password
        }

        Axios.post('Usuario/register', data).then(
            res => {
                console.log(res);
            }
        ).catch(
            err => {
                console.log(err)
            }
        )

        console.log('Success:', values);
    }; 

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    const showModal = () => {


        Axios.get('Usuario/').then(
            res => {
                setUsuarios(res.data);
            }
        ).catch(
            err => {
                console.log(err)
            }
        )

        setIsModalVisible(true);
    };

    return (
        <div>
            <h1 style={{ marginLeft: '18.8rem' }}>Registrar Boleta</h1>
            <Form
                {...layout}
                name="basic"
                form={form}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >

                <Form.Item
                    onClick={showModal}
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

                <Modal title="Escoja al usuario" visible={isModalVisible} footer={[]}>
                    <div >
                        <Table
                            style={{ width: 1200 }}
                            dataSource={usuarios}
                            columns={columns}
                            onRow={(r) => ({
                                onClick: () => {
                                    form.setFieldsValue({
                                        nombre_usuario: r.nombre                                  
                                    });                                    
                                    setIsModalVisible(false);

                                }
                            })} />
                    </div>

                </Modal>

                <Form.Item label="Fecha Nacimiento">
                    <DatePicker onChange={fechaChange} format={dateFormatList} />
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
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Detalles producto"
                >
                    <Button  id="add-products" type="primary" >
                        Agregar
                    </Button>
                </Form.Item>

                <Form.Item style={{ marginLeft: '30rem' }}>
                    <Table style={{ width: 1400 }} dataSource={tableproducts} columns={columns_productos} />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Registrar boleta
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}


