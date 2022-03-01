import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next"
import { useSelector, useDispatch } from "react-redux"
import Select from 'react-select';
import { Form, Button } from "react-bootstrap"
import { addProductItemDbJson, getProducts, getShopProducts } from "../../../src/store/Slide/ProductsSlide"

function ModalAdd({ close }) {
    const { t } = useTranslation()
    const dispatch = useDispatch()

    const filter = useSelector((state) => state.products.filter);
    const shopProductsList = useSelector(
        (state) => state.products.productsList.data
    );

    useEffect(() => {
        dispatch(getProducts());
    }, []);

    const brands = [];
    const categories = [];
    const priceRanges = [];

    if (shopProductsList) {
        shopProductsList.forEach((item) => {
            if (brands.indexOf(item.brand) === -1) {
                brands.push(item.brand);
            }
            brands.sort();
        });
        shopProductsList.forEach((item) => {
            if (categories.indexOf(item.category) === -1) {
                categories.push(item.category);
            }
            categories.sort();
        });
        shopProductsList.forEach((item) => {
            if (priceRanges.indexOf(item.price_range) === -1) {
                priceRanges.push(item.price_range);
            }
            priceRanges.sort();
        });
    }

    const brandLists = brands.reduce((prev, curr) => {
        const brandValues = { value: curr, label: curr };
        return [...prev, brandValues];
    }, [])

    const categoyList = categories.reduce((prev, curr) => {
        const categoryValues = { value: curr, label: curr };
        return [...prev, categoryValues];
    }, [])

    const priceRangeList = priceRanges.reduce((prev, curr) => {
        const priceRangeValues = { value: curr, label: curr };
        return [...prev, priceRangeValues];
    }, [])

    const ratingList = [
        { value: 1, label: 1 },
        { value: 2, label: 2 },
        { value: 3, label: 3 },
        { value: 4, label: 4 },
        { value: 5, label: 5 },
    ]

    const [brandItem, setBrandItem] = useState('')
    const [categoryItem, setCategoryItem] = useState('')
    const [ratingItem, setRatingItem] = useState('')
    const [titleItem, setTitleItem] = useState('')
    const [descItem, setDescItem] = useState('')
    const [priceItem, setPriceItem] = useState('')
    const [priceRangeItem, setPriceRangeItem] = useState('')
    const [imageItem, setImageItem] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(addProductItemDbJson({
            title: titleItem,
            desc: descItem,
            price: priceItem,
            image: imageItem,
            brand: brandItem.value,
            price_range: priceRangeItem.value,
            category: categoryItem.value,
            rating: ratingItem.value,

        }))
        dispatch(getShopProducts(filter));
    }

    return (
        <Form className="form-modal">
            <Form.Group className='form-gr' controlId="name">
                <Form.Label className='form-label'>Title :</Form.Label>
                <Form.Control
                    className='form-input'
                    type="text"
                    name="title"
                    value={titleItem}
                    onChange={(e) => setTitleItem(e.target.value)}
                />
            </Form.Group>
            <Form.Group className='form-gr' controlId="desc">
                <Form.Label className='form-label'>Desc :</Form.Label>
                <Form.Control
                    className='form-input'
                    type="text"
                    name="desc"
                    value={descItem}
                    onChange={(e) => setDescItem(e.target.value)}
                />
            </Form.Group>
            <Form.Group className='form-gr' controlId="price">
                <Form.Label className='form-label'>Price :</Form.Label>
                <Form.Control
                    className='form-input'
                    type="text"
                    name="price"
                    value={priceItem}
                    onChange={(e) => setPriceItem(e.target.value)}
                />
            </Form.Group>
            <Form.Group className='form-gr' controlId="image">
                <Form.Label className='form-label'>Image :</Form.Label>
                <Form.Control
                    className='form-input'
                    type="text"
                    name="image"
                    value={imageItem}
                    onChange={(e) => setImageItem(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId='select'>
                <Form.Label className='form-label'>{t('Rating')} :</Form.Label>
                <Select
                    className='form-select'
                    onChange={setRatingItem}
                    options={ratingList}
                />
            </Form.Group>
            <Form.Group controlId='select'>
                <Form.Label className='form-label'>{t('Brand')} :</Form.Label>
                <Select
                    className='form-select'

                    onChange={setBrandItem}
                    options={brandLists}
                />
            </Form.Group>
            <Form.Group controlId='select'>
                <Form.Label className='form-label'>{t('Categories')} :</Form.Label>
                <Select
                    className='form-select'
                    onChange={setCategoryItem}
                    options={categoyList}
                />
            </Form.Group>

            <Form.Group controlId='select'>
                <Form.Label className='form-label'>{t('Price Range')} :</Form.Label>
                <Select
                    className='form-select'
                    onChange={setPriceRangeItem}
                    options={priceRangeList}
                />
            </Form.Group>
            <Button variant="outline-primary" type="submit" size="lg" onClick={handleSubmit}>Submit</Button>
        </Form>
    )
}

export default ModalAdd;
