import { useEffect } from "react";
import { getOrderFromDbJsonAdmin, updateStatusOrder } from "../../store/Slide/AdminSlice"
import { useDispatch, useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import { Table } from "react-bootstrap"
import { FaMinus } from "react-icons/fa";
import { Modal } from 'antd';
import { toast } from "react-toastify";
const { confirm } = Modal;

function OrderManager() {
    const dispatch = useDispatch();
    const { t } = useTranslation()
    const historyOrder = useSelector((state) => state.admin.historyOrder);
    let type

    useEffect(() => {
        dispatch(getOrderFromDbJsonAdmin());
    }, []);

    const handleChangeStatus = (item, type) => {
        const newOrderData = { ...item, status: type }
        let action = type == 'Done' ? 'Accept' : 'Reject';

        confirm({
            title: `${action} this order?`,
            okText: `${action}`,
            okType: 'successful',
            cancelText: t('Cancel'),
            async onOk() {
                toast.success(t("This order has been changed status"), {
                    position: "top-right",
                    autoClose: 2500,
                });
                await dispatch(updateStatusOrder({ id: item.id, newOrderStatus: newOrderData }));
                dispatch(getOrderFromDbJsonAdmin());
            },
        });
    }

    return (
        <section className="product-manager">
            <Table bordered className="product-manager__table">
                <colgroup>
                    <col style={{ width: '5%' }} />
                    <col style={{ width: '20%' }} />
                    <col style={{ width: '5%' }} />
                    <col style={{ width: '20%' }} />
                    <col style={{ width: '10%' }} />
                    <col style={{ width: '20%' }} />
                    <col style={{ width: '10%' }} />
                </colgroup>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>{t("Order")}</th>
                        <th>{t("Price")}</th>
                        <th>{t("Customer Name")}</th>
                        <th>{t("Phone")}</th>
                        <th>{t("Message")}</th>
                        <th>{t("Status")}</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        historyOrder &&
                        historyOrder.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>
                                        {item.cart.map((cart, index) => (
                                            <h4 key={index}><FaMinus /> {cart.title}</h4>
                                        ))}
                                    </td>
                                    <td>${item.total}</td>
                                    <td>{item.full_name}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.message}</td>
                                    <td>
                                        {
                                            item.status === "pending"
                                                ?
                                                <>
                                                    <div className="d-flex">
                                                        <button className="admin__btn admin__btn--accept" onClick={() => handleChangeStatus(item, type = "Done")}>Accept</button>
                                                        <button className="admin__btn admin__btn--reject" onClick={() => handleChangeStatus(item, type = "Reject")}>Reject</button>
                                                    </div>
                                                </>
                                                : <h4>{item.status}</h4>
                                        }
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </section>
    )
}

export default OrderManager;
