import React, {useContext, useEffect} from 'react'
import CompanytextEdit from './CompanytextEdit'
import CompanyImage from './CompanyImage'
import ConpanyJoblist from './ConpanyJoblist'
import {Link} from 'react-router-dom'
import AuthContext from '../../context/auth/AuthContext'
import UserContext from '../../context/users/UserContext'
import Spinner from '../layouts/Spinner'

const Company = props => {
    const {user, loaduser} =useContext(AuthContext)
    const {getpublisher, publisher, job_listing, loading} = useContext(UserContext)
    useEffect(() => {
        loaduser()
        getpublisher(props.match.params.publisher_id)
        // eslint-disable-next-line
    }, [])
    if (loading) return <Spinner />
  
    if(Object.keys(publisher).length > 0){
        return (
            <div className="container">
                <div className="media m-2">
                    <CompanyImage publisher={publisher} />
                    <div className="media-body">
                        <h5 className="mt-0 single-company-name"> <a href="/">{publisher.name}</a> </h5>
                        <a target='blank' href={publisher.website}>
                            <h5 className="mt-0">Visit Website</h5>
                        </a>
                        <h5 className="mt-0">{publisher.country} | {publisher.address}</h5>
                    </div>
                    {
                        user && user._id === publisher._id ? (
                            <>
                                <CompanytextEdit publisher={publisher} />
                            </>
                            
                        ) : null
                    }
                    
                </div>

                {
                    user && user._id === publisher._id ? (
                        <Link to="/add-new">
                            <button type="button" className="companybtn ml-2 btn btn-danger">Add New job</button>
                        </Link>
                    ) :null
                }
                
                {
                    job_listing.map(job => (
                        <ConpanyJoblist key={job._id} job={job} />
                    ))
                }
                
            </div>
        )
        
    } else return <Spinner />
    
}

export default Company