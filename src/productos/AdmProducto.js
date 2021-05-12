import React from 'react';
import Axios from "axios";
import { Table, Modal, Button, Input, Form, Checkbox, TreeSelect,message } from 'antd';


const { useState, useEffect } = React;



export const AdmProducto = () => {

    useEffect(() => {
        getData();       

    }, [])

    const [productos, setProductos] = useState([]);    
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [test, settest] = useState(false);
    const [form] = Form.useForm();    
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
            render: (producto) => (
                <Button type="primary" id="add-products" onClick={()=>{mostrarModal(producto)}} type="primary">
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

    const mostrarModal = (producto) => {
        settest(true);

        switch(producto.categoriaId) {
            case 1:
                producto.categoriaId = "Whisky";
              break;
            case 2:
                producto.categoriaId = "Ron";
              break;
            case 3:
                producto.categoriaId = "Cerveza";
              break;
            case 4:
                producto.categoriaId = "Vino";
              break;
            case 5:
                producto.categoriaId = "Vodka";
              break;
            case 6:
                producto.categoriaId = "Tequila";
              break;
            case 7:
                producto.categoriaId = "Piqueos";
              break;
            case 8:
                producto.categoriaId = "Otros";
              break; 
            default:
                // code block          
          }

        form.setFieldsValue({
            edit_id: producto.id,
            edit_nombre: producto.nombre,
            edit_descripcion: producto.descripcion,
            edit_precio: producto.precio,
            edit_categoria: producto.categoriaId,
            edit_estado: producto.estado,
            edit_stock: producto.stock
        });       
    };

    const manejarOK = () => {
        settest(false);
    };

    const manejarelCancel = () => {
        settest(false);
    }; 

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
                    getData();
                    message.success('Se creó el producto correctamente');
                }
            ).catch(
                err => {
                    message.error('Se presento un error, intentelo luego');
                }
            )
        setIsModalVisible(false);
        console.log('Success:', values);
    };

    const terminar = (values) => {

        switch(values.edit_categoria) {
            case "Whisky":
                values.edit_categoria = 1;
              break;
            case "Ron":
                values.edit_categoria = 2;
              break;
            case "Cerveza":
                values.edit_categoria = 3;
              break;
            case "Vino":
                values.edit_categoria = 4;
              break;
            case "Vodka":
                values.edit_categoria = 5;
              break;
            case "Tequila":
                values.edit_categoria = 6;
              break;
            case "Piqueos":
                values.edit_categoria = 7;
              break;
            case "Otros":
                values.edit_categoria = 8;
              break; 
            default:
                // code block          
          }


        const data = {  
            id: values.edit_id,          
            nombre: values.edit_nombre,
            descripcion: values.edit_descripcion,
            precio: values.edit_precio,
            categoriaId: values.edit_categoria,
            estado : values.edit_estado,
            stock: values.edit_stock
        }        

        Axios.put('Producto', data).then(
            res => {
                getData();
                message.success('Se editó el producto correctamente');
            }
        ).catch(
            err => {
                message.error('Se presento un error, intentelo luego');
            }
        )
    settest(false);    
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

                    <Form.Item label="Categoria" name = "categoria">
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

            <Modal title="Editar producto" visible={test} onOk={manejarOK} onCancel={manejarelCancel} footer={[]}>
                <Form
                    {...layout}
                    name="basic"
                    onFinish={terminar}
                    onFinishFailed={onFinishFailed}
                    form={form}
                >
                    <Form.Item
                        label="Id"
                        name="edit_id"                        
                        hidden = "true"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Nombre"
                        name="edit_nombre"                        
                        rules={[{ required: true, message: 'Ingresa un nombre al producto!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Descripcion"
                        name="edit_descripcion"
                        rules={[{ required: true, message: 'Ingresa una descripción al producto!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Precio"
                        name="edit_precio"
                        rules={[{ required: true, message: 'Ingresa un precio al producto!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item label="Categoria" name = "edit_categoria">
                        <TreeSelect 
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
                        label="Estado"
                        name="edit_estado"
                        rules={[{ required: true, message: 'Ingresa un estado al producto!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Stock"
                        name="edit_stock"
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


