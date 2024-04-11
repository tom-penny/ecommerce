import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectTotalValue } from '../../selectors/basket.selectors'
import { checkoutBasket, resetCheckout } from '../../reducers/basket.reducer'
import { BarLoader } from 'react-spinners'
import useAuth from '../../hooks/useAuth'
import useBasket from '../../hooks/useBasket'

import './CheckoutPage.scss'

const CheckoutPage = () => {

    const dispatch = useDispatch()
    const isAuthenticated = useAuth()
    const { clearBasket } = useBasket()
    const { userId } = useSelector(state => state.user)
    const { basket, checkoutId, status } = useSelector(state => state.basket)

    const total = useSelector(selectTotalValue)

    useEffect(() => () => dispatch(resetCheckout()), [dispatch])

    useEffect(() => {
        if (checkoutId) clearBasket()
    }, [dispatch, checkoutId])

    const handleClick = () => {
        dispatch(checkoutBasket({ userId, basket }))
    }

    if (!isAuthenticated) return null

    if (checkoutId) {
        return <div className='checkout-page'>
            <div className='checkout-result'>
                <div className='checkout-result__message' data-test='checkout-message'>Thanks for your order!</div>
                <div className='checkout-result__reference'>ID: {checkoutId}</div>
            </div>
        </div>
    }

    return <div className='checkout-page'>
        <div className='checkout-page__total'>Amount due: £{parseFloat(total).toFixed(2)}</div>
        <button className='checkout-page__btn' onClick={handleClick} data-test='submit-checkout'>
            {status === 'loading' ? <BarLoader loading={true} size={8}/> : 'Submit order'}
        </button>
    </div>

}

export default CheckoutPage