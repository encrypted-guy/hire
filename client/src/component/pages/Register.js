import React, {useState ,useContext, useEffect} from 'react'
import Logored from './logored.png'
import AlertContext from '../../context/Alert/AlertContext'
import AuthContext from '../../context/auth/AuthContext'
const Register = props => {
    const {setalert} = useContext(AlertContext)
    const {register, error,clearErrors, isAuthenticated} = useContext(AuthContext)
    const [user, setUser] = useState({
        name: '',
        email: '',
        user_type: 'normal',
        password: '',
        password2: ''
    })
    const {name, email, password, password2} = user

    useEffect(() => {
        if(isAuthenticated){
            props.history.push('/');
        }
        if(error){
            setalert(error, 'danger')
            clearErrors()
        }
    })

    const HandleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }
    
    const HandleSubmit = e => {
        e.preventDefault()
        if(email === '' || password === '' || name === '' || password2 === ''){
            setalert('please enter all feilds', 'danger')
        }
        if(password !==  password2){
            setalert('password does not match', 'danger')
        } 
        else{
            register(user)
        //   console.log(name, '|',  email, '|', password)
        }
    }
    
    return (
        <div className="container css-center">
            <div className="text-center sign shadow-sm">
                <div className="card p-2" style={{width: '25rem'}}>
                    <form onSubmit={HandleSubmit}>
                        <img className="mb-4" src={Logored} alt="" width="150px" />
                        <h1 className="h3 mb-3 font-weight-bold">SIGN UP</h1>
                        <input onChange={HandleChange} name='name' type="text" className="form-control my-2" placeholder="your name" required autoFocus />
                        <input onChange={HandleChange} name='email' type="email" className="form-control my-2" placeholder="your@email.com" required />
                        <input onChange={HandleChange} name='password' type="password"  className="form-control my-2" placeholder="Password" required />
                        <input onChange={HandleChange} name='password2' type="password"  className="form-control my-2" placeholder="confirm password" required />
                        <button className="btn btn-lg btn-danger btn-block my-2" type="submit">Sign up</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register
