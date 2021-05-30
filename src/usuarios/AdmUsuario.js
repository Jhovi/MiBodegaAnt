import React from 'react';
import { Form, Input, Button, Checkbox, Dropdown, Menu, message, Upload } from 'antd';
import Axios from "axios";
import { Table, Tag, Space } from 'antd';
import { useHistory } from "react-router-dom";
import { DownOutlined, UserOutlined, UploadOutlined,FilePdfOutlined, FileExcelOutlined } from '@ant-design/icons';

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
            dataIndex: 'id',
            render: (id) => (
                <Button onClick={() => { redirectToEditUsuario(id) }} type="primary">
                    Editar
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


    const redirectToEditUsuario = (id) => {
        history.push("/edit-usuario/" + id);
    }

    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item id="btn-exportar-pdf" key="1" icon={<FilePdfOutlined />}>
                Exportar PDF
          </Menu.Item>
            <Menu.Item id="btn-exportar-excel" key="2" icon={<FileExcelOutlined />}>
                Exportar Excel
          </Menu.Item>
        </Menu>
    );

    function handleMenuClick(e) {

        if (e.key == 1) {
            Axios({
                url: 'Usuario/getpdf', method: 'get',
                responseType: 'blob'
            }).then((response) => {
                message.success('Usuarios exportados correctamente');
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'usuarios.pdf');
                document.body.appendChild(link);
                link.click();
            })
        } else {
            Axios({
                url: 'Usuario/GetExcel', method: 'get',
                responseType: 'blob'
            }).then((response) => {
                message.success('Usuarios exportados correctamente');
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'usuarios.csv');
                document.body.appendChild(link);
                link.click();
            })
        }
    }

    const props = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status === 'done') {
                const formData = new FormData();
                formData.append(
                    "files",
                    info.file.originFileObj,
                    info.file.name
                );

                var pos = info.file.name.indexOf('.');
                var extension = info.file.name.slice(-(info.file.name.length - pos));

                Axios({
                    url: 'FileUpload', method: 'post',
                    responseType: 'text', data: formData
                }).then(res => {
                    if (extension == '.txt') {
                        Axios({
                            url: 'FileUpload', method: 'post',
                            responseType: 'text', data: formData
                        }).then(
                            res => {
                                Axios.post('Usuario/LoadUsers/' + info.file.name).then(
                                    res => {
                                        message.success('Usuarios registrados de manera exitosa');
                                        getData();
                                    },
                                    err => {
                                        message.error('Problemas al leer el archivo');
                                    }
                                )
                            }
                        )
                    } else if (extension == '.xlsx') {
                        Axios({
                            url: 'FileUpload', method: 'post',
                            responseType: 'text', data: formData
                        }).then(
                            res => {
                                Axios.post('Usuario/loadUsersExcel/' + info.file.name).then(
                                    res => {
                                        message.success('Usuarios registrados de manera exitosa');
                                        getData();
                                    },
                                    err => {
                                        message.error('Problemas al leer el archivo');
                                    }
                                )
                            }
                        )
                    } else {
                        message.error('Problemas al leer el archivo');
                    }

                })
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };


    return (

        <div style={{ margin: 'auto' }}>
            <h1>Listado de usuarios</h1>

            <Button style={{ marginBottom: '1.5rem' }} onClick={redirectToSaveUsuario} type="primary" htmlType="submit" id="btn-registrar" >
                Registrar usuario
        </Button>

            <Dropdown overlay={menu}>
                <Button style={{ marginLeft: '2rem', marginRight: '2rem' }} id="btn-exportar" >
                    Exportar <DownOutlined />
                </Button>
            </Dropdown>

            <Upload showUploadList={false}  {...props} id="upload-container">
                <Button id="btn-upload" icon={<UploadOutlined />}>Cargar archivos</Button>
            </Upload>


            <div >
                <Table style={{ width: 1200 }} dataSource={usuarios} columns={columns} />
            </div>

        </div>

    )
}


