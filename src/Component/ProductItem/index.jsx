import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";
import { faCartArrowDown, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";
import { addToCart } from "../../store/Slide/CartSlice";
import { addProductToWishList } from "../../store/Slide/WishListSlice";
function ProductItem({ data }) {
  const { id, title, price, image, category } = data;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('user-info'));
  const handleAddToCart = (item) => {
    toast.success(t("Product has been added to your cart"), {
      position: "top-right",
      autoClose: 2000,
    });
    dispatch(addToCart({ ...item, quantity: 1 }));
  };

  const handleAddToWishList = (item) => {
    const userId = user.id
    toast.success(t("Product has been added to your wish list"), {
      position: "top-right",
      autoClose: 2000,
    });
    dispatch(addProductToWishList({ ...item, userId: userId }))
  }

  return (
    <div className="product">
      <Link to={`/products/${id}`}>
        <img className="product__img" src={image} alt={title} />
      </Link>
      <div className="product__action d-flex flex-column justify-content-center">
        <button type="button" className="product__action__button" onClick={() => handleAddToWishList(data)}>
          <FontAwesomeIcon icon={faHeart} />
        </button>
        <button
          type="button"
          onClick={() => handleAddToCart(data)}
          className="product__action__button"
        >
          <FontAwesomeIcon icon={faCartArrowDown} />
        </button>
      </div>
      <div className="product__info">
        <Link className="product__category" to={`/category/${category}`}>
          {category}
        </Link>
        <Link className="product__title" to={`/title/${title}`}>
          <h4>{title}</h4>
        </Link>
        <h5 className="product__price">${price}</h5>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ProductItem;
