import React, { useState } from "react";
import "./cart.css";

const Cart = () => {
  const [mycart, setMycart] = useState([
    {
      img: "https://firebasestorage.googleapis.com/v0/b/fabromal-gdn.appspot.com/o/bedsheet%2F104%20TC%20Cotton%20Double%20Floral%20Bedsheet(235-220cm)-399.jpeg?alt=media&token=5fe94faa-e093-4fdc-ae5e-bf28a6398025",
      name: "104 TC Cotton Double Floral Bedsheet",
      rating: 4,
      wishlist: false,
      cart: false,
      stock: true,
      offer: 10,
      price: 399,
      cartprice: 399,
      qty: 1,
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
          liked: false,
          rating: 3,
          review:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim sem amet curabitur tortor donec. Convallis est ut fusce id cursus. Sodales eget amet, molestie",
        },
        {
          name: "Sam Billy",
          profile: "",
          likes: 2,
          liked: false,
          rating: 3,
          review:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim sem amet curabitur tortor donec. Convallis est ut fusce id cursus. Sodales eget amet, molestie",
        },
        {
          name: "Rishi 2001",
          profile: "",
          likes: 4,
          liked: true,
          rating: 3,
          review:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim sem amet curabitur tortor donec. Convallis est ut fusce id cursus. Sodales eget amet, molestie",
        },
      ],
    },
    {
      img: "https://firebasestorage.googleapis.com/v0/b/fabromal-gdn.appspot.com/o/quilt%2FCartoon%20Single%20Dohar%20%20(Microfiber%2C%20Blue%20Angry%20Birds%2C%20Blue%20Angry%20Birds)(240-220cm)-399.jpeg?alt=media&token=f29688a5-36d7-4398-9477-23fcb550613f",
      name: "104 TC Cotton Double Floral Bedsheet",
      rating: 4,
      wishlist: false,
      cart: false,
      stock: true,
      offer: 10,
      price: 599,
      cartprice: 599,
      qty: 1,
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
          liked: false,
          rating: 3,
          review:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim sem amet curabitur tortor donec. Convallis est ut fusce id cursus. Sodales eget amet, molestie",
        },
        {
          name: "Sam Billy",
          profile: "",
          likes: 2,
          liked: false,
          rating: 3,
          review:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim sem amet curabitur tortor donec. Convallis est ut fusce id cursus. Sodales eget amet, molestie",
        },
        {
          name: "Rishi 2001",
          profile: "",
          likes: 4,
          liked: true,
          rating: 3,
          review:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim sem amet curabitur tortor donec. Convallis est ut fusce id cursus. Sodales eget amet, molestie",
        },
      ],
    },
    {
        img: "https://firebasestorage.googleapis.com/v0/b/fabromall.appspot.com/o/kitchen_towel%2FCotton%20Colors%20Color%20Printed%206%20Multicolor%20Napkins%20%20(6%20Sheets)-380.jpeg?alt=media&token=014f3319-5e17-4cd6-868f-da01f350a78c",
        name: "104 TC Cotton Double Floral Bedsheet",
        rating: 4,
        wishlist: false,
        cart: false,
        stock: false,
        offer: 10,
        price: 599,
        cartprice: 599,
        qty: 1,
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
            liked: false,
            rating: 3,
            review:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim sem amet curabitur tortor donec. Convallis est ut fusce id cursus. Sodales eget amet, molestie",
          },
          {
            name: "Sam Billy",
            profile: "",
            likes: 2,
            liked: false,
            rating: 3,
            review:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim sem amet curabitur tortor donec. Convallis est ut fusce id cursus. Sodales eget amet, molestie",
          },
          {
            name: "Rishi 2001",
            profile: "",
            likes: 4,
            liked: true,
            rating: 3,
            review:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim sem amet curabitur tortor donec. Convallis est ut fusce id cursus. Sodales eget amet, molestie",
          },
        ],
      },
  ]);

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

  return (
    <div className="my-cart-container">
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
        <div className="cart-list">
          {mycart.map((eacprd, index) => (
            <div className="e-cart-prd">
              <div className="e-cart-prd-des">
                <div className="e-cart-name">{eacprd.name}</div>
                <div className="e-cart-rating">
                    <div>
                    {marked(eacprd.rating)} {eacprd.rating}.0
                    </div>
                  <div className="stock-div" id="cart-stock-div">
                {eacprd.stock ? (
                  <div className="stock-in">
                    <i id="cart-stock-icon" class="fas fa-check-circle"></i>
                    Stock Available
                  </div>
                ) : (
                  <div className="stock-out">Out of Stock !</div>
                )}
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
                        <text>Added to wishlist</text>
                      </div>
                    ) : (
                      <div className="cart-unadded-wish">
                        <i class="far fa-heart"></i>{" "}
                        <text>Add to wishlist</text>
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
               </button>&nbsp;&nbsp;
               <button className="remove-cart-button" onClick={()=>{
                   var cpy=[...mycart]
                   cpy.splice(index,1)
                   setMycart(cpy)
               }}>
               <i class="fas fa-trash"></i> &nbsp;Remove
               </button>
              </div>
              </div>
              <div className="e-cart-img-div">
                <img src={eacprd.img} className="e-cart-img" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Cart;
