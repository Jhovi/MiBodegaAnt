import React from 'react';
import { Form, Input, Button, Checkbox, DatePicker, Radio } from 'antd';
import Axios from "axios";
import { useHistory } from "react-router-dom";
import moment from "moment";

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
export const EditUsuario = () => {
    const { useState, useEffect } = React;
    const [value, setValue] = React.useState();
    const [fechaSelected, setFechaSelected] = React.useState(null);

    const fechaChange = (date, dateString) => {
        setFechaSelected(dateString);
    }

    const onChange = e => {
        setValue(e.target.value);
    };

    const history = useHistory();
    const [form] = Form.useForm();

    const [usuario, setUsuario] = useState({});

    useEffect(() => {
        const url = window.location.href.split('/');
        const id = url[url.length - 1]
        getData(id);

        //Tambien sirve este get asincrono
        /*async function getUsers() {
           const response = await Axios.get('Usuario/' + id);
           setUsuario(response.data);
        }
        getUsers();*/
    }, [])

    const getData = (id) => {
        Axios.get('Usuario/' + id).then(
            res => {
                setUsuario(res.data)
                setValue(res.data.genero)
                setFechaSelected(moment(res.data.fechaNacimiento).format('MM/DD/YYYY'))
                form.setFieldsValue({
                    nombre: res.data.nombre,
                    apellido: res.data.apellido,
                    correo: res.data.correo,
                    telefono: res.data.telefono,
                    dni: res.data.dni,
                    id: res.data.id,
                    fechaNacimiento: moment(res.data.fechaNacimiento)
                });
            }
        ).catch(
            err => {
                console.log(err)
            }
        )
    }

    const saveUsuario = () => {
        history.push("/save-usuario");
    };


    const onFinish = values => {
        setFechaSelected(moment(values.fechaNacimiento).format('MM/DD/YYYY'));

        const data = {
            id: values.id,
            nombre: values.nombre,
            apellido: values.apellido,
            correo: values.correo,
            fechaNacimiento: fechaSelected,
            dni: values.dni,
            genero: value,
            telefono: values.telefono
        }

        Axios.put('Usuario', data).then(
            res => {
                history.push("/adm-usuarios");
            }
        ).catch(
            err => {
                console.log(err)
            }
        )
    }

    const onFinishFailed = errorInfo => {

    }


    return (
        <div >
            <h1 style={{ marginLeft: '30rem' }}>Editar usuario</h1>

            <Button style={{ marginBottom: '1.5rem', marginLeft: '30rem' }} onClick={saveUsuario} type="primary" htmlType="submit">
                Guardar
        </Button>

            <div style={{ marginLeft: '18.8rem', marginBottom: '1rem' }} >
                <label style={{ marginRight: '0.8rem' }} required >Genero:</label>
                <Radio.Group onChange={onChange}  value={value}>
                    <Radio value={0}>Masculino</Radio>
                    <Radio value={1}>Femenino</Radio>
                    <Radio value={2}>Incognito</Radio>
                </Radio.Group>
            </div>

            <Form
                {...layout}
                name="basic"
                initialValues={{
                    remember: true,
                }}
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >

                <Form.Item hidden="true"
                    label="id"
                    name="id"

                >
                    <Input />
                </Form.Item>
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


                <Form.Item name="fechaNacimiento" label="Fecha Nacimiento">
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


                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
    </Button>
                </Form.Item>
            </Form>
        </div>
    )

}




