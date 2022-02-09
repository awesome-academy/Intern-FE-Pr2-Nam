import { Container } from "react-bootstrap";
import ProductShop from "./ProductShop";

import "./style.scss";

function Shop() {
  return (
    <div className="shop">
      <Container>
        <section className="shop__main">
          <ProductShop />
        </section>
      </Container>
    </div>
  );
}

export default Shop;
