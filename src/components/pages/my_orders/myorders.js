import React, { useEffect, useState } from "react";
import { NavLink, Route } from "react-router-dom";
import { Loader } from "../../utility/loader/loader";
import "./myorders.css";
import {OrderHistory} from "../order-history/order-history"

const MyOrders = ({ match }) => {
  const [pageloading, setPageloading] = useState(true);
  

  const [orderslist,setOrderslist] = useState([{
    image:"https://firebasestorage.googleapis.com/v0/b/fabromal-gdn.appspot.com/o/bedsheet%2F104%20TC%20Cotton%20Double%20Floral%20Bedsheet(235-220cm)-399.jpeg?alt=media&token=5fe94faa-e093-4fdc-ae5e-bf28a6398025",
    name:"Cotton Bathroom Mat (Multicolor, Medium)",
    ordered:"12.03.2001",
    Delivered:"18.03.2001",
    Quantity:5,
    price:450,
    offer:5,
    deliverycharge:30
  },
  {
    image:"https://firebasestorage.googleapis.com/v0/b/fabromall.appspot.com/o/apron%2FBlended%20Chef's%20Apron%20-%20XL%20%20(Blue%2C%20Pack%20of%202)(25-31)-280.jpeg?alt=media&token=a0d17916-cdb4-4ff2-a7ee-bd3ff60e2b22",
    name:"Cotton Colors Multicolor Napkins (8 Sheets)",
    ordered:"12.03.2001",
    Delivered:"18.03.2001",
    Quantity:5,
    price:450,
    offer:5,
    deliverycharge:30
  },
  {
    image:"https://firebasestorage.googleapis.com/v0/b/fabromall.appspot.com/o/napkin%2F100%25%20cotton%20Hand%20towels%2CKitchen%20Towels%20soft%20Napkin%20Set%20of%2012%20Multicolor%20Napkins(12-18inch)-360.jpeg?alt=media&token=403fd4c8-135f-4c23-addd-5d9449d26616",
    name:"Nendle Cotton Sofa Covers Set of 3 Seater for Living Room (Violet, 2 Pieces)",
    ordered:"12.03.2001",
    Delivered:"18.03.2001",
    Quantity:5,
    price:450,
    offer:5,
    deliverycharge:30
  },
  {
    image:"https://firebasestorage.googleapis.com/v0/b/fabromall.appspot.com/o/apron%2FBlended%20Chef's%20Apron%20-%20XL%20%20(Blue%2C%20Pack%20of%202)(25-31)-280.jpeg?alt=media&token=a0d17916-cdb4-4ff2-a7ee-bd3ff60e2b22",
    name:"Cotton Colors Multicolor Napkins (8 Sheets)",
    ordered:"12.03.2001",
    Delivered:"18.03.2001",
    Quantity:5,
    price:450,
    offer:5,
    deliverycharge:30
  },
])
  useEffect(() => {
      setTimeout(()=>{
           setPageloading(false)
      },5000)
  }, []);
  return (
  pageloading?  <div className="ep-loader">
  <Loader color="rgb(93, 65, 255)" />
</div>:
    <div className="myorders-container">
      <div className="container">
        <div className="my-orders-wrapper">
          <div className="my-order-title-div">
            <div className="my-order-title">
            <i
          class="fas fa-box-open"
        />My <text style={{ color: "#366EFF" }}>Orders</text>
            </div>
            <div className="last-order">
              My Last <text style={{color:"red"}}>Order</text> : <text style={{color:"#3C72FF"}}>12.03.2001</text>
            </div>
          </div>

          <div className="order-nav-div">
            <div className="order-navigation">
              <NavLink
                to="/my_orders/order_history"
                activeClassName="order-act-nav"
                className="ord-nav"
              >
                <div className="order-each-nav">
                  <div className="slider" id="ord-slider-1"></div>
                  <div className="nav-name">Order History</div>
                </div>
              </NavLink>
              <NavLink
                to="/my_orders/upcoming_orders"
                activeClassName="order-act-nav"
                className="ord-nav"
              >
                <div className="order-each-nav">
                  <div className="slider" id="ord-slider-2"></div>
                  <div className="nav-name">Upcomings</div>
                </div>
              </NavLink>
            </div>
          </div>
          <Route path="/my_orders/order_history" render={() =><OrderHistory orderslist={orderslist}/>} />
            <Route
              path="/my_orders/upcoming_orders"
              render={() => <div></div>}
            />
          {/* {chec}
                   <button onClick={()=>setChec("rishi")}>change</button>&nbsp;
                   <NavLink to="/my_orders/hii" activeClassName="active-nav">go hii</NavLink>&nbsp;
                   <NavLink to="/my_orders/hello" activeClassName="active-nav">go hello</NavLink>&nbsp;
                   <NavLink to="/my_orders/gm" activeClassName="active-nav">go gm</NavLink>

                  <Route path="/my_orders/hii" render={()=><div>hiii </div>}/>
                  <Route path="/my_orders/hello" render={()=><div>hello</div>}/>
                  <Route path="/my_orders/gm" render={()=><div>gm </div>}/> */}
        </div>
      </div>
    </div>
  );
};
export default MyOrders;
