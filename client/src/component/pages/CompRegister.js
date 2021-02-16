import React, {useState, useContext, useEffect} from 'react'
import Logored from './logored.png'
import AlertContext from '../../context/Alert/AlertContext'
import AuthContext from '../../context/auth/AuthContext'

const CompRegister = props => {
    const {setalert} = useContext(AlertContext)
    const {register, error, clearErrors, isAuthenticated} = useContext(AuthContext)

    const [user, setUser] = useState({
        name: '',
        country: '',
        website: '',
        address: '',
        user_type: 'company',
        email: '',
        phone: '',
        password: '',
        password2: ''
    })  
    const {name,country, website, address, email,  password, password2} = user
    
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
        if(email === ''|| country ==='' ||website ===''|| address === '' || password === '' || name === '' || password2 === ''){
            setalert('please enter all feilds', 'danger')
        } 
        else if (password !==  password2){
            setalert('password does not match', 'danger')
        } 
        else{
            register(user)
        }
    }
    return (
        <div className="container css-center">
            <div className="text-center sign shadow-sm">
                <div className="card p-2" style={{width: '25rem'}}>
                    <form onSubmit={HandleSubmit}>
                        <img className="mb-4" src={Logored} alt="" width="150px" />
                        <h1 className="h4 mb-3 font-weight-bold">SIGN UP as Company</h1>
                        <input onChange={HandleChange} name='name' type="text" className="form-control my-2" placeholder="company name" required autoFocus />
                        <input onChange={HandleChange} name='country' type="text" className="form-control my-2" placeholder="Remote, usa, etc..."  />
                        <input onChange={HandleChange} name='website' type="text" className="form-control my-2" placeholder="https://example.com" required />
                        <input onChange={HandleChange} name='address' type="text" className="form-control my-2" placeholder="address / office location"  />
                        <input onChange={HandleChange} name='email' type="email" className="form-control my-2" placeholder="Your@mail.com" required />
                        <input onChange={HandleChange} name='phone' type="text" className="form-control my-2" placeholder="phone (optional)"  />
                        <input onChange={HandleChange} name='password' type="password"  className="form-control my-2" placeholder="Password" required />
                        <input onChange={HandleChange} name='password2' type="password"  className="form-control my-2" placeholder="confirm password" required />
                        <button className="btn btn-lg btn-danger btn-block my-2" type="submit">Sign up</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CompRegister
