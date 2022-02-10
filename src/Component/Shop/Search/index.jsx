import { useDispatch, useSelector } from "react-redux";
import { useDebouncedCallback } from "use-debounce";
import { search, getShopProducts } from "../../../store/Slide/ProductsSlide";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function Search() {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.products.shop.searchTerm);
  const filter = useSelector((state) => state.products.shop.filter);
  const debounceOnChange = useDebouncedCallback((value) => {
    dispatch(
      getShopProducts({
        ...filter,
        title_like: value,
      })
    );
  }, 300);

  function handleSearchTermChange(e) {
    const inputValue = e.target.value;
    dispatch(search(inputValue));
    debounceOnChange(inputValue);
  }

  return (
    <form className="search">
      <input
        type="text"
        className="form-control"
        placeholder="Search a product"
        value={searchTerm}
        onChange={handleSearchTermChange}
      />
      <button type="submit" className="search-btn">
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </form>
  );
}

export default Search;
