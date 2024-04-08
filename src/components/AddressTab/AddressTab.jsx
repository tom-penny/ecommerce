import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createAddress, deleteAddress, fetchAddresses } from '../../reducers/address.reducer.js'
import { BsTrash } from 'react-icons/bs'
import { BarLoader } from 'react-spinners'
import AddressMap from './AddressMap/AddressMap.jsx'

import './AddressTab.scss'

const AddressTab = ({ userId }) => {

    const dispatch = useDispatch()

    const { addresses, status, error } = useSelector(state => state.address)

    const [address, setAddress] = useState({})

    useEffect(() => {
        if (userId) dispatch(fetchAddresses({ userId }))
    }, [dispatch, userId])

    const handleSelectAddress = (selectedAddress) => {
        setAddress(selectedAddress)
    }

    const handleSaveAddress = () => {
        dispatch(createAddress({ userId, address }))
    }

    const handleDeleteAddress = (addressId) => {
        dispatch(deleteAddress({ userId, addressId }))
    }

    return <div className='address-tab'>
        <AddressMap onSelectAddress={handleSelectAddress}/>
        <button className='address-tab__btn' onClick={handleSaveAddress} disabled={status === 'loading'} data-test='save-address'>
            {status === 'loading' ? <BarLoader loading={true} size={8}/> : 'Save Address'}
        </button>
        <div className='address-list'>
            {status === 'failed' && <div>{error}</div>}
            {addresses.map((address) => (
                <AddressCard key={address.id} address={address}>
                    <BsTrash onClick={() => handleDeleteAddress(address.id)}/>
                </AddressCard>
            ))}
        </div>
    </div>
}

export default AddressTab