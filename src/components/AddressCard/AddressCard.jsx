import './AddressCard.scss'

const AddressCard = ({ address, children }) => {

    const { id, street, city, country, postCode } = address

    return <div className='address-card' data-test='address-card' data-testid={id}>
        {children && <div className='address-card__action'>{children}</div>}
        <div className='address-card__field'>{street}</div>
        <div className='address-card__field'>{city}</div>
        <div className='address-card__field'>{country}</div>
        <div className='address-card__field'>{postCode}</div>
    </div>
}

export default AddressCard