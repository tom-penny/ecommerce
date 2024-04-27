import './EmptyState.scss'

const EmptyState = ({ heading, message, children }) => {

    return <div className='empty-state'>
        <div className='empty-state__heading'>{heading}</div>
        <div className='empty-state__message'>{message}</div>
        {children}
    </div>
}

export default EmptyState