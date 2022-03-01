import { useTranslation } from "react-i18next";
import { Container } from "react-bootstrap";
import CartItem from "./CartItem";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Modal } from 'antd';
import { deleteAllProduct, setOrderToDbjson } from "../../store/Slide/CartSlice";
import { toast, ToastContainer } from "react-toastify";
import "./style.scss";
const { confirm } = Modal;

function Cart() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  let cartList = useSelector((state) => state.cart.cartList);
  let total = useSelector((state) => state.cart.total)
  let newTotal = total.toLocaleString('it-IT')
  const [cartListRender, setCartListRender] = useState();

  const userInfo = JSON.parse(localStorage.getItem('user-info'));
  const userPaymentInfoLocal = JSON.parse(localStorage.getItem('user-payment-info'));
  const userPaymentInfo = useSelector((state) => state.cart.payment_info)

  const usePaymentCheck = userPaymentInfoLocal ? userPaymentInfoLocal : userPaymentInfo;
  const checkForConfirm = Object.values(userPaymentInfo).some(item => item == "");
  const navigate = useNavigate()

  useEffect(() => {
    setCartListRender(cartList);
  }, [cartList]);

  const handleDeleteAllProduct = () => {
    confirm({
      title: t('Delete all products?'),
      okText: t('Delete'),
      okType: 'danger',
      cancelText: t('Cancel'),
      onOk() {
        toast.warn(t("You have deleted all products"), {
          position: "top-right",
          autoClose: 2500,
        });
        dispatch(deleteAllProduct());
      },
    });
  }

  const directTo = (link) => {
    navigate(link)
  }

  const confirmInfo = () => {
    const arr = { cart: cartListRender }
    const payload = { ...arr, ...usePaymentCheck, total: total }
    dispatch(setOrderToDbjson(payload))
    dispatch(deleteAllProduct())
    navigate("/")
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
            <hr className="my-5" />
            <div className="d-flex">
              <h6 className="cart__sub">Shipping:</h6>
              <h6 className="cart__info">Free Shipping</h6>
            </div>
            <hr className="my-5" />
            {usePaymentCheck ?
              <>
                <div className="d-flex">
                  <h5 className="cart__sub">Name: </h5>
                  <h5 className="cart__info">{usePaymentCheck.full_name}</h5>
                </div>
                <div className="d-flex mt-3">
                  <h5 className="cart__sub">Phone: </h5>
                  <h5 className="cart__info">{usePaymentCheck.phone}</h5>
                </div>
                <div className="d-flex mt-3">
                  <h5 className="cart__sub">Address: </h5>
                  <h5 className="cart__info">{usePaymentCheck.address}</h5>
                </div>
                <div className="d-flex mt-3">
                  <h5 className="cart__sub">Message: </h5>
                  <h5 className="cart__info">{usePaymentCheck.message}</h5>
                </div>
                <div className="d-flex mt-3">
                  <h5 className="cart__sub">Payment: </h5>
                  <h5 className="cart__info">{usePaymentCheck.payment_method}</h5>
                </div>
              </>
              :
              <hr className="my-5" />
            }
            <hr className="my-5" />

            <div className="d-flex">
              <h5 className="cart__sub last">Total: </h5>
              <h5 className="cart__info last">${newTotal}</h5>
            </div>


            {userInfo ?
              <button type="button" className="cart__check-out" onClick={() => directTo("/payment")}>
                Check out
              </button>
              :
              <button type="button" className="cart__check-out" onClick={() => directTo("/signin")}>
                Check out
              </button>
            }
            {!checkForConfirm
              ? <button type="button" className="cart__check-out" onClick={() => confirmInfo()}>
                Confirm
              </button>
              : <div></div>
            }
          </section>
        </div>
      </Container>
      <ToastContainer />
    </div>
  );
}

export default Cart;

