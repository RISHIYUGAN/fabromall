import React, { Fragment, useState } from "react";
import "./eachproducts.css";
import stock from "../../../Assets/images/products/check-triangle.png";
import Select from "react-select";

export const EachProducts = () => {
  const [eachprdct, setEachprdct] = useState({
    img: "https://firebasestorage.googleapis.com/v0/b/fabromal-gdn.appspot.com/o/bedsheet%2F104%20TC%20Cotton%20Double%20Floral%20Bedsheet(235-220cm)-399.jpeg?alt=media&token=5fe94faa-e093-4fdc-ae5e-bf28a6398025",
    name: "104 TC Cotton Double Floral Bedsheet",
    rating: 4,
    wishlist: false,
    cart: false,
    stock: true,
    offer: 10,
    price: 399,
    description: {
      size: "235 X 220cm",
      color: "Multicolor",
      package: "1",
    },
    model_number: "BE101T01",
    customer_review: [
      {
        name: "parthi vijay151",
        profile: "",
        likes: 5,
        liked:false,
        rating: 3,
        review:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim sem amet curabitur tortor donec. Convallis est ut fusce id cursus. Sodales eget amet, molestie",
      },
      {
        name: "Sam Billy",
        profile: "",
        likes: 2,
        liked:false,
        rating: 3,
        review:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim sem amet curabitur tortor donec. Convallis est ut fusce id cursus. Sodales eget amet, molestie",
      },
      {
        name: "Rishi 2001",
        profile: "",
        likes: 4,
        liked:true,
        rating: 3,
        review:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim sem amet curabitur tortor donec. Convallis est ut fusce id cursus. Sodales eget amet, molestie",
      },
    ],
  });
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
      // borderBottom: "1px dotted pink",
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

      return { ...provided, opacity, transition, fontFamily, color};
    },
  };
  const myrate=[
    {value:1,label:1},
    {value:2,label:2},
    {value:3,label:3},
    {value:4,label:4},
    {value:5,label:5},
  ]
  return (
    <div className="each-prd-container">
      <div className="container">
        <div className="sub-header">
          <div>
            Bedroom Fabrics <text style={{ color: "black" }}>|</text> Bedsheet
          </div>
          <div className="ep-search-div">
            <input
              type="text"
              onFocus={() => {
                document.getElementById("pseudo-placeholder").style.display =
                  "none";
              }}
              onBlur={(e) => {
                if (e.target.value === "")
                  document.getElementById("pseudo-placeholder").style.display =
                    "block";
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
                    {Math.round(eachprdct.price * (1 - eachprdct.offer / 100))}
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
                  <div>package: Pack of {eachprdct.description.package}</div>
                  <div>color: {eachprdct.description.color}</div>
                </div>
              </div>
              <div className="add-wish">
                {eachprdct.wishlist ? (
                  <div className="added-wish">
                    <i class="fas fa-heart"></i> <text>Added to wishlist</text>
                  </div>
                ) : (
                  <div className="unadded-wish">
                    <i class="far fa-heart"></i> <text>Add to wishlist</text>
                  </div>
                )}
              </div>
              <div className="ep-btn-div">
                <button>
                  <i class="fas fa-shopping-cart"></i>&nbsp;&nbsp;Add to Cart
                </button>
                <button>
                  <i class="fas fa-box-open"></i>&nbsp;&nbsp;Place Order
                </button>
              </div>
            </div>
          </div>
          <div className="add-review">
             <div className="add-rev-title">Add Your Review</div>
             <form>
             <div className="review-form">
               <label>Enter your review :</label>
                <textarea className="txt-area"></textarea>
                <div className="my-rev-rat"> 
                <label>Enter your rating :</label>
                <div style={{height:"5px"}}></div>
                <Select styles={customStyles} options={myrate} placeholder="Product Rating"></Select>
                </div>
                <div className="rev-btn-div">
                <button className="rev-btn">Add</button>
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
            {eachprdct.customer_review.map((rev) => (
              <div className="each-review">
                <div className="rev-prf-div">
                  <div className="rev-prf">
                    <div className="user-prf-pic"></div>
                    <div style={{marginLeft:"5px"}}>{rev.name}</div>
                  </div>
                  <div className="rev-likes">{rev.liked?<i class="fas fa-heart"></i>:<i class="far fa-heart"></i>}{rev.likes}</div>
                </div>
                <div className="rev-message">
                    {rev.review}
                </div>
                <div className="my-rating">
                  My Rating: {marked(rev.rating).map((star) => star)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
