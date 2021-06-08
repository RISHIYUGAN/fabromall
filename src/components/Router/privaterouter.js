import React from "react"
import {Route,Redirect} from "react-router-dom"
import {connect} from "react-redux"
import {Header} from "../header/header"

const PrivateRouter=(
    {
        isAuthenticated,
        component:Component,
        ...rest
    }
)=>{
    return(
        <div>
       <Header/>
       <Route {...rest} component={(props)=>(
           (isAuthenticated)?
           <div><Component {...props}/></div>
           :
           <div>
           <Redirect to="/"/>
           </div>
       )}/>
       </div>
    )
}

const mapStateToprops=(state)=>({
    isAuthenticated:state.Auth
})

export default connect(mapStateToprops)(PrivateRouter)