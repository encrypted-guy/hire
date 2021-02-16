import React from 'react'
import {Switch, BrowserRouter, Route} from 'react-router-dom'

import Navbar from './component/layouts/Navbar'
import Footer from './component/layouts/Footer'
import Home from './component/Home/Home'
import Register from './component/pages/Register'
import Login from './component/pages/Login'
import CompRegister from './component/pages/CompRegister'
import Addjob from './component/pages/Addjob'
import Alerts from './component/layouts/Alert'
import Single from './component/pages/Single'
import Company from './component/profiles/Company'
import User from './component/pages/User'

import JobState from './context/JobState'
import AlertState from './context/Alert/AlertState'
import AuthState from './context/auth/AuthState'
import UserState from './context/users/UserState'
// ROUTING
import PrivateRoute from './component/routing/PrivateRoutes'

// TOKEN
import SetAuthHeaders from './utils/SetAuthHeaders'
import Editjob from './component/profiles/Editjob'
if(localStorage.token){
    SetAuthHeaders(localStorage.token)
}

const App = () => {
    return (
        <JobState>
            <AlertState>
                <UserState>
                    <AuthState>
                        <div>
                            <BrowserRouter>
                                <Navbar />
                                <Alerts />
                                    <Switch>
                                        <Route exact path='/' component={Home} />
                                        <PrivateRoute path='/add-new' component={Addjob} />
                                        <Route path='/sign-up' component={Register} />
                                        <Route path='/publisher-sign-up' component={CompRegister} />
                                        <Route path='/sign-in' component={Login} />
                                        <Route path='/job_id/:job_id' component={Single} />
                                        <PrivateRoute path='/job/edit/:job_id' component={Editjob} />
                                        <Route path='/job/publisher/:publisher_id' component={Company} />
                                        <PrivateRoute path='/user/:user_id' component={User} />
                                    </Switch>
                                <Footer />
                            </BrowserRouter>
                        </div>
                    </AuthState>
                </UserState>
            </AlertState>
        </JobState>
     
    )
}

export default App