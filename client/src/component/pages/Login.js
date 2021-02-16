import React, {useState, useContext, useEffect} from 'react'
import Logored from './logored.png'
import {Link} from 'react-router-dom'
import AlertContext from '../../context/Alert/AlertContext'
import AuthContext from '../../context/auth/AuthContext'

const Login = props => {
    const {login, error, loaduser, clearErrors, isAuthenticated} = useContext(AuthContext)

    const {setalert} = useContext(AlertContext)
    const [user, setUser] = useState({
        email: '',
        password: ''
    }) 
    const {email, password} = user

    useEffect(() => {
        loaduser()
        if(isAuthenticated){
            props.history.push('/');
        }
        if(error){
            setalert(error, 'danger')
            clearErrors()
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history ])

    const HandleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const HandleSubmit = e => {
        e.preventDefault()
        if(email === '' || password === ''){
            setalert('invalid credentials', 'danger')
        } 
        else{
            login(user)
        }
    }

    return (
        <div className="container css-center">
            <div className="text-center sign shadow-sm">
                <div className="card p-2">
                    <form onSubmit={HandleSubmit}>
                        <img className="mb-4" src={Logored} alt="" width="150px" />
                        <h1 className="h3 mb-3 font-weight-bold">SIGN IN</h1>
                        <input onChange={HandleChange} name='email' type="email" className="form-control my-2" placeholder="your@email.com"  autoFocus />
                        <input onChange={HandleChange} name='password' type="password"  className="form-control my-2" placeholder="Password"  />
                        <button className="btn btn-lg btn-danger btn-block my-2" type="submit">Sign in</button>
                    </form>
                </div>
            </div>
            <Link to="/sign-up"><span>Sign Up</span></Link>
            <Link to="/publisher-sign-up"><span>Sign up as a Company</span></Link>
        </div>
    )
}

export default Login
