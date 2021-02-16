export default (state, action) => {
    switch(action.type) {
        case 'GET_PUBLISHER':
            return {
                ...state,
                publisher: action.payload,
                job_listing: action.payload.job_listing,
                loading: false
            }
        case 'DELETE_JOB':
            return {
                ...state,
                job_listing: state.job_listing.filter(job => job._id !== action.payload)
            }
        case 'USER_UPDATED':
            return {
                ...state,
                publisher: action.payload
            }
        case 'SET_LOADING':
            return {
                ...state,
                loading: true
            }
        default: 
            return state
    }
}