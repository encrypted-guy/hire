import React from 'react'
import {Link} from 'react-router-dom'
import Logored from './logored.png'

const Footer = () => {
    return (
        <footer className="pt-4 mt-5 pt-md-5 bg-light border-top">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-4">
                        <img className="mb-2" src={Logored} alt="" width="150" />
                        <small className="d-block mb-3 text-muted">&copy; 2020 | encrypted_guy</small>
                    </div>

                    <div className="col-12 col-md-4">
                        <h5>Links</h5>
                        <ul className="list-unstyled text-small">
                            <li><Link to='/' className="text-muted" >Home</Link></li> 
                            <li><Link to='/' className="text-muted" >Privacy</Link></li>
                            <li><Link to='/' className="text-muted" >Terms</Link></li>
                        </ul>
                    </div>
                    <div className="col-12 col-md-4">
                        <h5>Connect with us</h5>
                        <ul className="list-unstyled text-small">
                            <li><Link to='/' className="text-muted" >Facebook</Link></li>
                            <li><Link to='/' className="text-muted" >Iinkedin</Link></li>
                            <li><Link to='/' className="text-muted" >Instergram</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
