import React, { useState, useEffect } from "react";
import "./cart.css";
import Wishlistpop from "../mywishlist/wishlistpopup";
import AxiosInstance from "../../axios/axiosInstance";
import { Loader } from "../../utility/loader/loader";


const Cart = () => {
  const [mycart, setMycart] = useState([]);
  const [wishpop, setWishPop] = useState(false);
  const [popproduct, setPopproduct] = useState({});
  const [addwish, setAddwish] = useState(false);
  const [adding,setAdding]=useState(false)
  const [addload,setAddload]=useState(false)
  const [pageloading,setPageloading]=useState(true)
  const [delload,setDelload] = useState(false)
  const [deleting,setDeleting] = useState(false)

  useEffect(()=>{
   AxiosInstance.post("view-cart")
   .then((res)=>{
    setMycart(res.data)
    setPageloading(false)
   })
  },[])

  const marked = (rate) => {
    var rating = [];
    for (rate; rate !== 0; rate--)
      rating = [
        ...rating,
        <i style={{ color: "#FFE920" }} class="fas fa-star"></i>,
      ];
    for (rate = 5 - rating.length; rate !== 0; rate--)
      rating = [
        ...rating,
        <i id="unmarked" style={{ color: "#DDDDDD" }} class="fas fa-star"></i>,
      ];
    return rating;
  };
  const addtowish=(e)=>{
    e.preventDefault()
    console.log("entering add")
    if(adding==false){
      setAdding(true)
      setAddload(true);
    const name=e.target.childNodes[1].textContent
    console.log(name,popproduct)
    AxiosInstance.post("/add-wishlist",{
      name:name,
      product:[popproduct]
    })
    .then((res) => {
      console.log(res.data);
      setAddload(false);
      setAdding(false)
      setWishPop(false)
    })
    .catch(() => {
      setAddload(false);
      setAdding(false)
    });
  }
  }
// cartprice
// discount
  const deletecart=(product)=>{
    if(deleting==false){
      setDeleting(true)
      setDelload(true)
      AxiosInstance.post("deletefrom-cart",{product})
      .then((res)=>{
        setMycart(res.data)
        setDeleting(false)
        setDelload(true)
      })
      .catch((error)=>{
        setDeleting(false)
        if(error){
          console.log(error.message)
        }
      })
    }
  }

  return (
    <div className="my-cart-container">
      <Wishlistpop
        wishpop={wishpop}
        cancelpop={() => {
          setWishPop(false);
          setAddwish(false);
        }}
        popproduct={popproduct}
        addwish={addwish}
        setAddwish={() => setAddwish(true)}
        popbtn={true}
        addtowish={(e)=>addtowish(e)}
        adding={adding}
        setAdding={(bool)=>setAdding(bool)}
        addload={addload}
        setAddload={(bool)=>setAddload(bool)}
      />
      <div className="container">
        <div className="cart-title">
          <div className="my-cart-icon">
            <i class="fas fa-shopping-cart" />
          </div>
          <div>
            My <text style={{ color: "#366EFF" }}>Cart</text>
            <sup className="cart-length">({mycart.length})</sup>
          </div>
        </div>
        {pageloading ? (
            <div className="cart-loader">
            <Loader color="#393cff"/>
            </div>
          ) :<div className="cart-list">
            {
mycart.length!==0?mycart.map((eacprd, index) => (
  <div className="e-cart-prd">
    <div className="e-cart-prd-des">
      <div className="e-cart-name">{eacprd.name}</div>
      <div className="e-cart-rating">
        <div>
          {marked(eacprd.rating)} {eacprd.rating}.0
        </div>
        <div className="stock-div" id="cart-stock-div">
          {/* {eacprd.stock ? (
            <div className="stock-in">
              <i id="cart-stock-icon" class="fas fa-check-circle"></i>
              Stock Available
            </div>
          ) : (
            <div className="stock-out">Out of Stock !</div>
          )} */}
          pack of&nbsp;&nbsp;{eacprd.description.package}
        </div>
      </div>
      <div className="e-cart-price-div">
        <div className="e-cart-ogn-price">
          <i class="fas fa-rupee-sign"></i>
          <h4>{eacprd.cartprice}.00</h4>
          <div className="strike"></div>
        </div>
        <div className="e-cart-offer">
          <h4>{eacprd.offer}% off</h4>
        </div>
        <div className="e-cart-dis">
          <i class="fas fa-rupee-sign"></i>
          <h4>
            {Math.round(eacprd.cartprice * (1 - eacprd.offer / 100))}
            .00
          </h4>
        </div>
      </div>
      <div className="qty-div">
        <div className="cart-add-wish">
          {eacprd.wishlist ? (
            <div className="cart-added-wish">
              <i class="fas fa-heart"></i>{" "}
              <text>Added to wishList</text>
            </div>
          ) : (
            <div
              className="cart-unadded-wish"
              onClick={() => {
                setPopproduct(eacprd);
                setWishPop(true);
              }}
            >
              <i class="far fa-heart"></i>{" "}
              <text>Add to wishList</text>
            </div>
          )}
        </div>
        <div className="qty-input-div">
          Qty:
          <input
            type="text"
            className="qty-input"
            value={eacprd.qty}
            onChange={(e) => {
              if (e.target.value.match(/^\d{0,}$/)) {
                var cpy = [...mycart];
                cpy.splice(index, 1, {
                  ...mycart[index],
                  qty: e.target.value,
                  cartprice: eacprd.price * e.target.value,
                });
                setMycart(cpy);
              }
            }}
            onBlur={(e) => {
              if (e.target.value === "" || e.target.value === "0") {
                var cpy = [...mycart];
                cpy.splice(index, 1, {
                  ...mycart[index],
                  qty: 1,
                  cartprice: eacprd.price * 1,
                });
                setMycart(cpy);
              }
            }}
          />
        </div>
      </div>
      <div className="remove-cart-button-div">
        <button className="order-cart-button">
          <i class="fas fa-box"></i> &nbsp;Place Order
        </button>
        <button
          className="remove-cart-button"
          onClick={() => {
            deletecart(eacprd)
          }}
        >
          {delload?<Loader/>: <i class="fas fa-trash"></i>}
        </button>
      </div>
    </div>
    <div className="e-cart-img-div">
      <img src={eacprd.img} className="e-cart-img" />
    </div>
  </div>
)): <div className="wish-empty">
You <text style={{ color: "red" }}>haven't</text> added anything
to your Cart
<h4>
  <i class="fas fa-shopping-cart" />
  Shop Now
</h4>
</div>
            }
          </div>
          }
       
      </div>
    </div>
  );
};
export default Cart;

