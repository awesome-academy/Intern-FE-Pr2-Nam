import { useTranslation } from "react-i18next";
import { FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Modal } from 'antd';
import { toast } from "react-toastify";
import {
  updateQuantity,
  deleteProductInCart,
} from "../../store/Slide/CartSlice";
const { confirm } = Modal;

function CartItem({ item }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { title, image, price, quantity, id } = item;
  const pricePerItem = price * quantity;

  const handleChangeQuantity = (type, id) => {
    const payload = { type, id };
    dispatch(updateQuantity(payload));
  };

  const handleDeleteProduct = (item) => {
    confirm({
      title: t('Delete this product:'),
      content: item.title,
      okText: t('Delete'),
      okType: 'danger',
      cancelText: t('Cancel'),
      onOk() {
        toast.warn(t("Product has been deleted"), {
          position: "top-right",
          autoClose: 2500,
        });
        dispatch(deleteProductInCart(item));
      },
    });
  };

  return (
    <tr>
      <td className="cart__img">
        <img alt={title} src={image} />
      </td>
      <td className="cart__quantity">
        <div className="quantity d-flex">
          <button
            disabled={quantity === 1 ? true : false}
            className="quantity__decrease quantity__btn flex-center fs-2 cursor-poiter"
            onClick={() => handleChangeQuantity("decrease", id)}
          >
            &#8722;
          </button>
          <span className="quantity__text">{quantity}</span>
          <button
            className="quantity__increase quantity__btn flex-center fs-2 cursor-poiter"
            onClick={() => handleChangeQuantity("increase", id)}
          >
            &#43;
          </button>
        </div>
      </td>
      <td className="cart__price">${pricePerItem}</td>
      <td className="cart__del">
        <div className="cart__del-btn" onClick={() => handleDeleteProduct(item)}>
          <FaTimes />
        </div>
      </td>
    </tr>
  );
}

export default CartItem;
