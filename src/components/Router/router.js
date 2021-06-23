import Login from "../pages/login/login"
import Home from "../pages/home/home"
import Products from "../pages/products/products"
import { EachProducts } from "../pages/eachproducts/eachproducts"
import createBrowserHistory from "history/createBrowserHistory"
import {Router, Switch, Route} from "react-router-dom"
import PrivateRouter from "./privaterouter"
import PublicRouter from "./publicrouter"


export const history=createBrowserHistory()

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
                <PrivateRouter path="/products" component={Products}/>
                <PrivateRouter path="/eachproduct" component={EachProducts}/>
                <Route path="" />
            </Switch>
            </div>
        </Router>
    )
}