import "./style.scss";
import { Tabs } from 'antd';
import Info from "./Info";
import OrderHistory from "./OrderHistory";
import WishList from "./WishList";
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
            <TabPane tab="Wish List" key="3">
                <WishList />
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
