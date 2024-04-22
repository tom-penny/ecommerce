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
        <div className='featured-section'>
            <div className='featured-section__blurb'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, nulla tenetur est, ex suscipit, asperiores qui id accusantium expedita dicta porro. Temporibus dicta obcaecati dolore quaerat sed, quasi consequuntur necessitatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut possimus tempora eius earum voluptates id commodi ab, fugiat quisquam, animi quo itaque? Cum adipisci officia saepe velit perferendis corrupti earum?
        </div>
        <div className='featured-section__marquee'>
            <div className='featured-section__span'>
                Something written here. Something written here. Something written here.
                Something written here. Something written here. Something written here.
            </div>
        </div>
    </div>
    </div>
}

export default HomePage