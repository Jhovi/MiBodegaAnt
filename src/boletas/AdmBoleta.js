import React from 'react';
import { Form, Input, Button, Checkbox, Dropdown, Menu, message, Upload } from 'antd';
import Axios from "axios";
import { Table, Tag, Space } from 'antd';
import { useHistory } from "react-router-dom";
import { DownOutlined, UserOutlined, UploadOutlined } from '@ant-design/icons';

const { useState, useEffect } = React;



export const AdmBoleta = () => {

    const history = useHistory();

    useEffect(() => {
        getData();
    }, [])

    const [boletas, setboletas] = useState([]);
    const columns = [
        {
            title: 'Codigo',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Fecha',
            dataIndex: 'fecha',
            key: 'fecha',
        },
        {
            title: 'Dirección',
            dataIndex: 'direccion',
            key: 'direccion',
        },
        {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
        },
        {
            title: 'Action',
            key: 'action',
            dataIndex: 'id',
            render: (id) => (
                <Button onClick={() => { redirectToEditBoleta(id) }} type="primary" >
                    Editar
                </Button>
            ),
        },
    ];

    const getData = () => {
        Axios.get('Boleta/').then(
            res => {
                setboletas(res.data);
            }
        ).catch(
            err => {
                console.log(err)
            }
        )
    }

    const redirectToSaveBoleta = () => {
        history.push("/save-boleta");
    };


    const redirectToEditBoleta = (id) => {
        history.push("/edit-boleta/" + id);
    }

    return (

        <div style={{ margin: 'auto' }}>
            <h1>Listado de boletas</h1>

            <Button style={{ marginBottom: '1.5rem' }} onClick={redirectToSaveBoleta} type="primary" htmlType="submit">
                Registrar boleta
            </Button>



            <div >
                <Table style={{ width: 1200 }} dataSource={boletas} columns={columns} />
            </div>

        </div>

    )
}


