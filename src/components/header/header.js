import React from "react"
import "./header.css"
import {Sidebar} from "./sidebar/sidebar"
export const Header=()=>{
    return(
        <div className="header-container">
           <div className="container">
               <div className="header-content">
                   <div>
                       <Sidebar/>
                   </div>
                   <div className="title">
                       <h3>fabroMall</h3>
                    </div>
              <div className="cart-icon">
              <i class="fas fa-shopping-cart"></i>
              </div>
              </div>
           </div>
        </div>
    )
}