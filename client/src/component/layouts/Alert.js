import React, {useContext} from 'react'
import AlertContext from '../../context/Alert/AlertContext'
const Alerts = () => {
    const {alerts} = useContext(AlertContext)
    return (
        alerts.length > 0 && alerts.map(alert => {
            return (
                <div className="container">
                    <div  key={alert._id} className={`alert alert-${alert.type}`} role="alert">
                        {alert.msg}
                    </div>
                </div>
            )
        })
    )
}

export default Alerts