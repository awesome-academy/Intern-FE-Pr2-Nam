import { useDispatch, useSelector } from "react-redux";
import {
  setProductsShopFilter,
  setSelected,
} from "../../../store/Slide/ProductsSlide";
import "./style.scss";

function Sort() {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.products.shop.filter);
  const selected = useSelector((state) => state.products.selected);
  const sortOptions = ["ASC", "DESC"];
  const DEFAULT_OPTIONS = "Most popular";

  function handlePageChange(e) {
    const value = e.target.value;
    const newFilter = value === DEFAULT_OPTIONS ? "" : value;
    dispatch(
      setProductsShopFilter({
        ...filter,
        _order: newFilter,
        _sort: value === DEFAULT_OPTIONS ? "" : "price",
      })
    );
    dispatch(setSelected(newFilter));
  }

  return (
    <section className="sort">
      <div className="sort-by">
        <label>Sort by:</label>
        <div className="sort-by__select">
          <select onChange={(e) => handlePageChange(e)} value={selected}>
            <option>{DEFAULT_OPTIONS}</option>
            {sortOptions.map((item, index) => (
              <option value={item} key={index}>
                Price: {item}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
}

export default Sort;
