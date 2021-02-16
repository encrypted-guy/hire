import React, { useContext} from 'react'
import {Link } from 'react-router-dom'
import Usercontext from '../../context/users/UserContext'
const Companybuttons = ({job}) => {
    const {deletejob} = useContext(Usercontext)
    return (
        <>
            <span className="nav-link bg-danger text-light dropdown-toggle" data-toggle="dropdown" href="/" role="button" aria-haspopup="true" aria-expanded="false"></span>
            <div className="dropdown-menu comp-menu">
                <span  data-toggle="modal" data-target={`#delete${job._id}`} className="dropdown-item">DELETE</span>
                <Link to={{
                    pathname: `/job/edit/${job._id}`,
                    state: job 
                    }} className="dropdown-item" >EDIT</Link>
            </div>

            <div className="modal fade" id={`delete${job._id}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div className="modal-dialog" role="document">
                
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">DELETE . {job.title}</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body form-group">
                                <div className="media m-2">
                                    <div className="media-body">
                                        <button  data-dismiss="modal" onClick={() => deletejob(job._id)} className="btn btn-danger btn-block text-light">confirm delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                   
                </div>
            </div>
        </>
    )
}

export default Companybuttons