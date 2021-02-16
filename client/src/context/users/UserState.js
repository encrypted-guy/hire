import React, {useReducer} from 'react'
import UserReducer from './UserReducer'
import UserContext from './UserContext'
import axios from 'axios'
const UserState = props => {
    const InitState = {
        loading: false,
        publisher: {},
        job_listing: {}
    }
    const [state, dispatch] = useReducer(UserReducer, InitState)
    //----------------------------------------------------------
    
    //GET publsher users
    const getpublisher = async _id => {
        setLoading()
        const res = await axios.get(`/api/v1/user/publisher/${_id}`)
        dispatch({
            type: 'GET_PUBLISHER',
            payload: res.data.publisher
        })
    }

    // DELETE A JOB
    const deletejob = async _id => {
        try {
            await axios.delete(`/api/v1/job/${_id}`)
            dispatch({
                type: 'DELETE_JOB',
                payload: _id
            }) 
        } catch (err) {
           console.log(err)
        }
    }

    // UPLOAD PHOTO
    const uploadphoto = async data => {
        try { 
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            await axios.put('/api/v1/user/photo', data , config)
            // console.log(res.data)
        } catch (err) {
            console.log(err)
        }
    }
    
    // EDIT USER
    const usereditfunc = async user => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            setLoading()
            const res = await axios.put(`/api/v1/user/edit/user/${user._id}`, user, config)
            dispatch({
                type: 'USER_UPDATED',
                payload: res.data.user
            })
        } catch (err) {
            
        }
    }

    // SET LOADINGS
    const setLoading = () => dispatch({
        type: 'SET_LOADING'
    })

    //----------------------------------------------------------
    return (
        <UserContext.Provider value={{
            loading: state.loading,
            publisher: state.publisher,
            job_listing: state.job_listing,
            getpublisher,
            deletejob,
            uploadphoto,
            usereditfunc
        }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState
