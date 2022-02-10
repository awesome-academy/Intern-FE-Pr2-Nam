import { useDispatch, useSelector } from "react-redux";
import {
  setProductsShopFilter,
  setSelected,
} from "../../../store/Slide/ProductsSlide";

function Category() {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.products.shop.filter);
  const selected = useSelector((state) => state.products.selected);
  const shopProductsList = useSelector(
    (state) => state.products.productsList.data
  );
  const categoyList = [];

  if (shopProductsList) {
    shopProductsList.forEach((item) => {
      if (categoyList.indexOf(item.category) === -1) {
        categoyList.push(item.category);
      }
      categoyList.sort();
    });
  }

  function handleCategoryCheck(value) {
    const newFilter = selected.includes(value) === false ? value : "";
    dispatch(
      setProductsShopFilter({
        ...filter,
        category_like: newFilter,
      })
    );
    dispatch(setSelected(newFilter));
  }

  const content =
    shopProductsList &&
    categoyList.map((item, index) => (
      <li
        key={index}
        className={
          selected && selected.includes(item)
            ? "active list__item"
            : "list__item"
        }
        onClick={() => handleCategoryCheck(item)}
      >
        {item}
      </li>
    ));
  return (
    <section className="aside__item">
      <h1 className="title">Categories</h1>
      <ul className="list">{content}</ul>
    </section>
  );
}

export default Category;
