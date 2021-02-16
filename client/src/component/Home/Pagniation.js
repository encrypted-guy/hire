import React, {useContext} from 'react'
import Jobcontext from '../../context/JobContext'
const Pagniation = () => {
    const {getjobslist, pagination} = useContext(Jobcontext)

    const prev = () => {
        getjobslist(pagination.prev)
    }

    const next = () => {
        getjobslist(pagination.next)
    }

    return (
        <div className="container">
            <nav>
                <ul className="pagination justify-content-center">
                    {
                        pagination.prev > 0 ? (
                            <>
                                <li className="page-item ">
                                    <span onClick={prev} className="page-link text-danger" href="/" aria-label="Previous">
                                        <span aria-hidden="true">&laquo;</span>
                                    </span>
                                </li>
                                <li onClick={prev} className="page-item "><span className="page-link text-danger" href="/">{pagination.prev}</span></li>
                            </>
                        ) : null
                    }
                    <li className="page-item active"><span className="page-link text-danger">{pagination.current}</span></li>
                    {
                        pagination.next > 0 ? (
                            <>
                                <li onClick={next}  className="page-item"><span className="page-link text-danger" href="/">{pagination.next}</span></li>
                                <li className="page-item">
                                    <span onClick={next}  className="page-link text-danger" aria-label="Next">
                                        <span aria-hidden="true">&raquo;</span>
                                    </span>
                                </li>
                            </>
                        ) : null
                    }

                </ul>
            </nav>
        </div>
    )
}

export default Pagniation
