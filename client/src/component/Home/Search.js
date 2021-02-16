import React, {useState, useContext} from 'react' 
import AlertContext from '../../context/Alert/AlertContext'
import JobContext from '../../context/JobContext'
const Search = () => {
    const {setalert} = useContext(AlertContext)
    const {getjobslist, clearSearch} = useContext(JobContext)

    const [catagory, Setcatogory] = useState('')
    const [location, Setlocation] = useState('')

    const HandleSubmit = e => {
        e.preventDefault()
        location.toLowerCase()
        let link
        if(catagory === '' && location === ''){
            setalert(`Enter a job title or country to start a search`, 'danger')
            clearSearch()
        }else{
            if(catagory !== '' && location !== ''){
                link = `&title=${catagory}&country=${location}`
            }
            if(catagory !== '' && location === 'remote'){
                link = `&title=${catagory}&work_type=${location}`
            }
            if(catagory !== '' && location === ''){
                link = `&title=${catagory}`
            }
            if(catagory === '' && location !== ''){
                link = `&country=${location}`
            }
            if(catagory === '' && location === 'remote'){
                link = `&work_type=${location}`
            }
            getjobslist(1, link.toLowerCase())
        }
    }

    return (
        <div className="container">
            <form onSubmit={HandleSubmit}>
                <div className="form-row align-items-center">
                    <div className=" col-md-5 col-sm-12 my-1">
                        <input value={catagory} onChange={e => Setcatogory(e.target.value)} type="text" className="form-control" placeholder="job category / type.. | eg: nodejs " />
                    </div>
                    <div className=" col-md-5 col-sm-12 my-1">
                        <input value={location} onChange={e => Setlocation(e.target.value)} type="text" className="form-control" placeholder="Country | Remote" />
                    </div>
                    <div className=" col-md-2 col-sm-12 my-1">
                        <button type="submit" className="btn btn-danger font-weight-bold btn-block ">SEARCH</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Search
