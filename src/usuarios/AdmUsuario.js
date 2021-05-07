import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import Axios from "axios";
import { Table, Tag, Space } from 'antd';
import { useHistory } from "react-router-dom";

const { useState, useEffect } = React;



export const AdmUsuario = () => {

    const history = useHistory();

    useEffect(() => {
        getData();
    }, [])

    const [usuarios, setUsuarios] = useState([]);
    const columns = [
        {
            title: 'Codigo de cliente',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Nombre',
            dataIndex: 'nombre',
            key: 'nombre',
        },
        {
            title: 'Apellido',
            dataIndex: 'apellido',
            key: 'apellido',
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
        {
            title: 'Dni',
            dataIndex: 'dni',
            key: 'dni',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            ),
        },
    ];

    const getData = () => {
        Axios.get('Usuario/').then(
            res => {
                setUsuarios(res.data);
                console.log(usuarios)
            }
        ).catch(
            err => {
                console.log(err)
            }
        )
    }

    const redirectToSaveUsuario = () => {
        history.push("/save-usuario");
    };

    return (

        <div style={{ margin: 'auto' }}>
            <h1>Listado de usuarios</h1>

            <Button style={{ marginBottom: '1.5rem' }} onClick={redirectToSaveUsuario} type="primary" htmlType="submit">
                Registrar usuario
        </Button>

            <div >
                <Table style={{ width: 1200 }} dataSource={usuarios} columns={columns} />
            </div>

        </div>

    )
}


