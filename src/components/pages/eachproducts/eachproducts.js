import React, { Fragment, useState, useEffect } from "react";
import "./eachproducts.css";
import stock from "../../../Assets/images/products/check-triangle.png";
import Select from "react-select";
import AxiosInstance from "../../axios/axiosInstance";
import { Loader } from "../../utility/loader/loader";
import { history } from "../../Router/router";
import Wishlistpop from "../mywishlist/wishlistpopup";

// kq324ErWN2t2XEcJKlg0PtDR
export const EachProducts = () => {
  const [eachprdct, setEachprdct] = useState({});
  const [adding, setAdding] = useState(false);
  const [addload, setAddload] = useState(false);
  const [pageloading, setPageLoading] = useState(true);
  const [reviewaddload,setReviewaddload] = useState(false)
  const [review,setReview] = useState({
    review:"",
    rating:null
  })
  const [myrating,setMyrating] = useState(null)

  const [wishpop, setWishPop] = useState(false);
  const [popproduct, setPopproduct] = useState({});
  const [addwish, setAddwish] = useState(false);
  const [wishadding,setWishAdding]=useState(false)
  const [wishaddload,setWishAddload]=useState(false)

  // useEffect(() => {
  //   window.scroll({
  //     top: 0,
  //   });
  // }, []);
  useEffect(() => {
    var json = JSON.parse(localStorage.getItem("eachproduct"));
    AxiosInstance.post("/fetch_each_product", json).then((res) => {
      console.log(res.data);
      setEachprdct(res.data);
      setPageLoading(false);
    });
  }, []);
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
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? "white" : "#0C0C0C",
      padding: 20,
      fontFamily: "poppins-reg",
    }),
    value: (provided) => ({
      ...provided,
      fontFamily: "poppins-reg",
    }),
    placeholder: (provided) => ({
      ...provided,
      fontFamily: "poppins-reg",
      fontSize: "14px",
      color: "#6B6B6B",
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";
      const fontFamily = "poppins-500";
      const color = "#0C0C0C";

      return { ...provided, opacity, transition, fontFamily, color };
    },
  };
  const myrate = [
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
    { value: 4, label: 4 },
    { value: 5, label: 5 },
  ];

  const addtocart = () => {
    if (adding === false) {
      setAdding(true);
      setAddload(true);
      AxiosInstance.post("/addto-cart", { product: { ...eachprdct, qty: 1 } })
        .then((res) => {
          console.log(res.data);
          setEachprdct({ ...eachprdct, cart: true });
          setAdding(false);
          setAddload(false);
        })
        .catch(() => {
          setAdding(false);
          setAddload(false);
        });
    }
  };
  const addtowish=(e)=>{
    e.preventDefault()
    console.log("entering add")
    if(wishadding==false){
      setWishAddload(true);
      setWishAdding(true)
    const name=e.target.childNodes[1].textContent
    console.log(name,eachprdct)
    AxiosInstance.post("/add-wishlist",{
      name:name,
      product:[eachprdct]
    })
    .then((res) => {
      setEachprdct({ ...eachprdct, wishlist: true });
      console.log(res.data);
      setWishAddload(false);
      setWishAdding(false)
      setWishPop(false)
    })
    .catch(() => {
      setWishAddload(false);
      setWishAdding(false)
    });
  }
  }
  const addreview=(e)=>{
    e.preventDefault()
    if(review.rating==null){
      document.getElementById("require").style.display="flex"
      setTimeout(()=>{
        document.getElementById("require").style.display="none"
      },2000)
    }
    else{
      if(!adding){
        setAdding(true)
        setReviewaddload(true)
        AxiosInstance.post("customer_review",{
          review:review.review,
          rating:review.rating,
          product:eachprdct
        })
        .then((res)=>{
          console.log(res.data)
          setEachprdct(res.data)
          setAdding(false)
          setReviewaddload(false)
          setReview({review:"",rating:null})
          setMyrating(null)
        })
        .catch(()=>{
          setAdding(false)
          setReviewaddload(false)
        })
      }
    }
  }
 
  const payment=()=>{
    const json=JSON.stringify(eachprdct)
    localStorage.setItem("paymentprd",json)
    history.push("/order_summary")
  }


  return (
    <div className="each-prd-container">
      <div className="container">
      <Wishlistpop
        wishpop={wishpop}
        cancelpop={() => {
          setWishPop(false);
          setAddwish(false);
        }}
        popproduct={eachprdct}
        addwish={addwish}
        setAddwish={() => setAddwish(true)}
        popbtn={true}
        addtowish={(e)=>addtowish(e)}
        adding={wishadding}
        setAdding={(bool)=>setWishAdding(bool)}
        addload={wishaddload}
        setAddload={(bool)=>setWishAddload(bool)}
      />
        {pageloading ? (
          <div className="ep-loader">
            <Loader color="rgb(93, 65, 255)" />
          </div>
        ) : (
          <div>
            <div className="sub-header">
              <div>
                Bedroom Fabrics <text style={{ color: "black" }}>|</text>{" "}
                Bedsheet
              </div>
              <div className="ep-search-div">
                <input
                  type="text"
                  onFocus={() => {
                    document.getElementById(
                      "pseudo-placeholder"
                    ).style.display = "none";
                  }}
                  onBlur={(e) => {
                    if (e.target.value === "")
                      document.getElementById(
                        "pseudo-placeholder"
                      ).style.display = "block";
                  }}
                />
                <div id="pseudo-placeholder" className="pseudo-placeholder">
                  <i class="fas fa-search"></i>&nbsp;Search
                </div>
                <div className="search-btn">
                  <i class="fas fa-search"></i>
                </div>
              </div>
            </div>
            <div className="product-display">
              <div className="product-wrapper">
                <div className="ep-img-div">
                  <img src={eachprdct.img} className="ep-img" />
                </div>
                <div className="prd-des">
                  <div className="prd-name">
                    {eachprdct.name}{" "}
                    <span className="name-color">
                      <span className="bracket">(</span>
                      {eachprdct.description.color}
                      <span className="bracket">)</span>
                    </span>
                  </div>
                  <div
                    className="rating-div"
                    style={{ justifyContent: "flex-start" }}
                  >
                    <div className="rate" id="ep-ref">
                      {marked(eachprdct.rating).map((star) => star)}
                      <div className="rating-num">{eachprdct.rating}.0</div>
                    </div>
                    <div className="sold-rate" style={{ marginLeft: "10px" }}>
                      (350)
                    </div>
                  </div>
                  <div id="ep-price-div" className="price-div">
                    <div id="ep-price" className="price-div">
                      <div className="ogn-price">
                        <i class="fas fa-rupee-sign"></i> {eachprdct.price}.00
                        <div className="strike"></div>
                      </div>
                      <div className="offer">{eachprdct.offer}% off</div>
                      <div className="dscnt-offer">
                        <i class="fas fa-rupee-sign"></i>{" "}
                        {Math.round(
                          eachprdct.price * (1 - eachprdct.offer / 100)
                        )}
                        .00
                      </div>
                    </div>
                  </div>
                  <div className="stock-div">
                    {eachprdct.stock ? (
                      <div className="stock-in">
                        {/* <div class="stk-icon"><i class="fas fa-check"></i></div> */}
                        <i class="fas fa-check-circle"></i>
                        Stock Available
                      </div>
                    ) : (
                      <div>Out of Stock</div>
                    )}
                  </div>
                  <div className="prd-info">
                    <div>Product Details</div>
                    <div className="prd-info-breaker"></div>
                    <div className="prd-det">
                      <div>size: {eachprdct.description.size}</div>
                      <div>
                        package: Pack of {eachprdct.description.package}
                      </div>
                      <div>color: {eachprdct.description.color}</div>
                    </div>
                  </div>
                  <div className="add-wish">
                    {eachprdct.wishlist ? (
                      <div className="added-wish" >
                        <i class="fas fa-heart"></i>{" "}
                        <text>Added to wishlist</text>
                      </div>
                    ) : (
                      <div className="unadded-wish" style={{cursor:"pointer"}} onClick={()=>setWishPop(true)}>
                        <i class="far fa-heart"></i>{" "}
                        <text>Add to wishlist</text>
                      </div>
                    )}
                  </div>
                  <div className="ep-btn-div">
                    {eachprdct.cart ? (
                      <button>
                        <i class="fas fa-shopping-cart"></i>&nbsp;&nbsp;Added to
                        Cart
                      </button>
                    ) : (
                      <button
                        onClick={(e) => addtocart(e)}
                        style={{ cursor: "pointer" }}
                      >
                        {addload ? (
                          <Loader color="white" />
                        ) : (
                          <Fragment>
                            <i class="fas fa-shopping-cart"></i>&nbsp;&nbsp;Add
                            to Cart
                          </Fragment>
                        )}
                      </button>
                    )}

                    <button onClick={()=>payment()}>
                      <i class="fas fa-box-open"></i>&nbsp;&nbsp;Place Order
                    </button>
                  </div>
                </div>
              </div>
              <div className="add-review">
                <div className="add-rev-title">Add Your Review</div>
                <form onSubmit={(e)=>addreview(e)}>
                  <div className="review-form">
                    <label>Enter your review :</label>
                    {console.log(review)}
                    <textarea className="txt-area" name="review" value={review.review} onChange={(e)=>setReview({...review,review:e.target.value})} required="true"></textarea>
                    <div className="my-rev-rat">
                      <label>Enter your rating :</label>
                      <div style={{ height: "5px" }}></div>
                      <Select
                        styles={customStyles}
                        options={myrate}
                        placeholder="Product Rating"
                        name="rating"
                        id="rw-rating"
                        value={myrating?myrating:null}
                        onFocus={()=>console.log("hii")}
                        onChange={(e)=>{setReview({...review,rating:e.value});setMyrating(e)}}
                      ></Select>
                      <div className="required-div" id="require"><div className="exclamate"><div className="extend"></div><i class="fas fa-exclamation"></i></div><div>Please give your rating</div></div>
                    </div>
                    <div className="rev-btn-div">
                      <button className="rev-btn">{reviewaddload?<Loader/>:"Add"}</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="ep-line"></div>
            <div className="cus-review">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "10px",
                  color: "#101010",
                  fontSize: "20px",
                }}
              >
                Customer Review
              </div>
              <div className="review-div">
                {eachprdct.customer_review.length == 0 ? (
                  <h4 className="empty-review">
                    <text style={{ color: "red" }}>No</text>&nbsp;Reviews added
                    Yet
                  </h4>
                ) : (
                  eachprdct.customer_review.map((rev) => (
                    <div className="each-review">
                      <div className="rev-prf-div">
                        <div className="rev-prf">
                          <div className="user-prf-pic" style={{backgroundImage:`url("${rev.img}")`,backgroundPosition:"center",backgroundSize:"cover"}}></div>
                          <div style={{ marginLeft: "5px" }}>{rev.name}</div>
                        </div>
                        {/* <div className="rev-likes">
                          {rev.liked ? (
                            <i class="fas fa-heart"></i>
                          ) : (
                            <i class="far fa-heart"></i>
                          )}
                          {rev.likes}
                        </div> */}
                      </div>
                      <div className="rev-message">{rev.review}</div>
                      <div className="my-rating">
                        My Rating: {marked(rev.rating).map((star) => star)}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            <div className="goback-div">
              <div
                onClick={() => {
                  window.scrollTo(0, 0);
                  history.push("/products");
                }}
              >
                <i class="fas fa-arrow-left"></i>&nbsp;&nbsp;Back to Products
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
