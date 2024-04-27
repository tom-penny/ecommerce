import { useNavigate } from 'react-router-dom'
import { EmptyState } from '../../components'

import './NotFoundPage.scss'

const NotFoundPage = () => {
    const navigate = useNavigate()

    return <div className='not-found-page'>
        <EmptyState heading='404' message='Page not found.'>
            <button className='not-found-page__btn' onClick={() => navigate('/catalogue')}>Shop now</button>
        </EmptyState>
    </div>
}

export default NotFoundPage