import { useNavigate } from 'react-router-dom'

import './HomePage.scss'

const HomePage = () => {

    const navigate = useNavigate()

    return <div className='home-page'>
        <div className='hero-section'>
            <div className='hero-section__content'>
                <div className='hero-section__title'>Lorem ipsum.<br/>Lorem ipsum.</div>
                <div className='hero-section__caption'>Lorem ipsum dolor, sit amet consectetur.</div>
                <button className='hero-section__btn' onClick={() => navigate('/catalogue')}>Shop now</button>
            </div>
        </div>
    </div>
}

export default HomePage