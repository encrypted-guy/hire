import React, {useContext, useEffect} from 'react'
import {Link} from 'react-router-dom'
import Spinner from '../layouts/Spinner'
import Jobcontext from '../../context/JobContext'
const Joblist = () => {
    const {jobs, searched, loading, getjobslist} = useContext(Jobcontext)
    useEffect(() => {
        getjobslist()
        // eslint-disable-next-line
    }, [])
    
    if(loading) return <Spinner />

    return (
        <div className="container">
            {   
                searched !== null ?
                searched.map(job => (
                    <div key={job._id} className="card my-3  shadow-sm ">
                        <div className="card-body cardlist">
                            <Link to={`/job_id/${job._id}`}>
                                <h5 className="card-title ">{job.title}</h5>
                            </Link>
                            <h6 className="card-title">{job.company_name}</h6>
                            <p className="card-text">{job.country} | {job.address}</p>
                            <p className="card-text"><small className="text-muted">posted - {job.created_At}</small></p>
                        </div>
                    </div>
                ))

                :

                jobs.map(job => (
                    <div key={job._id} className="card my-3  shadow-sm ">
                        <div className="card-body cardlist">
                            <Link to={`/job_id/${job._id}`}>
                                <h5 className="card-title ">{job.title}</h5>
                            </Link>
                            <h6 className="card-title">{job.company_name}</h6>
                            <p className="card-text">{job.country} | {job.address}</p>
                            <p className="card-text"><small className="text-muted">posted - {job.created_At}</small></p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Joblist
