import ProductItem from "../../ProductItem";
import "./style.scss";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Paginate from "../../Pagination";
import { useEffect } from "react";
import {
  getShopProducts,
  getProducts,
} from "../../../store/Slide/ProductsSlide";

function ProductShop() {
  const dispatch = useDispatch();
  const shopProductsList = useSelector(
    (state) => state.products.shop.list.data
  );
  const isLoading = useSelector((state) => state.products.shop.isLoading);
  const filter = useSelector((state) => state.products.shop.filter);

  useEffect(() => {
    dispatch(getShopProducts(filter));
  }, [filter, dispatch]);

  useEffect(() => {
    dispatch(
      getProducts({
        ...filter,
        _page: "",
        _limit: "",
      })
    );
  }, []);

  const content =
    shopProductsList &&
    shopProductsList.map((item) => (
      <div key={item.id} className="mb-4 col-12 col-sm-6 col-md-4">
        <ProductItem data={item} />
      </div>
    ));

  return (
    <section className="product-shop">
      <Container>
        <div className="product-shop__main">
          {isLoading ? <h1>...Loading</h1> : content}
        </div>
      </Container>
      <Paginate />
    </section>
  );
}

export default ProductShop;
