import React, { Component } from "react"
import {Route,Redirect} from "react-router-dom"
import {connect} from "react-redux"

const PublicRouter=(
    {
        isAuthenticated,
        component:Component,
        ...rest
    }
)=>{
    return(
        <div>
       <Route {...rest} component={(props)=>(
           (isAuthenticated)?
           <Redirect to="/home"/>
           :
           <div><Component {...props}/></div>
       )}/>
       </div>
    )
}

const mapStateToprops=(state)=>({
    isAuthenticated:state.Auth
})

export default connect(mapStateToprops)(PublicRouter)