import { Tabs } from 'antd';
import { Container } from "react-bootstrap";
import {
    signOut,
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from 'react-router-dom';
import { Menu, Dropdown } from 'antd';
import { Link } from "react-router-dom";

import "./style.scss";
const { TabPane } = Tabs;

function Admin() {
    const navigate = useNavigate()
    const userInfo = JSON.parse(localStorage.getItem('user-info'));

    const logOut = async () => {
        await signOut(auth)
        localStorage.removeItem('user-info')
        navigate("/")
    }

    const menu = (
        <Menu>
            <Menu.Item key="1">
                <Link to="/profile">Profile</Link>
            </Menu.Item>
            <Menu.Item key="2">
                <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="3">
                <button onClick={logOut}>Log out</button>
            </Menu.Item>
        </Menu>
    );

    const TabUi = () => (
        <Tabs tabPosition="left" defaultActiveKey="1">
            <TabPane tab="Product" key="1">
                <span>Product</span>
            </TabPane>
            <TabPane tab="Order" key="2">
                <span>Order</span>
            </TabPane>
        </Tabs>
    );
    return (
        <div className="admin">
            <Container>
                <header className="admin__header">
                    <span className="admin__logo">Flatlogic</span>
                    <Dropdown overlay={menu}  >
                        <Link className="ant-dropdown-link" to="/profile" >
                            {userInfo.full_name}
                        </Link>
                    </Dropdown>
                </header>
                {<TabUi />}
            </Container>
        </div>
    );
}

export default Admin;
