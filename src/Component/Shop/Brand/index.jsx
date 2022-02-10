import { useDispatch, useSelector } from "react-redux";
import {
  setProductsShopFilter,
  setSelected,
} from "../../../store/Slide/ProductsSlide";

function Brand() {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.products.shop.filter);
  const selected = useSelector((state) => state.products.selected);
  const shopProductsList = useSelector(
    (state) => state.products.productsList.data
  );
  const brandList = [];

  if (shopProductsList) {
    shopProductsList.forEach((item) => {
      if (brandList.indexOf(item.brand) === -1) {
        brandList.push(item.brand);
      }
      brandList.sort();
    });
  }

  function handleBrandCheck(value) {
    const newFilter = selected.includes(value) === false ? value : "";
    dispatch(
      setProductsShopFilter({
        ...filter,
        brand_like: newFilter,
      })
    );
    dispatch(setSelected(newFilter));
  }

  const content =
    shopProductsList &&
    brandList.map((item, index) => (
      <li
        key={index}
        className={
          selected && selected.includes(item)
            ? "active list__item"
            : "list__item"
        }
        onClick={() => handleBrandCheck(item)}
      >
        {item}
      </li>
    ));

  return (
    <section className="aside__item">
      <h1 className="title">Brands</h1>
      <ul className="list">{content}</ul>
    </section>
  );
}

export default Brand;
