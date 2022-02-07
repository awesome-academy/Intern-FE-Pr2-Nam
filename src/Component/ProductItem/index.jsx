import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";
import { faCartArrowDown, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ProductItem({ data }) {
  const { id, title, price, image, category } = data;

  return (
    <div className="product">
      <Link to={`/products/${id}`}>
        <img className="product__img" src={image} alt={title} />
      </Link>
      <div className="product__action d-flex flex-column justify-content-center">
        <button type="button" className="product__action__button">
          <FontAwesomeIcon icon={faHeart} />
        </button>
        <button type="button" className="product__action__button">
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
    </div>
  );
}

export default ProductItem;
