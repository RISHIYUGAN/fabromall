import {Home} from "../pages/home/home"
import createBrowserHistory from "history/createBrowserHistory"
import {Router, Switch, Route} from "react-router-dom"
import PrivateRouter from "./privaterouter"
import PublicRouter from "./publicrouter"

export const history=createBrowserHistory()
const Login=()=>{
 return(
     <h1>Login</h1>
 )
}
const Root=()=>{
    return(
        <h1>Root</h1>
    )
   }
export const AppRouter=()=>{
    return(
        <Router history={history}>
            <div>
            <Switch>
                <PublicRouter path="/" component={Login} exact={true}/>
                <PrivateRouter path="/home" component={Home}/>
                <Route path="" />
            </Switch>
            </div>
        </Router>
    )
}