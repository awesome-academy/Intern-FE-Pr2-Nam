import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  setCurrentPage,
  getShopProducts,
  getPagination,
} from "../../store/Slide/ProductsSlide";
import { Pagination } from "antd";
import "./style.scss";

function Paginate() {
  const dispatch = useDispatch();
  const paginations = useSelector((state) => state.products.pagination);
  const filter = useSelector((state) => state.products.shop.filter);
  const listPage = [];
  const _page = filter._page;
  const _limit = filter._limit;

  useEffect(() => {
    dispatch(
      getPagination({
        ...filter,
        _page: "",
        _limit: "",
      })
    );
  }, [filter]);

  if (paginations.list.data) {
    const allProductsLength = paginations.list.data.length;
    for (let i = 1; i <= allProductsLength; i++) {
      listPage.push(i);
    }
  }

  const handlePageChange = (num) => {
    dispatch(getShopProducts({ ...filter, _page: num }));
    dispatch(setCurrentPage(num));
  };

  return (
    <section className="pagination d-flex justify-content-center">
      <div className="d-flex align-items-center">
        {
          <Pagination
            total={paginations && listPage.length}
            defaultPageSize={_limit}
            defaultCurrent={_page}
            onChange={(e) => handlePageChange(e)}
          />
        }
      </div>
    </section>
  );
}

export default Paginate;
