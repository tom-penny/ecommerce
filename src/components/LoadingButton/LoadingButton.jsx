import { BarLoader } from 'react-spinners'

import './LoadingButton.scss'

const LoadingButton = ({ isLoading, children, onClick, className = '', ...props }) => {
    return <button className={`loading-button ${className}`} onClick={onClick} disabled={isLoading} {...props}>
        {isLoading ? <BarLoader loading={true} size={8}/> : children}
    </button>
}

export default LoadingButton