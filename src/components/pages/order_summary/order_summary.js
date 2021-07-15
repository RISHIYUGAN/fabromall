import React, { useEffect, useState } from "react";
import "./order_summary.css";
import stateicon from "../../../Assets/images/login/united-states.png";
import { Loader } from "../../utility/loader/loader";
import AxiosInstance from "../../axios/axiosInstance";
import image from "../../../Assets/images/home/gal4.png"
import imageToBase64 from 'image-to-base64/browser';
import domtoimage from 'dom-to-image';
import BillGenerate from "../billgenerate/billgenerate";


const OrderSummary = () => {
  const [product, setProduct] = useState({});
  const [updateload, setUpdateload] = useState(false);
  const [nextpage, setNextpage] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [page, setPage] = useState(1);
  const [pageloading, setPageloading] = useState(true);
  const [profile, setProfile] = useState({});
  const [contactcopy, setContactcopy] = useState(null);
  const [deliverycharge,setDeliverycharge] = useState(30)
  const [img,setImg] = useState(image)
  const [bill,setBill] = useState(false)
  const [paymentinfo,setPaymentinfo] = useState()

  useEffect(() => {
    const payprd = JSON.parse(localStorage.getItem("paymentprd"));
    AxiosInstance.post("/order_summary", {
      product: payprd,
    }).then((res) => {
      console.log(res.data);
      setProduct(res.data.product);
      setProfile(res.data.profile);
      setContactcopy(res.data.profile.contact);
      setPageloading(false);
      setTimeout(() => {
        document.getElementById("sum-require").style.opacity = "1";
      }, 3000);
      setTimeout(() => {
        document.getElementById("sum-require").style.opacity = "0";
      }, 20000);
    })
    .catch(()=>{
      setPageloading(false);
      setProduct(payprd)
    })
  }, []);
  useEffect(() => {
    if (document.getElementById(`dot-${page}`)) {
      document.getElementById(`dot-${page}`).style.backgroundColor = "#4891fd";
      document.getElementById(`dot-${page}`).style.border = "1px solid #4891fd";
    }
  }, [page]);

  //RazorPay
  const loadscript = () => {
    return new Promise((resolve) => {
      var script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      document.body.appendChild(script);
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
    });
  };

  const razorpay = async () => {
    const loaded = await loadscript();
    if (!loaded) {
      alert("Something went Wrong! Are you online");
      return;
    }
    AxiosInstance.post("/razorpay", {
      product,
      quantity,
      profile,
    }).then((res) => {
      console.log(res);
      var options = {
        key: "rzp_test_0BykHemMDAXEcs",
        amount: res.data.amount,
        currency: res.data.currency,
        name: res.data.name,
        description: "Fabromall Order Payment",
        image: "https://example.com/your_logo",
        order_id: res.data.orderid,
        callback_url: "https://eneqd3r9zrjok.x.pipedream.net/",
        handler: function (response) {
          // alert(response.razorpay_payment_id);
          // alert(response.razorpay_order_id);
          // alert(response.razorpay_signature);
          setPaymentinfo({
            paymentid:response.razorpay_payment_id,
            orderid:response.razorpay_order_id
          })
          setBill(true)
        },
        prefill: {
          name: res.data.name,
          email: res.data.email,
          contact: res.data.contact,
        },
        theme: {
          color: "#3399cc",
        },
      };
      var payment = new window.Razorpay(options);
      payment.open();
    });
  };

   

  return (
    <div className="summary-container">
      <div className="container">
        {pageloading ? (
          <div className="ep-loader">
            <Loader color="rgb(93, 65, 255)" />
          </div>
        ) : (
          <div className="summary-wrapper" >
            <div className="summary-product">
              <div className="sum-img-wrapper">
                <div
                  style={{
                    backgroundImage: `url("${product.img}")`,
                  }}
                  className="bck-img-ref"
                ></div>
                <div className="sum-img-div">
                  <img src={product.img} className="sum-img"/>
                </div>
              </div>
              <div className="summary-des">
                <div className="prd-des-ref"></div>
                <div className="summary-name">{product.name}</div>
                <div className="sum-each-info-div">
                  <div className="sum-each-info">
                    <div className="sum-each-info-key">Size</div>
                    <div className="sum-each-info-value">
                      {product.description.size}
                    </div>
                  </div>
                  <div className="sum-each-info">
                    <div className="sum-each-info-key">Color</div>
                    <div className="sum-each-info-value">
                      {product.description.color}
                    </div>
                  </div>
                  <div className="sum-each-info">
                    <div className="sum-each-info-key">Package</div>
                    <div className="sum-each-info-value">
                      pack of {product.description.package}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="summary-content">
              <div className="summary-title">Order Summary</div>
              <div className="page-dot-div">
                <div id="dot-1"></div>
                <div id="dot-2"></div>
                <div id="dot-3"></div>
              </div>
              <div className="pageswap" id="animate">
                <div className="personal-info">
                  <div className="pi-title">Product Info</div>
                  <div className="sum-prd-info-wrapper">
                    <div className="sum-prd-des">
                      <div className="sum-prd-name">
                        <div className="each-sum-prd-name">Product Name</div>
                        <input
                          value={product.name}
                          className="sum-name-value"
                          readOnly={true}
                        />
                      </div>

                      <div className="sum-prd-each-des">
                        <div className="each-sum-prd-key">Product Size</div>
                        <div className="sum-prd-value">
                          {product.description.size}
                        </div>
                      </div>
                      <div className="sum-prd-each-des">
                        <div className="each-sum-prd-key">Quantity</div>
                        <div className="sum-prd-value">
                          <input
                            value={quantity}
                            className="sum-qty"
                            onChange={(e) => {
                              if (e.target.value.match(/^\d{0,3}$/)) {
                                setQuantity(e.target.value);
                              }
                            }}
                            onBlur={(e) => {
                              if (e.target.value === "") {
                                setQuantity(1);
                              }
                            }}
                            required="true"
                          />
                          <div className="sum-required-div" id="sum-require">
                            <div className="sum-exclamate">
                              <i class="fas fa-exclamation"></i>
                            </div>
                            <div>
                              You can change your Quantity here{" "}
                              <div className="sum-extend"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="sum-prd-each-des">
                        <div className="each-sum-prd-key">Product Color</div>
                        <div className="sum-prd-value">
                          {product.description.color}
                        </div>
                      </div>
                      <div className="sum-prd-each-des">
                        <div className="each-sum-prd-key">Package</div>
                        <div className="sum-prd-value">
                          Pack of {product.description.package}
                        </div>
                      </div>
                      <div className="sum-prd-each-des">
                        <div className="each-sum-prd-key">Model Number</div>
                        <div className="sum-prd-value">
                          {product.model_number}
                        </div>
                      </div>
                    </div>
                    <div className="sum-prd-update-pf-div">
                      <button
                        className="sum-update-pf"
                        onClick={(e) => {
                          document.getElementById("animate").style.transform =
                            "translateX(-100%)";
                          setPage(2);
                        }}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>

                <div className="personal-info">
                  <div className="pi-title">Personal Info</div>
                  <div className="personal-input-wrapper">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <div className="sum-profile-wrapper">
                        <div className="sum-input-wrapper">
                          <div className="sum-input-1">
                            <div>
                              <div className="pf-icon-div">
                                <i class="fas fa-user"></i>
                              </div>
                              <input
                                type="text"
                                placeholder="Name"
                                required="true"
                                value={profile.name}
                                readOnly="true"
                              />
                            </div>
                            <div>
                              <div className="pf-icon-div">
                                <i class="fas fa-phone"></i>
                              </div>
                              <input
                                type="text"
                                placeholder="Contact"
                                required="true"
                                value={contactcopy}
                                onChange={(e) => {
                                  if (e.target.value.match(/^\d{0,10}$/)) {
                                    setContactcopy(e.target.value);
                                  }
                                }}
                                onBlur={(e) => {
                                  if (e.target.value.match(/^\d{10,10}$/)) {
                                    setProfile({
                                      ...profile,
                                      contact: e.target.value,
                                    });
                                  } else {
                                    setContactcopy(profile.contact);
                                  }
                                }}
                              />
                            </div>
                          </div>
                          <div className="sum-input-2">
                            <div>
                              <div className="pf-icon-div">
                                <i class="fas fa-address-card"></i>
                              </div>
                              <input
                                type="text"
                                placeholder="Address Line - 1"
                                value={profile.addressline1}
                                required="true"
                                onChange={(e) => {
                                  setProfile({
                                    ...profile,
                                    addressline1: e.target.value,
                                  });
                                }}
                              />
                            </div>
                          </div>
                          <div className="sum-input-3">
                            <div>
                              <div className="pf-icon-div">
                                <i class="fas fa-address-card"></i>
                              </div>
                              <input
                                type="text"
                                placeholder="Address Line - 2"
                                value={profile.addressline2}
                                onChange={(e) => {
                                  setProfile({
                                    ...profile,
                                    addressline2: e.target.value,
                                  });
                                }}
                              />
                            </div>
                          </div>
                          <div className="sum-input-1">
                            <div>
                              <div className="pf-icon-div">
                                <i class="fas fa-envelope"></i>
                              </div>
                              <input
                                type="email"
                                placeholder="email"
                                required="true"
                                value={profile.email}
                                readOnly="true"
                              />
                            </div>
                            <div>
                              <div className="pf-icon-div">
                                <i class="fas fa-flag"></i>
                              </div>
                              <input
                                type="text"
                                placeholder="Country"
                                required="true"
                                value={profile.country}
                                onChange={(e) => {
                                  setProfile({
                                    ...profile,
                                    country: e.target.value,
                                  });
                                }}
                              />
                            </div>
                          </div>
                          <div className="sum-input-4">
                            <div>
                              <div className="pf-icon-div">
                                <img src={stateicon} className="state-icon" />
                              </div>
                              <input
                                type="text"
                                placeholder="State"
                                value={profile.state}
                                required="true"
                                onChange={(e) => {
                                  setProfile({
                                    ...profile,
                                    state: e.target.value,
                                  });
                                }}
                              />
                            </div>
                            <div>
                              <div className="pf-icon-div">
                                <i class="fas fa-city"></i>
                              </div>
                              <input
                                type="text"
                                placeholder="pincode"
                                value={profile.pin}
                                required="true"
                                onChange={(e) => {
                                  setProfile({
                                    ...profile,
                                    pin: e.target.value,
                                  });
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="sum-update-pf-div">
                          <button
                            className="sum-update-pf"
                            onClick={(e) => {
                              document.getElementById(
                                "animate"
                              ).style.transform = "translateX(-200%)";
                              setPage(3);
                            }}
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

                <div className="payment-info">
                  <div className="pi-title">Payment Info</div>
                  <div className="payment-info-wrapper">
                    <div className="product-price">
                      <div className="sum-price">
                        <div className="each-sum-price">Original Price</div>
                        <div className="price-value">
                          <i class="fas fa-rupee-sign"></i>&nbsp;{product.price}
                        </div>
                      </div>
                      <div className="sum-price">
                        <div className="each-sum-price">Product Offer</div>
                        <div className="price-value">{product.offer} %</div>
                      </div>
                      <div className="sum-price">
                        <div className="each-sum-price">Discount Price</div>
                        <div className="price-value">
                          <i class="fas fa-rupee-sign"></i>&nbsp;{product.discountprice}
                        </div>
                      </div>
                    </div>
                    {console.log(product)}
                    <div className="amount-payable">
                      <div className="sum-price">
                        <div className="each-sum-price">Product Amount</div>
                        <div className="price-value">
                          <i class="fas fa-rupee-sign"></i>&nbsp;
                          {product.discountprice * quantity}
                        </div>
                      </div>
                      <div className="sum-price">
                        <div className="each-sum-price">No.Of Pieces</div>
                        <div className="price-value">{quantity}</div>
                      </div>
                      <div className="sum-price">
                        <div className="each-sum-price">Delivery Charge</div>
                        <div className="price-value">
                          <i class="fas fa-rupee-sign"></i>&nbsp;{deliverycharge}
                        </div>
                      </div>
                      <div className="sum-price total">
                        <h4 className="each-sum-price">Total</h4>
                        <div className="price-value">
                          <i class="fas fa-rupee-sign"></i>&nbsp;{product.discountprice * quantity+deliverycharge}
                        </div>
                      </div>
                    </div>
                    <div className="proceed-btn-div">
                      <button
                        className="proceed-btn"
                        onClick={() => {
                          razorpay();
                        }}
                      >
                        Proceed to Pay
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {bill&&<BillGenerate exitbill={()=>setBill(false)} product={product} quantity={quantity} deliverycharge={deliverycharge} profile={profile} payment={paymentinfo}/>}
          </div>
        )}
      </div>
      {/* <button onClick={()=>{
        downloadimg()
      }}>download</button> */}
    </div>
  );
};

export default OrderSummary;
