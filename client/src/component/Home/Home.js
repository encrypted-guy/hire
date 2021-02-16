import React, {useContext, useEffect} from 'react'
import Search from './Search'
import Joblist from './Joblist'
import Pagniation from './Pagniation'
import Authcontext from '../../context/auth/AuthContext'

const Home = () => {
    const {loaduser} =useContext(Authcontext)
    useEffect(() => {
        loaduser()
        // eslint-disable-next-line
    }, [])
    return (
        <div>
            <Search />
            <Joblist />
            <Pagniation />
        </div>
    )
}

export default Home