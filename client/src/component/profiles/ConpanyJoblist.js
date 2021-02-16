import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import Companybuttons from './Companybuttons'
import AuthContext from '../../context/auth/AuthContext'
const ConpanyJoblist = ({job}) => {
    const {user} = useContext(AuthContext)
    return (
        <>
            <div className="card my-3  shadow-sm ">
                <div className="card-body cardlist">
                    <div className="float-right">
                        <ul className="nav nav-pills">
                            {
                                user && user._id === job.user ? (
                                    <li className="nav-item dropdown">
                                        <Companybuttons job={job} />
                                    </li>
                                ) :null
                            }
                        
                        </ul>
                    </div>
                    <Link to={`/job_id/${job._id}`}>
                        <h5 className="card-title ">{job.title}</h5>
                    </Link>
                    <h6 className="card-title">{job.company_name}</h6>
                    <p className="card-text">{job.country} | {job.address}</p>
                    <p className="card-text"><small className="text-muted">posted - {job.created_At}</small></p>
                </div>
            </div>
        </>
    )
}

export default ConpanyJoblist
