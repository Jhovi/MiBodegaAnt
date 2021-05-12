import React from 'react';
import Axios from "axios";
import { Table, Modal, Button, Input, Form, Checkbox, TreeSelect } from 'antd';


const { useState, useEffect } = React;



export const AdmProducto = () => {

    useEffect(() => {
        getData();

    }, [])

    const [productos, setProductos] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);    
    const columns = [
        {
            title: 'Codigo del producto',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Nombre',
            dataIndex: 'nombre',
            key: 'nombre',
        },
        {
            title: 'Descripcion',
            dataIndex: 'descripcion',
            key: 'descripcion',
        },
        {
            title: 'Precio',
            dataIndex: 'precio',
            key: 'precio',
        },
        {
            title: 'Estado',
            dataIndex: 'estado',
            key: 'estado',
        },
        {
            title: 'Stock',
            dataIndex: 'stock',
            key: 'stock',
        },
        {
            title: 'Editar',
            key: 'editar',
            render: (text, record) => (
                <Button type="primary" htmlType="submit">
                    Editar
                </Button>
            ),
        },
    ];

    const getData = () => {
        Axios.get('Producto').then(
            res => {
                setProductos(res.data)

            },
            err => {
                console.log(err);
            }
        )
    }

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };   

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    const tailLayout = {
        wrapperCol: { offset: 20, span: 16 },
    };

    const onFinish = (values) => {

            const data = {
                nombre: values.nombre,
                descripcion: values.descripcion,
                precio: values.precio,
                categoriaId: values.categoria,
                estado : "valido",
                stock: values.stock
            }

            Axios.post('Producto', data).then(
                res => {
                    console.log(res);
                }
            ).catch(
                err => {
                    console.log(err)
                }
            )
        setIsModalVisible(false);
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (

        <div style={{ margin: 'auto' }}>
            <h1>Listado de productos</h1>

            <Button style={{ marginBottom: '1.5rem' }} onClick={showModal} id="add-products" type="primary" >
                Registrar producto
            </Button>

            <div >
                <Table style={{ width: 1200 }} dataSource={productos} columns={columns} />
            </div>

            <Modal title="Crear producto" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={[]}>
                <Form
                    {...layout}
                    name="basic"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Nombre"
                        name="nombre"
                        rules={[{ required: true, message: 'Ingresa un nombre al producto!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Descripcion"
                        name="descripcion"
                        rules={[{ required: true, message: 'Ingresa una descripción al producto!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Precio"
                        name="precio"
                        rules={[{ required: true, message: 'Ingresa un precio al producto!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item label="TreeSelect" name = "categoria">
                        <TreeSelect defaultValue = "8"
                            treeData={[
                                {title: 'Whisky', value: '1'},
                                {title: 'Ron', value: '2'},
                                {title: 'Cerveza', value: '3'},
                                {title: 'Vino', value: '4'},
                                {title: 'Vodka', value: '5'},
                                {title: 'Tequila', value: '6'},
                                {title: 'Piqueos', value: '7'},
                                { title: 'Otros', value: '8'}
                            ]}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Stock"
                        name="stock"
                        rules={[{ required: true, message: 'Ingresa un stock al producto!' }]}
                    >
                        <Input />
                    </Form.Item>


                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>




            </Modal>

        </div>

    )
}


