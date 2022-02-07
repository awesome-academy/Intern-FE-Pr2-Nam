import ProductItem from "../../ProductItem";
import { Link } from "react-router-dom";
import "./style.scss";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProducts } from "../../../store/Slide/ProductsSlide";

function Products() {
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
              Check out our new furniture collection! Cozy sofa, fancy chair,
              wooden casket, and many more. The new collection brings an
              informal elegance to your home.
            </p>
          </div>
        </div>
        <div className="product-homepage__main">
          {productsList &&
            productsList.map((item) => (
              <div className="mb-4 col-12 col-sm-6 col-md-3">
                <ProductItem key={item.id} data={item} />
              </div>
            ))}
        </div>
        <Link className="product-homepage__more" to="/shop">
          <button className="btn btn_view-more">View more</button>
        </Link>
      </Container>
    </section>
  );
}
export default Products;
