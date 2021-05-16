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
                    <Menu.Item onClick={handleClick} key="listarUsuarios" ><Link to={'/adm-usuarios'} className="nav-link">Listar Usuarios</Link></Menu.Item>
                    <Menu.Item key="registrarUsuario">Registrar usuario</Menu.Item>
                </SubMenu>
                <SubMenu key="subMenuProducto" icon={<SettingOutlined />} title="Productos">
                    <Menu.Item onClick={handleClick} key="listarProductos" ><Link to={'/adm-producto'} className="nav-link">Listar productos</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="subMenuBoleta" icon={<SettingOutlined />} title="Boletas">
                    <Menu.Item onClick={handleClick} key="listarBoletas"><Link to={'/adm-boletas'} className="nav-link">Listar boletas</Link></Menu.Item>
                    <Menu.Item key="registrarBoleta">Registrar boleta</Menu.Item>
                </SubMenu>
                <Menu.Item key="estadistica"><Link to={'/metrics'} className="nav-link">Estadistica</Link></Menu.Item>
        </Menu>

    )

}