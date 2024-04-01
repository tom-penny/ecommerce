import classNames from 'classnames'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchUser } from './reducers/user.reducer'

import './App.scss'

function App() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchUser())
    }, [dispatch])

    return <div className={classNames('app', { 'app--locked': menuOpen })}>
        <BrowserRouter>
            <Routes>
                
            </Routes>
        </BrowserRouter>
    </div>
}

export default App