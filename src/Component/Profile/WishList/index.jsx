import { useSelector, useDispatch } from "react-redux";
import { getWishListFromDbJson } from "../../../store/Slide/WishListSlice"
import { useEffect } from "react";
import ProductItem from "../../ProductItem";

function WishList() {
    const dispatch = useDispatch()
    const id = JSON.parse(localStorage.getItem('user-info')).id
    useEffect(() => {
        dispatch(getWishListFromDbJson(id))
    }, [id])

    const wishList = useSelector((state) => state.wishList.wishList)
    const isLoading = useSelector((state) => state.wishList.isLoading)

    const content =
        wishList && wishList.length > 0 ?
            wishList.map((item) => (
                <div key={item.id} className="mb-4 col-12 col-sm-6 col-md-3">
                    <ProductItem data={item} />
                </div>
            ))
            : <h2 className="m-auto mt-5">Không có sản phẩm</h2>

    return (
        <>
            <h1 className="text-center">Your wish list</h1>
            <div className="d-flex mt-5">

                {isLoading ? <h1>...Loading</h1> : content}
            </div>
        </>
    );
}

export default WishList;
