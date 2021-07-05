import React,{useState,useEffect} from "react";
import "./myaccount.css";
import profile from "../../../Assets/images/header/user.jpg";

const MyAccount = () => {
  const [info,setInfo]=useState({
    cart:0,
    wishlist:0,
    order:0,
    country:"India",
    state:"Tamil Nadu",
    Address:"1,kulandhaimalainagar,velayuthampalayam,karur(Dt)-639117"
  })
  return (
    <div className="my-account-container">
      <div className="container">
        <div className="account-wrapper">
          <div className="acc-prof-pic-wrapper">
            <div className="acc-prof-pic-div">
              <div
                className="acc-prof-pic"
                style={{ backgroundImage: `url("${profile}")` }}
              ></div>
              <div className="acc-name-div">
                <h3>Tony Stark H</h3>
                <div className="user-mobile">7339654794</div>
              </div>
            </div>
            <button className="acc-edit-btn">Edit Profile</button>
          </div>
          <div className="acc-count-div">
             <div className="acc-each-info"><h4>My Cart</h4><div>{info.cart}</div></div>
             <div className="acc-each-info"><h4>My WishList</h4><div>{info.wishlist}</div></div>
             <div className="acc-each-info"><h4>My Order</h4><div>{info.order}</div></div>
          </div>
          <div className="acc-address-div">
             <div className="acc-each-info"><h4>Country</h4><div>{info.country}</div></div>
             <div className="acc-each-info"><h4>State</h4><div>{info.state}</div></div>
             <div className="acc-each-info"><h4>Address</h4><div className="a">{info.Address}</div></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MyAccount;
