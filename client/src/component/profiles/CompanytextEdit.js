import React, {useState, useEffect, useContext} from 'react'
import UserContext from '../../context/users/UserContext'
import { useHistory } from 'react-router-dom'
import Authcontext from '../../context/auth/AuthContext'
const CompanytextEdit = ({publisher}) => {
    const {logout} = useContext(Authcontext)
    const {usereditfunc}  = useContext(UserContext)
    const [useredit, setUserEdit] = useState({
        name: '',
        website: '',
        country: '',
        address: ''
    })
    const {name, website, country, address} = useredit
    useEffect(() => {
        setUserEdit(publisher)
        // eslint-disable-next-line
    }, [])
    const HandleChange = e => {
        setUserEdit({
            ...useredit,
            [e.target.name]: e.target.value
        })
    }
    const HandleSubmit = e => {
        e.preventDefault()
        usereditfunc(useredit)
        console.log(useredit)
        window.location.reload();
    }
    let history = useHistory();
    const handleclick = () => {
        logout()
        history.push('/sign-in')
        window.location.reload();
    }
    return (
        <>
            <div className='btn-setups'>
                <button type="button" className="btn companybtn btn-danger" data-toggle="modal" data-target="#exampleModal">EDIT</button>
                <button onClick={handleclick} className="btn companybtn btn-danger mt-2">sign out</button>
            </div>
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <form onSubmit={HandleSubmit}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">EDIT PROFILE</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body form-group">
                                <div className="media m-2">
                                    <div className="media-body">
                                        <input onChange={HandleChange} type="text" className="form-control my-1" value={name} name="name" />
                                        <input onChange={HandleChange} type="text" className="form-control my-1" value={website} name="website" />
                                        <input onChange={HandleChange} type="text" className="form-control my-1" value={country} name="country"  />
                                        <input onChange={HandleChange} type="text" className="form-control my-1" value={address} name="address"  />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                <button type="submit" className="btn btn-danger">Update</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CompanytextEdit
