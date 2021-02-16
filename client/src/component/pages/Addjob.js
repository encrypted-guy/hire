import React,  {useState, useContext, useEffect} from 'react'
import AJobprofile from './AJobprofile'
import Jobcontext from '../../context/JobContext'
import AlertContext from '../../context/Alert/AlertContext'
import AuthContext from '../../context/auth/AuthContext'
const Addjob = props => {
    const {loaduser, user} = useContext(AuthContext)
    const {addjob} = useContext(Jobcontext)
    const {setalert} = useContext(AlertContext)
    useEffect(() => {
        loaduser()
        // eslint-disable-next-line
    }, [])

    const [job, Setjob] = useState({
        title: '',
        salary: '',
        country: '',
        address: '',
        work_type: '',
        description: ''
    })
    const { title, salary, country, address,  description} = job

    const HandleChange = e => {
        Setjob({
            ...job,
            [e.target.name]: e.target.value
        })
    }
    const HandleSubmit = e => {
        e.preventDefault()
        if(title === '' || salary === '' || description === ''){
            setalert('please enter all feilds', 'danger')
        } else if(isNaN(salary)){
            setalert('salary must be a number', 'danger')
        } else{
            addjob(job)
            props.history.push(`/job/publisher/${user._id}`);
        }
    }
    return (
        <>
        <AJobprofile />
            <div className="container">
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={HandleSubmit}>
                            <div className="form-group">
                                <label >Job Title</label>
                                <input onChange={HandleChange} name='title' value={title} type="text" className="form-control" placeholder="eg: noedjs / js developer" />
                            </div>
                            <div className="form-group">
                                <label >salary / year</label>
                                <input onChange={HandleChange} name='salary' value={salary} type="text" className="form-control" placeholder="eg: $ 12000" />
                            </div>
                            <div className="form-group">
                                <label >Country</label>
                                <input onChange={HandleChange} name='country' value={country} type="text" className="form-control" placeholder={user && user.country}   />
                            </div>
                            <div className="form-group">
                                <label >Office Location</label>
                                <input onChange={HandleChange} name='address' value={address} type="text" className="form-control" placeholder={user && user.address}  />
                            </div>
                            <div className="form-group">
                                <label>Work Type</label>
                                <select onChange={HandleChange} name='work_type' className="form-control" >
                                    <option>remote</option>
                                    <option>in office</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label >Job Description</label>
                                <textarea onChange={HandleChange} name='description' defaultValue={description} className="form-control"  rows="3"></textarea>
                            </div>
                            <button className="btn btn-danger btn-block">Add Job To List</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Addjob
