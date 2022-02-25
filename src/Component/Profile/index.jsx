import "./style.scss";
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Tabs } from 'antd';
import Info from "./Info";
import OrderHistory from "./OrderHistory";
import { Container } from "react-bootstrap"
const { TabPane } = Tabs;

function Profile() {
    const TabUi = () => (
        <Tabs defaultActiveKey="1">
            <TabPane tab="Info" key="1">
                <Info />
            </TabPane>
            <TabPane tab="Order History" key="2">
                <OrderHistory />
            </TabPane>
        </Tabs>
    );
    return (
        <div className="profile">
            <Container>
                {<TabUi />}
            </Container>
        </div>
    );
}

export default Profile;
