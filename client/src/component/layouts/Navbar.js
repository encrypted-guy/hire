import React, {useContext, useEffect} from 'react'
import Logo from './logso.png'
import {Link} from 'react-router-dom'
import NavProfile from './profilenav.jpg'
import Authcontext from '../../context/auth/AuthContext'

const Navbar = () => {
    const {isAuthenticated, user, loaduser} = useContext(Authcontext)
    useEffect(() => {
        loaduser()
        // eslint-disable-next-line
    }, [isAuthenticated])
    return (
        <header>
            <nav className="navbar navbar-expand-md navbar-dark bg-danger fixed-top">
                <div className="container">
                    <Link to="/" className="navbar-brand">
                        <img className="logo-img" src={Logo} alt="" />
                    </Link>
       
                    <ul className="navbar-nav ml-auto">
                        {
                            isAuthenticated ? (
                                <>
                                {
                                    user && user.user_type === 'company' ? (
                                        <li className="nav-item"><Link to={`/job/publisher/${user._id}`} className="nav-link text-light">
                                            <img src={user.profile} className="nav-profile" alt="" />
                                        </Link></li>
                                    ) 
                                    :
                                    (
                                        <li className="nav-item"><Link to={{
                                            pathname: `/user/${user && user._id}`,
                                            state: user
                                        }} className="nav-link text-light">
                                            <img src={NavProfile} className="nav-profile" alt="" />
                                        </Link></li>
                                    )
                                }
                            
                                </>
                            ) : (
                                <li className="nav-item "><Link to="/sign-in" className="nav-link text-light border rounded border-light pl-3 pr-3 ">Sign In</Link></li>
                            )
                        }
                    </ul>
                     
              
                </div>
            </nav>
            <section className="headfix"></section>
        </header>
    )
}

export default Navbar
