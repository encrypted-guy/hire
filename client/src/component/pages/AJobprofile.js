import React, {useContext, useEffect} from 'react'
import AuthContext from '../../context/auth/AuthContext'
import Spinner from '../layouts/Spinner'

const AJobprofile = () => {
    const {loaduser, user} = useContext(AuthContext)

    useEffect(() => {
        loaduser()
        // eslint-disable-next-line
    }, [])

    if(!user) return <Spinner />

    return (
        <div className="container">
            <div className="media m-2">
                <img src={user && user.profile} width="80px" className="mr-3 companyimg rounded border border-secondary"
                    alt="..." />
                <div className="media-body">
                    <h6 className="mt-3">Add a New job to {user && user.name}</h6>
                </div>
            </div>
        </div>
    )
}

export default AJobprofile 
