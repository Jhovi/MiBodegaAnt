import { Menu, Button } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

const { SubMenu } = Menu;



export const Nav = () => {

    const handleClick = (e) => {

    };

    return (

        <Menu mode="horizontal" >
                <SubMenu key="subMenuUsuario" style={{ marginLeft: '23rem' }} icon={<SettingOutlined />} title="Usuarios">
                    <Menu.Item onClick={handleClick} key="listarUsuarios" ><Link to={'/adm-usuarios'} className="nav-link">Usuarios</Link></Menu.Item>
                    <Menu.Item key="registrarUsuario">Registrar usuario</Menu.Item>
                </SubMenu>
                <SubMenu key="subMenuProducto" icon={<SettingOutlined />} title="Productos">
                    <Menu.Item key="listarProductos">Listar productos</Menu.Item>
                </SubMenu>
                <SubMenu key="subMenuBoleta" icon={<SettingOutlined />} title="Boletas">
                    <Menu.Item key="listarBoletas">Listar boletas</Menu.Item>
                    <Menu.Item key="registrarBoleta">Registrar boleta</Menu.Item>
                </SubMenu>
                <Menu.Item key="estadistica">Estadistica</Menu.Item>
        </Menu>

    )

}