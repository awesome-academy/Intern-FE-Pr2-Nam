import { Container } from "react-bootstrap";
import ProductShop from "./ProductShop";
import Search from "./Search";
import Sort from "./Sort";
import Category from "./Category";
import Brand from "./Brand";
import PriceRange from "./PriceRange";
import Rating from "./Rating";
import ClearFilter from "./ClearFilter";
import "./style.scss";

function Shop() {
  return (
    <div className="shop">
      <Container className="d-flex">
        <aside className="aside">
          <ClearFilter />
          <Category />
          <Brand />
          <PriceRange />
          <Rating />
        </aside>
        <section className="shop__main">
          <div className="d-flex justify-content-between pb-5">
            <Search />
            <Sort />
          </div>
          <ProductShop />
        </section>
      </Container>
    </div>
  );
}

export default Shop;
