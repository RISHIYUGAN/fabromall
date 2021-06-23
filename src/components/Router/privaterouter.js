import React from "react"
import {Route,Redirect} from "react-router-dom"
import {connect} from "react-redux"
import {Header} from "../header/header"
import {Footer} from "../footer/footer"

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
       <Footer/>
       </div>
    )
}

const mapStateToprops=(state)=>({
    isAuthenticated:state.Auth
})

export default connect(mapStateToprops)(PrivateRouter)