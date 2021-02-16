import React, {useContext, useEffect } from 'react'
import Spinner from '../layouts/Spinner'
import {Link} from 'react-router-dom'
import Jobcontext from '../../context/JobContext'
import AuthContext from '../../context/auth/AuthContext'
const Single = props => {
    const {loading, singlejob, singlejobfunc} = useContext(Jobcontext)
    const {loaduser, user} = useContext(AuthContext)
    useEffect(() => {
        loaduser()
        singlejobfunc(props.match.params.job_id)
        // eslint-disable-next-line
    }, [props])
    // const job = jobs.find(x => x._id === props.match.params.job_id);

    if(loading) return <Spinner />

    // console.log(singlejob) 
    // console.log(Object.keys(singlejob).length) // CHECK THE LENGTH OF THE OBJECT

    if(Object.keys(singlejob).length > 0){
        return (
            <>
                <div className="container">
                    <div className="media m-2">
                        <img src={singlejob.user.profile} width="80px" className="mr-3 rounded border border-secondary" alt={singlejob.user.name} />
                        <div className="media-body">
                            <h5 className="mt-0 single-company-name"> <Link to={`/job/publisher/${singlejob.user._id}`}>{singlejob.user.name}</Link> </h5>
                            <a href={singlejob.user.website}>
                                <h5 className="mt-0">visit website</h5>
                            </a>
                            <h5 className="mt-0">{singlejob.user.country} | {singlejob.user.address}</h5>
                            
                        </div>
                    </div>
                    <div className="m-3">
                        <h6>$ {singlejob.salary} /year</h6>
                        <h5>{singlejob.title} |<small className="text-muted">  posted - {singlejob.created_At}</small></h5>
                        <h5 className="border-bottom" >Description of Position</h5>
                        <p>
                            {singlejob.description}
                        </p>
                    </div>
                </div>

                {
                    user ? (
                        <div className="container">
                            <div className="card p-2 m-2 apply-mail">
                                <h6 className="m-2">Direct : <span>{singlejob.user.email}</span> </h6>
                                <a target='blank' className="btn m-2 btn-danger" href={singlejob.user.website}><h6>Apply on company site</h6></a>
                            </div>
                        </div>
                    ) : (
                        <div className="container">
                            <div className="card p-2 m-2 apply-mail">
                                <h6 className="m-2 text-center"><span className='text-muted'> <Link to='/sign-in' className='text-danger'>Sign in</Link>  to see the details</span> </h6>
                            </div>
                        </div>
                    )
                }

            </>
        )
    }else{
        return <Spinner />
    }
}

export default Single
