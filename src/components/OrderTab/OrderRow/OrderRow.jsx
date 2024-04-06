import classNames from 'classnames'
import { useState } from 'react'

import './OrderRow.scss'

const OrderRow = ({ order }) => {
    const [isOpen, setOpen] = useState(false)

    const { id, checkoutId, amount, status } = order

    return <div className='order-row' data-test='order-row' data-testid={checkoutId}>
        <div className='order-row__content' onClick={() => setOpen(!isOpen)}>
            <div className='order-row__field'>Order: {id}</div>
            <div className='order-row__field'>Total: £{parseFloat(amount).toFixed(2)}</div>
            <div className='order-row__field'>Status: {status}</div>
            <div className='order-row__toggle'>
                <div className={classNames('order-row__toggle-line', { 'order-row__toggle-line--active': isOpen })}/>
                <div className={classNames('order-row__toggle-line', { 'order-row__toggle-line--active': isOpen })}/>
            </div>
        </div>
        {isOpen &&
            <div className='order-row__items'>
                {order.items.map(item => (
                    <div className='order-row__item' key={item.id}>
                        <div className='order-row__field'>Product: {item.productId}</div>
                        <div className='order-row__field'>Unit Price: {item.unitPrice}</div>
                        <div className='order-row__field'>Quantity: {item.quantity}</div>
                    </div>
                ))}
            </div>
        }
    </div>
}

export default OrderRow