import React, { useState, useEffect, Fragment } from "react";
import "./wishlistpop.css";
import AxiosInstance from "../../axios/axiosInstance";
import { connect } from "react-redux";
import {wishlistset} from "../../Redux/action"
 
const Wishlistpop = (props) => {
  const [names, setNames] = useState([
    "Shoes",
    "Watch",
    "Bedsheet",
    "Bed cover",
    "Quilt",
    "Apron",
    "Napkin",
    "Kercheif",
    "Table cover",
    "Table runner",
    "Bedroom Products",
  ]);
  const [color, setColor] = useState(["dark", "light"]);
  const [popdet, setPropdet] = useState();


  var i = -1;
  var indec = 1;

//  useEffect(()=>{
//   document
//  },[])

  useEffect(() => {
    setPropdet(props.popproduct);
  }, [props.popproduct]);



  const createwish=(e)=>{
    e.preventDefault();
    if(props.adding==false){
      props.setAdding(true)
      props.setAddload(true);
      var name = e.target.addwishname.value;
      var present=false
      props.wishlist.forEach(element => {
        if(element==name){
          present=true
          props.setAdding(false)
          props.setAddload(false);
          document.getElementById("wishpoperror").style.width="100%"
          setTimeout(()=>{
            document.getElementById("wishpoperror").style.width="0%"
          },3000)
        } 
      });
      if(present===false){
        console.log("entering")
        console.log(name,popdet)
        AxiosInstance.post("/create-wishlist", {
          name: name,
          product: [popdet],
        })
          .then((res) => {
            console.log(res.data);
            props.wishlistset(res.data.wishlistnames)
            props.setAddload(false);
            props.setAdding(false);
          })
          .catch(() => {
            props.setAddload(false);
            props.setAdding(false)
          });
      }
    }
  }

  return (
    props.wishpop && (
      <div
        className="pop-up-container"
        id="pop-up-cnt"
      >
        <div className="pop-up-ref"  onClick={() => props.cancelpop()}></div>
        <div className="wishlist-pop-up-content">
        <div className="name-exist-error" id="wishpoperror">Wishlist name already exists!</div>
        <div className="pop-up-wrapper" id="pop-up-wrap">
          <div className="popup-title">Select your WishList</div>
          <div className="wishlist-names-wrapper">
            {props.wishlist.length!==0?props.wishlist.map((name) => {
              i = i + indec;
              if (i == 2 || i == -1) {
                if (indec === 1) {
                  indec = -1;
                  i = 1;
                } else {
                  indec = 1;
                  i = 0;
                }
              }
              return (
                <div className={`wishlist-popup-name ${color[i]}`} onClick={(e)=>{
                  props.addtowish(e)
                }}>
                  <i class="fas fa-heart" />
                  {name}
                </div>
              );
            }):
            <div className="empty-wish-names">
              Your Wishlist is&nbsp;<text style={{color:"red"}}>empty</text>
            </div>
          }
          </div>
          {props.popbtn&&
            <div className="wishpop-btn-div">
            {props.addwish ? (
              <form onSubmit={(e)=>{
                   createwish(e)
              }}>
                <div className="wishpop-input-div">
                  <label>
                    Enter Name :
                    <input type="text" className="wishpop-input" name="addwishname"/>
                  </label>
                  <button className="wishpop-btn">{props.addload?<i class="fas fa-circle-notch fa-spin"></i>:"+ Add"}</button>
                </div>
              </form>
            ) : (
              <button
                onClick={() => props.setAddwish()}
                className="wishpop-btn"
              >
                {props.addload?<i class="fas fa-circle-notch fa-spin"></i>:"+ Add New Wishlist"}
              </button>
            )}
          </div>
          }
        </div>
        </div>
      </div>
    )
  );
};
const mapStateToProps=(state)=>({
  wishlist:state.Wishlist
})
const mapDispatchToProps=(dispatch)=>({
  wishlistset:(value)=>dispatch(wishlistset(value))
})
export default connect(mapStateToProps,mapDispatchToProps)(Wishlistpop);
