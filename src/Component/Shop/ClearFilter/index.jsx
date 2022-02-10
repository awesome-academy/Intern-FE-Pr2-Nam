import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearSelected,
  setProductsShopFilter,
  search,
} from "../../../store/Slide/ProductsSlide";
import { FaTimes } from "react-icons/fa";

function ClearFilter() {
  const dispatch = useDispatch();
  const [isClear, setIsClear] = useState(false);
  const selected = useSelector((state) => state.products.selected);
  const filter = useSelector((state) => state.products.shop.filter);

  const newSelected = selected.filter((item) => item !== "");
  useEffect(() => {
    const flag = newSelected.length == 0 ? false : true;
    setIsClear(flag);
  }, [filter]);

  function handleClearFilter() {
    dispatch(
      setProductsShopFilter({
        ...filter,
        _page: 1,
        _limit: 9,
        _sort: "",
        _order: "",
        category_like: "",
        title_like: "",
        price_range_like: "",
        rating_like: "",
        brand_lile: "",
      })
    );
    dispatch(search(""));
    dispatch(clearSelected());
  }

  return (
    <section className="clear">
      {isClear && (
        <button onClick={handleClearFilter}>
          <span>Clear Filter</span>
          <FaTimes />
        </button>
      )}
    </section>
  );
}

export default ClearFilter;
