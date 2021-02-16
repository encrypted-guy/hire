export default (state, action) => {
    switch(action.type){
        case 'SET_LOADING':
            return {
                ...state,
                loading: true
            }
        case 'GET_JOBS': 
            return {
                ...state,
                jobs: action.payload,
                loading: false
            }
        case 'SEARCHED_JOBS': 
            return {
                ...state,
                searched: action.payload,
                loading: false
            }

        case 'CLEAR_SEARCH': 
            return {
                ...state,
                searched: null,
                loading: false
            }
        case 'GET_PAGINATION': 
            return {
                ...state,
                pagination: action.payload,
                loading: false
            }
        case 'SINGLE_JOB': 
            return {
                ...state,
                singlejob: action.payload,
                loading: false
            }
        case 'ADD_JOB': 
            return {
                ...state,
                jobs: [...state.jobs, action.payload]
            }
        case 'UPDATE_JOB':
            return {
                ...state,
                jobs: state.jobs.map(job => job._id === action.payload._id ? action.payload : job),
                loading: false
            }
        case 'DELETE_JOB':
            return {
                ...state,
                jobs: state.jobs.filter(job => job._id !== action.payload)
            }
        case 'JOBS_ERROR':
            return {
                ...state,
                error: action.payload
            }
        default: 
            return state
    }
}