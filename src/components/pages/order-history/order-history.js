import React, { useEffect } from "react"

export const OrderHistory = ({orderslist})=>{
    return(
        <div className="orders-list">
            {orderslist.map((order)=>(
              <div className="each-order-wrapper">
              <div className="each-order-div">
                <div className="order-img-div">
                   <img className="orders-img" src={order.image}/> 
                </div>
                <div className="order-name">
                  {order.name}
                </div>
                <div className="ordered-details">
                  <div className="each-order-detail">
                    <div>
                        Orderd At
                    </div>
                    <div>
                      {order.ordered}
                    </div>
                  </div>
                  <div className="each-order-detail">
                    <div>
                        Delivered At
                    </div>
                    <div>
                      {order.Delivered}
                    </div>
                  </div>
                  <div className="each-order-detail">
                    <div>
                        Quantity
                    </div>
                    <div>
                      {order.Quantity}
                    </div>
                  </div>
                  <div className="each-order-detail">
                    <div>
                        M.R.P
                    </div>
                    <div>
                      {order.price}
                    </div>
                  </div>
                  <div className="each-order-detail">
                    <div>
                        Delivery charge
                    </div>
                    <div>
                      {order.deliverycharge}
                    </div>
                  </div>
                  <div className="order-total-detail">
                    <div>
                        Total 
                    </div>
                    <div className="total-price">
                      {order.price+order.deliverycharge}
                    </div>
                  </div>
                  </div>     
                </div>  
              </div>
            ))}
          </div>
    )
}