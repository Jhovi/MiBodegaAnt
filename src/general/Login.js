import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import Axios from "axios";
import { useHistory } from "react-router-dom";

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 8,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

const variables = {
    loggedIn: false
}
export const Login = () => {
    
    const history = useHistory();
    const onFinish = values => {

        const data = {
            correo: values.correo,
            password: values.password
        }

        Axios.post('Usuario/authenticate', data).then(
            res => {
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('id', res.data.id)
                console.log("Logeado correctamente")
                variables.loggedIn = true;
                history.push("/adm-usuarios");
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

    return (

        <Form
            {...layout}
            name="basic"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="Correo"
                name="correo"
                rules={[
                    {
                        required: true,
                        message: 'Ingrese su correo!',
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
                        message: 'Ingrese contraseña!',
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button name="btn-ingresar" type="primary" htmlType="submit">
                    Ingresar
        </Button>
            </Form.Item>
        </Form>
    );
};