import { Container } from "react-bootstrap";
import ProductShop from "./ProductShop";
import Search from "./Search";
import Sort from "./Sort";
import "./style.scss";

function Shop() {
  return (
    <div className="shop">
      <Container>
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
