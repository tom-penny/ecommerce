import { useEffect } from 'react'
import { Pagination } from 'swiper/modules'
import Swiper from 'swiper'

import 'swiper/css'
import 'swiper/css/pagination'
import './ProductSlider.scss'

const ProductSlider = ({ images }) => {
    useEffect(() => {
        new Swiper('.swiper-container', {
            modules: [Pagination],
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            loop: true,
        })
    }, [])

    return <div className='product-slider swiper-container'>
        <div className='product-slider__wrapper swiper-wrapper'>
            {images.map(image => <img className='product-slider__img swiper-slide' key={image} src={image}/>)}
        </div>
        <div className='swiper-pagination'/>
    </div>
}

export default ProductSlider