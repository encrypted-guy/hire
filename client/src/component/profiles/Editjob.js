import React, {useState, useContext, useEffect} from 'react'
import JobContext from '../../context/JobContext'
import AuthContext from '../../context/auth/AuthContext'
const Editjob = props => {
    const {loaduser} = useContext(AuthContext)
    const {updatejob } = useContext(JobContext)
    const [editjob, seteditjob] = useState({
        title: '',
        salary: '',
        country: '',
        address: '',
        description: ''
    })
    const { title, salary, country, address,  description} = editjob
    useEffect(() => {
        loaduser()
        seteditjob(props.location.state)
        // eslint-disable-next-line
    }, [])
    const HandleChange = e => {
        seteditjob({
            ...editjob,
            [e.target.name]: e.target.value
        })
    }
    const HandleSubmit = e => {
        e.preventDefault()
        updatejob(editjob)
        props.history.push(`/job/publisher/${props.location.state.user}`);
    }

    return (
        <>
            <div className="container">
                <div className='text-start border-bottom my-3'>
                    <h5>Edit job . {title}</h5>

                </div>
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
                                <input onChange={HandleChange} name='country' value={country} type="text" className="form-control" placeholder='country'   />
                            </div>
                            <div className="form-group">
                                <label >Office Location</label>
                                <input onChange={HandleChange} name='address' value={address} type="text" className="form-control" placeholder='address'  />
                            </div>
                            <div className="form-group">
                                <label >Job Description</label>
                                <textarea onChange={HandleChange} name='description' defaultValue={description} className="form-control"  rows="3"></textarea>
                            </div>
                            <button className="btn btn-danger btn-block">Edit Job</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    
    ) 
  
}

export default Editjob
