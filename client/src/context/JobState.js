import React, {useReducer} from 'react'
import axios from 'axios'
import Jobreducer from './JobReducer'
import JobContext from './JobContext'

const JobState = props => {
    const InitState = {
        jobs: [],
        searched: null,
        pagination: {},
        loading: false,
        singlejob: {},
        error: null
    }
    const [state, dispatch] = useReducer(Jobreducer, InitState)
    ///---------------------------------------------------------

    // GET JOBS FROM API
    const getjobslist = async (page, link) => {
        try {
            setLoading()
            if(link){
                const res = await axios.get(`/api/v1/job?page=${page ? page : 1}${link ? link : ''}`)
                dispatch({
                    type: 'SEARCHED_JOBS',
                    payload: res.data.data
                })
            }
            const res = await axios.get(`/api/v1/job?page=${page ? page : 1}`)
            dispatch({
                type: 'GET_JOBS',
                payload: res.data.data
            })
            dispatch({
                type: 'GET_PAGINATION',
                payload: res.data.pagination
            })

        } catch (err) {
            console.log(err)
        }
    }
    // CLEAR SEARCH
    const clearSearch = () => {
        dispatch({
            type: 'CLEAR_SEARCH'
        })
    }

    // SINGLE JOB
    const singlejobfunc = async _id => {
        setLoading()
        const res = await axios.get(`/api/v1/job/job-id/${_id}`)
        dispatch({
            type: 'SINGLE_JOB',
            payload: res.data.data
        })
    }

    // ADD A NEW JOB
    const addjob = async job => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('/api/v1/job', job, config)
            dispatch({
                type: 'ADD_JOB',
                payload: res.data.data
            })
        } catch (err) {
            dispatch({
                type: 'JOBS_ERROR',
                payload: err.response.data.msg
            })
        }

    }
    //DELTE JOB => is in userState 
    // UPDATE JOB
    const updatejob = async job => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            setLoading()
            const res = await axios.put(`/api/v1/job/${job._id}`, job, config)
            dispatch({
                type: 'UPDATE_JOB',
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: 'JOBS_ERROR',
                payload: err.response.data.msg
            })
        }
    }


    // SET LOADING
    const setLoading = () => dispatch({
        type: 'SET_LOADING'
    })

    ///---------------------------------------------------------
    return (
       <JobContext.Provider value={{
            jobs: state.jobs,
            searched: state.searched,
            loading: state.loading,
            pagination: state.pagination,
            singlejob: state.singlejob,
            error: state.error,
            addjob,
            getjobslist,
            clearSearch,
            singlejobfunc,
            updatejob
       }}>
            {props.children}
       </JobContext.Provider>
    )
}

export default JobState
