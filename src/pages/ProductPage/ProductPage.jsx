import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import { Quantifier, ProductSlider } from '../../components'
import { selectById } from '../../selectors/product.selectors'
import { fetchProducts } from '../../reducers/product.reducer'
import useBasket from '../../hooks/useBasket'

import './ProductPage.scss'

export const ProductPage = () => {
    const dispatch = useDispatch()
    const { productId } = useParams()
    const { addToBasket } = useBasket()
    const product = useSelector(state => selectById(state, productId))

    const isMobile = useMediaQuery({ maxWidth: 768 })

    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        if (!product) dispatch(fetchProducts())
    }, [dispatch, product])

    const handleClick = (value) => {
        setQuantity(quantity => {
            quantity += value
            return quantity > 1 ? quantity : 1
        })
    }

    if (!product) return null

    const ProductGallery = () => (
        <div className='product-gallery'>
            {product.images.map(image => <img className='product-gallery__img' key={image} src={image}/>)}
        </div>
    )

    return <div className='product-page'>
        {isMobile ? <ProductSlider images={product.images}/> : <ProductGallery/>}
        <div className='product-details'>
            <div className='product-details__content'>
                <div className='product-details__name'>{product.name}</div>
                <div className='product-details__description'>Lorem, ipsum dolor sit amet consectetur adipisicing
                    elit. Ullam et, sit, reiciendis accusamus ad quod doloribus nobis facere similique dolore alias
                    aperiam. Molestiae sequi ad totam autem reprehenderit itaque fuga.</div>
                <div className='product-details__controls'>
                    <button className='product-details__btn' onClick={() => addToBasket(product, quantity)}
                        data-test='add-product'>Add to basket</button>
                    <Quantifier quantity={quantity} decrement={() => handleClick(-1)} increment={() => handleClick(1)}/>
                </div>
            </div>
        </div>
    </div>
}

export default ProductPage