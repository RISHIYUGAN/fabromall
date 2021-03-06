import React,{useEffect} from "react"
import createBrowserHistory from "history/createBrowserHistory";
import { Router, Switch, Route } from "react-router-dom";
import PrivateRouter from "./privaterouter";
import PublicRouter from "./publicrouter";
import Login from "../pages/login/login";
import Home from "../pages/home/home";
import Products from "../pages/products/products";
import { EachProducts } from "../pages/eachproducts/eachproducts";
import Cart from "../pages/mycart/cart";
import WishList from "../pages/mywishlist/mywishlist";
import MyAccount from "../pages/myaccount/myaccount";
import OrderSummary from "../pages/order_summary/order_summary";
import MyOrders from "../pages/my_orders/myorders";

export const history = createBrowserHistory();

export const AppRouter = () => {
  return (
    <Router history={history}>
      <div>
        <Switch>
          <PublicRouter path="/" component={Login} exact={true} />
          <PrivateRouter path="/home" component={Home} footer={true} />
          <PrivateRouter path="/products" component={Products} footer={true} />
          <PrivateRouter path="/eachproduct" component={EachProducts} footer={true}/>
          <PrivateRouter path="/order_summary" component={OrderSummary} footer={false}/>
          <PrivateRouter path="/my_cart" component={Cart} footer={false} />
          <PrivateRouter path="/my_wishlist" component={WishList} footer={false}/>
          <PrivateRouter path="/my_account" component={MyAccount} footer={false}/>
          <PrivateRouter path="/my_orders" component={MyOrders} footer={false}/>
          <Route path="" />
        </Switch>
      </div>
    </Router>
  );
};
