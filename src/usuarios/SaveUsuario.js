import React from 'react';
import { Form, Input, Button, Checkbox, DatePicker, InputNumber, Radio } from 'antd';
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

const dateFormatList = 'MM/DD/YYYY';

export const SaveUsuario = () => {

    const [value, setValue] = React.useState();
    const [fechaSelected, setFechaSelected] = React.useState(null);

    const fechaChange = (date, dateString) => {
        setFechaSelected(dateString);
    }

    const onChange = e => {
        setValue(e.target.value);
    };


    const onFinish = values => {

        if (values.password == values.confirmPassword) {
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
        }
        console.log('Success:', values);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div>
            <h1 style={{ marginLeft: '18.8rem' }}>Registrar Usuario</h1>
            <Form
                {...layout}
                name="basic"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <div style={{ marginLeft: '18.8rem', marginBottom: '1rem' }} >
                    <label style={{ marginRight: '0.8rem' }} required >Genero:</label>
                    <Radio.Group onChange={onChange} value={value}>
                        <Radio value={0}>Masculino</Radio>
                        <Radio value={1}>Femenino</Radio>
                        <Radio value={2}>Incognito</Radio>
                    </Radio.Group>
                </div>
                <Form.Item
                    label="Nombre"
                    name="nombre"
                    rules={[
                        {
                            required: true,
                            message: 'Ingrese su nombre',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Apellido"
                    name="apellido"
                    rules={[
                        {
                            required: true,
                            message: 'Ingrese su apellido',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item  label="Fecha Nacimiento">
                    <DatePicker onChange={fechaChange} format={dateFormatList} />
                </Form.Item>

                <Form.Item
                    label="Correo"
                    name="correo"
                    rules={[
                        {
                            required: true,
                            message: 'Ingrese su correo',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Telefono"
                    name="telefono"
                    rules={[
                        {
                            required: true,
                            message: 'Ingrese su telefono',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Dni"
                    name="dni"
                    rules={[
                        {
                            required: true,
                            message: 'Ingrese su dni',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>


                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Ingrese contraseña valida',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>


                <Form.Item
                    label="Confirm Password"
                    name="confirmPassword"
                    rules={[
                        {
                            required: true,
                            message: 'Ingrese contraseña valida',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}


