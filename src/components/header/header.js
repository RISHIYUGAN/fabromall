import React, { useState } from "react";
import "./header.css";
import { Sidebar } from "./sidebar/sidebar";
import { NavLink } from "react-router-dom";
export const Header = () => {
  const [navigation, setNavigation] = useState([
    {
      name: "Home",
      to: "home",
      icon:<icon style={{fontSize: "22px",color:"#636363",marginTop:"-3px"}} class="fas fa-home"/>
    },
    {
      name: "My Cart",
      to: "my_cart",
      icon:<icon style={{fontSize: "22px",color:"#636363"}} class="fas fa-shopping-cart"/>
    },
    {
      name: "My WishList",
      to: "my_wishlist",
      icon:<icon style={{fontSize: "22px",color:"#636363"}} class="fas fa-heart"/>
    },
    {
      name: "My Orders",
      to: "my_orders",
      icon:<icon style={{fontSize: "22px",color:"#636363"}} class="fas fa-box-open"/>
    },
    {
      name: "My Account",
      to: "my_account",
      icon:<icon style={{fontSize: "25px",color:"#636363"}} class="fas fa-user-circle"/>
    },
    {
      name: "Notifications",
      to: "notifications",
      icon:<icon style={{fontSize: "22px",color:"#636363"}} class="fas fa-bell"/>
    },
  ]);
  const [sidebar, setSidebar] = useState(false);
  return (
    <div className="header-container">
      <div className="container">
        <div className="header-content">
          <div onClick={()=>{
            setSidebar(true)
          }}
          style={{cursor:"pointer"}}
          >
            <Sidebar />
          </div>
          <div className="title">
            <h3>fabroMall</h3>
          </div>
          <div className="cart-icon">
            <i class="fas fa-shopping-cart"></i>
          </div>
        </div>
      </div>
      {sidebar && (
        <div className="sidebar-container">
          <div className="sidebar-wrapper">
          <h4
              className="ExitButton"
              onClick={() => {
              setSidebar(false)
              }}
            >
              x
            </h4>
            <div className="profile-pic-div">
            <div className="profile-pic"></div>
            <div>Tony Stark H</div>
            </div>
            <div className="navigations-div">
                {
                navigation.map((nav)=>(
                  <NavLink to={nav.to} className="nav-link" activeClassName="active-nav">
                    <div className="each-nav">
                      <div className="hdr-icon-div">
                      {nav.icon}
                      </div>
                      <div className="nav-name">
                      {nav.name}
                     </div>
                    </div>
                     </NavLink>
                ))
                }
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
