import { useEffect } from "react";
import { getProducts, getShopProducts } from "../../../src/store/Slide/ProductsSlide"
import { useDispatch, useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import { Table } from "react-bootstrap"
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import { Modal } from 'antd';
import ModalAdd from "../ModalAdd"
import ModalAction from "../Modal"
import Popup from "reactjs-popup";
import Paginate from "../../Component/Pagination"
const { confirm } = Modal;

function ProductManager() {
    const dispatch = useDispatch();
    const { t } = useTranslation()
    const productsList = useSelector((state) => state.products.shop.list.data);
    const filter = useSelector((state) => state.products.shop.filter);

    useEffect(() => {
        dispatch(getShopProducts(filter));
    }, [filter, dispatch]);

    return (
        <section className="product-manager">
            <Popup modal
                trigger=
                {
                    <button>
                        <FaPlus />
                    </button>
                }>
                {close => <ModalAdd close={close} />}
            </Popup>
            <Table bordered className="product-manager__table">
                <colgroup>
                    <col style={{ width: '5%' }} />
                    <col style={{ width: '10%' }} />
                    <col style={{ width: '20%' }} />
                    <col style={{ width: '5%' }} />
                    <col style={{ width: '35%' }} />
                    <col style={{ width: '5%' }} />
                    <col style={{ width: '9%' }} />
                    <col style={{ width: '6%' }} />
                </colgroup>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>{t("Image")}</th>
                        <th>{t("Name")}</th>
                        <th>{t("Price")}</th>
                        <th>{t("Desc")}</th>
                        <th>{t("Brand")}</th>
                        <th>{t("Categories")}</th>
                        <th>{t("Tools")}</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        productsList &&
                        productsList.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>
                                        <img style={{ width: "100px" }} alt={item.name} src={item.image} />
                                    </td>
                                    <td>{item.title}</td>
                                    <td>{item.price}$</td>
                                    <td>{item.description}</td>
                                    <td>{item.brand}</td>
                                    <td>{item.category}</td>
                                    <td>
                                        <button>
                                            <FaTrash />
                                        </button>
                                        <Popup modal
                                            trigger=
                                            {
                                                <button>
                                                    <FaEdit />
                                                </button>
                                            }>
                                            {close => <ModalAction item={item} />}
                                        </Popup>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
            <Paginate />
        </section>
    );
}

export default ProductManager;
