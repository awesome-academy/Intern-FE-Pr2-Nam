import ProductItem from "../../ProductItem";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./style.scss";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProducts } from "../../../store/Slide/ProductsSlide";
import { ToastContainer } from "react-toastify";

function Products() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const productsList = useSelector((state) => state.products.productsList.data);
  const filter = useSelector((state) => state.products.filter);

  useEffect(() => {
    dispatch(getProducts(filter));
  }, [filter, dispatch]);

  return (
    <section className="product-homepage">
      <Container>
        <h3 className="product-homepage__title">New Arrivals</h3>
        <div className="justify-content-center mb-2 row">
          <div className="col-sm-8">
            <p className="text-center text-muted mb-4 product-homepage__text">
              {t("Check out our new furniture collection!")}
            </p>
          </div>
        </div>
        <div className="product-homepage__main">
          {productsList &&
            productsList.map((item) => (
              <div key={item.id} className="mb-4 col-12 col-sm-6 col-md-3">
                <ProductItem data={item} />
              </div>
            ))}
        </div>
        <Link className="product-homepage__more" to="/shop">
          <button className="btn btn_view-more">{t("View more")}</button>
        </Link>
      </Container>
      <ToastContainer />
    </section>
  );
}
export default Products;
