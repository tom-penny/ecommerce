import { IoAddOutline, IoRemoveOutline } from 'react-icons/io5'

import './Quantifier.scss'

const Quantifier = ({ quantity, decrement, increment }) => {

    return <div className='quantifier'>
        <div className='quantifier__btn' onClick={() => decrement()} data-test='decrement'><IoRemoveOutline/></div>
        <div className='quantifier__value' data-test='item-quantity'>{quantity}</div>
        <div className='quantifier__btn' onClick={() => increment()} data-test='increment'><IoAddOutline/></div>
    </div>
}

export default Quantifier