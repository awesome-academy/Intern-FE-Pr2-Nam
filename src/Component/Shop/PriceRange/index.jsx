import { useDispatch, useSelector } from "react-redux";
import {
  setProductsShopFilter,
  setSelected,
} from "../../../store/Slide/ProductsSlide";

function PriceRange() {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.products.shop.filter);
  const selected = useSelector((state) => state.products.selected);
  const shopProductsList = useSelector(
    (state) => state.products.productsList.data
  );
  const priceRangeList = [];

  if (shopProductsList) {
    shopProductsList.forEach((item) => {
      if (priceRangeList.indexOf(item.price_range) === -1) {
        priceRangeList.push(item.price_range);
      }
      priceRangeList.sort();
    });
  }

  function handlePriceRangeCheck(value) {
    const newFilter = selected.includes(value) === false ? value : "";
    dispatch(
      setProductsShopFilter({
        ...filter,
        price_range_like: newFilter,
      })
    );
    dispatch(setSelected(newFilter));
  }

  const content =
    shopProductsList &&
    priceRangeList.map((item, index) => (
      <li
        key={index}
        className={
          selected && selected.includes(item)
            ? "active list__item"
            : "list__item"
        }
        onClick={() => handlePriceRangeCheck(item)}
      >
        $ {item}
      </li>
    ));

  return (
    <section className="aside__item">
      <h1 className="title">Price Range</h1>
      <ul className="list">{content}</ul>
    </section>
  );
}

export default PriceRange;
