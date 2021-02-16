import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import AuthContext from '../../context/auth/AuthContext'
const User = props => {
    const {logout} = useContext(AuthContext)

    const user = props.location.state
    const handlelogout = () => { 
        logout()
        props.history.push('/sign-in')
        window.location.reload(); 
    }
    return (
        <>
            {
                user ? (
                    <div className="container">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Account Infomation</h5>
                                <h6 className="card-subtitle mb-2 my-2  text-muted">{user.name}</h6>
                                <h6 className="card-subtitle mb-2 my-2  text-muted">{user.email}</h6>
                                <button onClick={handlelogout} className="btn my-2 btn-danger" href="">Sign Out</button>
                                <Link to='/' className='d-block mb-2 my-1  text-danger' >back to browser jobs</Link>
                            </div>
                        </div>
                    </div>
                ) : null
            }

        </>
    )
}

export default User
