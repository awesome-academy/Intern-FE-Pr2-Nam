import { useDispatch, useSelector } from "react-redux";
import {
  setProductsShopFilter,
  setSelected,
} from "../../../store/Slide/ProductsSlide";
import StarPerRow from "./StarPerRow";

function Rating() {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.products.shop.filter);
  const selected = useSelector((state) => state.products.selected);
  const shopProductsList = useSelector(
    (state) => state.products.productsList.data
  );
  const ratingList = Array.from({ length: 4 }, (_, i) => i + 1);

  if (shopProductsList) {
    shopProductsList.forEach((item) => {
      if (ratingList.indexOf(item.rating) === -1) {
        ratingList.push(item.rating);
      }
      ratingList.sort();
    });
  }

  function handleRatingCheck(value) {
    const newFilter = selected.includes(value) === false ? value : "";
    dispatch(
      setProductsShopFilter({
        ...filter,
        rating_like: newFilter,
      })
    );
    dispatch(setSelected(newFilter));
  }

  const content =
    shopProductsList &&
    ratingList.map((item, index) => (
      <li
        key={index}
        className={
          selected && selected.includes(item)
            ? "active list__item"
            : "list__item"
        }
        onClick={() => handleRatingCheck(item)}
      >
        <StarPerRow stars={item} />
      </li>
    ));

  return (
    <section className="aside__item">
      <h1 className="title">Rating</h1>
      <ul className="list">{content}</ul>
    </section>
  );
}

export default Rating;
