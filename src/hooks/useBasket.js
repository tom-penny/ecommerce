import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setBasket, resetBasket } from '../reducers/basket.reducer.js'

export const useBasket = () => {
    
    const dispatch = useDispatch()

    const basket = useSelector(state => state.basket)

    useEffect(() => {
        dispatch(setBasket(getLocalBasket()))
    }, [dispatch])

    const saveChanges = (basket) => {
        setLocalBasket(basket)
        dispatch(setBasket(basket))
    }

    const addToBasket = (product, quantity = 1) => {
        const newBasket = { ...basket }
        const { id, name, price, images } = product

        if (newBasket[id]) {
            newBasket[id] = { ...newBasket[id] }
            newBasket[id].quantity += quantity
        }
        else {
            newBasket[id] = {
                displayName: name,
                displayImage: images[0] ?? '',
                unitPrice: price,
                quantity
            }
        }

        saveChanges(newBasket)
    }

    const removeFromBasket = (productId) => {
        const newBasket = { ...basket }

        newBasket[productId] = { ...newBasket[productId] }
        delete newBasket[productId]

        saveChanges(newBasket)
    }

    const incrementQuantity = (productId) => {
        const newBasket = { ...basket }

        if (!newBasket[productId]) return

        newBasket[productId] = { ...newBasket[productId] }
        newBasket[productId].quantity += 1

        saveChanges(newBasket)
    }

    const decrementQuantity = (productId) => {
        const newBasket = { ...basket }

        if (!newBasket[productId]) return

        newBasket[productId] = { ...newBasket[productId] }
        newBasket[productId].quantity -= 1

        if (newBasket[productId].quantity <= 0) {
            delete newBasket[productId]
        }

        saveChanges(newBasket)
    }

    const clearBasket = () => {
        dispatch(resetBasket())
    }

    return { addToBasket, removeFromBasket, incrementQuantity, decrementQuantity, clearBasket }
}

export default useBasket