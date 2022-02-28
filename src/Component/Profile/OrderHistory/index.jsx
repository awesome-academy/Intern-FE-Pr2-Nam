import { useSelector, useDispatch } from "react-redux";
import { getOrderFromDbJson } from "../../../store/Slide/UserSlice"
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

function OrderHistory() {
    const { t } = useTranslation();
    const dispatch = useDispatch()
    const email = JSON.parse(localStorage.getItem('user-info')).email
    useEffect(() => {
        dispatch(getOrderFromDbJson(email))
    }, [email])
    const historyOrder = useSelector((state) => state.user.historyOrder)

    return <div className="order-history">
        <table>
            <thead>
                <tr className="order-history__head">
                    <th>{t("Product")}</th>
                    <th>{t("Total")}</th>
                    <th>{t("Customer")}</th>
                    <th>{t("Address")}</th>
                </tr>
            </thead>
            <tbody>
                {
                    historyOrder.length > 0
                        ?
                        historyOrder.map((item, index) => (
                            <tr className="order-history__item" key={index}>
                                <td>
                                    {item.cart.map((itemCart, index) => (
                                        <h4 key={index}>{itemCart.title}</h4>
                                    ))}
                                </td>
                                <td>
                                    ${item.total}
                                </td>
                                <td>
                                    {item.full_name}
                                </td>
                                <td>
                                    {item.address}
                                </td>
                            </tr>
                        ))
                        :
                        <tr>
                            <td colSpan={6}>{t("There is no order yet")}</td>
                        </tr>
                }
            </tbody>
        </table>
    </div>
}

export default OrderHistory;
