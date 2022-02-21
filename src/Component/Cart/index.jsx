import { useTranslation } from "react-i18next";
import { Container } from "react-bootstrap";
import CartItem from "./CartItem";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from 'antd';
import {deleteAllProduct} from "../../store/Slide/CartSlice";
import "./style.scss";
const { confirm } = Modal;

function Cart() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  let cartList = useSelector((state) => state.cart.cartList);
  let total = useSelector((state) => state.cart.total);
  let newTotal = total.toLocaleString('it-IT')
  const [cartListRender, setCartListRender] = useState();

  useEffect(() => {
    setCartListRender(cartList);
  }, [cartList]);

  const handleDeleteAllProduct= () => {
    confirm({
      title: t('Delete all products?'),
      okText: t('Delete'),
      okType: 'danger',
      cancelText: t('Cancel'),
      onOk() {
        dispatch(deleteAllProduct());
      },
    });
  }

  return (
    <div className="cart">
      <Container className="d-flex">
        <div className="col-12 col-lg-8">
          <h2 className="mb-5 mt-5 cart__title">Shopping Cart</h2>
          <table className="table table-borderless">
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {cartListRender ? (
                cartListRender.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))
              ) : (
                <tr>
                  <td colSpan="6">Chưa có sản phẩm trong giỏ hàng</td>
                </tr>
              )}
            </tbody>
          </table>
            <button className="cart__del-all" onClick={() => handleDeleteAllProduct()}>
              {t('Delete All Product!')}
            </button>
        </div>
        <div className="col-12 col-lg-4">
          <section className="cart__total">
            <h2 className="cart__title mb-5">Cart Total</h2>
            <div className="d-flex">
              <h6 className="cart__sub">Subtotal:</h6>
              <h6 className="cart__info">${newTotal}</h6>
            </div>
            <hr className="my-5"/>
            <div className="d-flex">
              <h6 className="cart__sub">Shipping:</h6>
              <h6 className="cart__info">Free Shipping</h6>
            </div>
            <hr className="my-5" />
            <div className="d-flex">
              <h5 className="cart__sub last">Total: </h5>
              <h5 className="cart__info last">${newTotal}</h5>
            </div>
            <button type="button" className="cart__check-out">
              Check out
            </button>
          </section>
        </div>
      </Container>
    </div>
  );
}

export default Cart;
