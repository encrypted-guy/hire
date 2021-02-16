import React, {useState, useContext, useEffect} from 'react'
import UserContext from '../../context/users/UserContext'
import AuthContext from '../../context/auth/AuthContext'
const CompanyImage = ({publisher, history}) => {
    const profile = publisher.profile
    const {uploadphoto} = useContext(UserContext)
    const {user, loaduser} =useContext(AuthContext)
    const [file, setFile] = useState('');

    useEffect(() => {
        loaduser()
        // eslint-disable-next-line
    }, [])

    const Handlechange = e =>{
        setFile(e.target.files[0])
        // console.log(e.target.files[0])
    }
    
    const HandleSubmit = () =>{
        const data = new FormData() 
        data.append('file', file)
        uploadphoto(data)
    }
 
    return (
        <>  
            {
                user && user._id === publisher._id ? (
                    <div className="test-photo-upload" data-toggle="modal" data-target="#imagechange">
                        <img src={profile} width="80px" className="mr-3 companyimg rounded border border-secondary" alt="..." />
                        <small className="text-black-50 text-small-image">click change profile</small>
                    </div>
                ) : (
                    <div className="test-photo-upload" >
                        <img src={profile} width="80px" className="mr-3 companyimg rounded border border-secondary" alt="..." />
                    </div>
                )
            }

            <div className="modal fade" id="imagechange" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"
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
                                        <label htmlFor="file-upload" className="custom-file-upload">
                                            Upload a photo
                                        </label>
                                        <input onChange={Handlechange} id="file-upload" type="file" name="file" />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                <button type="submit" className="btn btn-danger">upload</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}

export default CompanyImage
