import ProductItem from "../../ProductItem";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../Products/style.scss";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getHotProducts } from "../../../store/Slide/ProductsSlide";

function HotProducts() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const hotProduct = useSelector((state) => state.products.hot.list.data);
  const filter = useSelector((state) => state.products.hot.filter);

  useEffect(() => {
    dispatch(getHotProducts(filter));
  }, [filter, dispatch]);

  return (
    <section className="product-homepage">
      <Container>
        <h3 className="product-homepage__title">{t("Hot Products")}</h3>
        <div className="justify-content-center mb-2 row">
          <div className="col-sm-8">
            <p className="text-center text-muted mb-4 product-homepage__text">
              {t("Check out our new furniture collection!")}
            </p>
          </div>
        </div>
        <div className="product-homepage__main">
          {hotProduct &&
            hotProduct.map((item) => (
              <div key={item.id} className="mb-4 col-12 col-sm-6 col-md-3">
                <ProductItem data={item} />
              </div>
            ))}
        </div>
        <Link className="product-homepage__more" to="/shop">
          <button className="btn btn_view-more">{t("View more")}</button>
        </Link>
      </Container>
    </section>
  );
}
export default HotProducts;
