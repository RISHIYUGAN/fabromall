import React, { useState, useEffect } from "react";
import "./login.css";
import axios from "axios";
import { connect } from "react-redux";
import AxiosInstance from "../../axios/axiosInstance";
import { AuthChange } from "../../Redux/action";
import { Country } from "./country";
import stateicon from "../../../Assets/images/login/united-states.png"
import { assertTypeAlias } from "@babel/types";

const Login = (props) => {
  const [signup, setSignup] = useState(false);
  const [password, setPassword] = useState(false);
  const [signupDetails, setSignupDetails] = useState({
    // name: "",
    // contact: null,
    // email: "",
    // password: "",
    // country: "",
    // state: "",
    // addressline1: "",
    // addressline2: "",
    // pin:""
  });
  const [code, setCode] = useState();
  const [signuploading, setSignupLoading] = useState(false);
  const [loginloading, setLoginLoading] = useState(false);
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const [confirmSignup, setConfirmSignup] = useState(false);
  const [verifyloading, setVerifyloading] = useState(false);
  const [lastpage, setLastpage] = useState(false);
  const [countrypop,setCountrypop]=useState(false)

  const LoginbuttonDisable = () => {
    if (loginDetails.email && loginDetails.password) {
      var loginButton = document.querySelector("#loginButton");
      loginButton.disabled = false;
    } else {
      var loginButton = document.querySelector("#loginButton");
      loginButton.disabled = true;
    }
  };

  useEffect(() => {
    if (document.getElementById("nextButton")) {
      // console.log(signupDetails.name)
      if (
        signupDetails.name &&
        signupDetails.contact &&
        signupDetails.email &&
        signupDetails.password
      ) {
        var next = document.querySelector("#nextButton");
        next.disabled = false;
      } else {
        var next = document.querySelector("#nextButton");
        next.disabled = true;
      }
    }
    if (document.getElementById("submitButton")) {
      if (
        signupDetails.country &&
        signupDetails.state &&
        signupDetails.addressline1 &&
        signupDetails.pin
      ) {
        var submitButton = document.querySelector("#submitButton");
        submitButton.disabled = false;
      } else {
        var submitButton = document.querySelector("#submitButton");
        submitButton.disabled = true;
      }
    }
    document.getElementById("nextButton") &&
      console.log("next", !!document.getElementById("nextButton").disabled);
    document.getElementById("submitButton") &&
      console.log("submit", !!document.getElementById("submitButton").disabled);
    console.log(signupDetails);
  }, [signupDetails,lastpage]);
  useEffect(() => {
    if (document.getElementById("email-error")) {
      document.getElementById("email-error").innerHTML = "";
    }
    if (document.getElementById("error")) {
      document.getElementById("error").innerHTML = "";
    }
  }, [signup]);
  useEffect(() => {
    if (document.getElementById("password")) {
      if (!password) {
        document.getElementById("password").type = "password";
      } else {
        document.getElementById("password").type = "text";
      }
    }
  }, [password]);

  const newUser = (e) => {
    e.preventDefault();
    setSignupLoading(true)
    document.getElementById("submitButton").disabled = "true";
    AxiosInstance.post("/signup", signupDetails)
      .then((res) => {
        document.getElementById("submitButton").disabled = "false";
        console.log("response", res.data);
        setSignupLoading(false);
        setConfirmSignup(true);
        document.getElementById("email-error").innerHTML = "";
      })
      .catch((error) => {
        setSignupLoading(false);
      });
  };
  const logging = (e) => {
    e.preventDefault();
    setLoginLoading(true);
    AxiosInstance.post("/login", loginDetails)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("tok", res.data.token);
        props.dispatch(AuthChange(localStorage.getItem("tok")));
        setLoginLoading(false);
      })
      .catch((error) => {
        setLoginLoading(false);
        if (error.response) {
          if (error.response.status === 401) {
            document.getElementById("error").innerHTML =
              "Invalid username or password !";
            e.target.email.value = "";
            e.target.password.value = "";
          }
        }
      });
  };
  const confirmcode = (e) => {
    e.preventDefault();
    setVerifyloading(true);
    console.log(e.target.vcode.value);
    AxiosInstance.post("/signup_check", {
      email: signupDetails.email,
      otp: e.target.vcode.value,
    })
      .then((res) => {
        setVerifyloading(false);
        console.log(res.data);
        if (res.data.attempts) {
          if (res.data.status === 200) {
            setTimeout(() => {
              setConfirmSignup(false);
              setSignup(false);
              setCode("");
            }, 2500);
            document.getElementById("verify-error").innerHTML =
              "Signup Successful";
            document.getElementById("verify-error").style.color = "green";
            document.getElementById("verify-error").style.padding = "0px 5px";
            document.getElementById("verify-error").style.width = "100%";
            setTimeout(() => {
              document.getElementById("verify-error").style.width = "0px";
              document.getElementById("verify-error").style.padding = "0px 0px";
            }, 2000);
          } else {
            document.getElementById("verify-error").innerHTML =
              "OTP is Incorrect! Please verify and try again";
            document.getElementById("verify-error").style.color = "red";
            document.getElementById("verify-error").style.padding = "0px 5px";
            document.getElementById("verify-error").style.width = "100%";
            setTimeout(() => {
              document.getElementById("verify-error").style.width = "0px";
              document.getElementById("verify-error").style.padding = "0px 0px";
            }, 4000);
          }
        } else {
          document.getElementById("verify-error").innerHTML =
            "Too many attempts! Please verify your mail and try again";
          document.getElementById("verify-error").style.color = "red";
          document.getElementById("verify-error").style.padding = "0px 5px";
          document.getElementById("verify-error").style.width = "100%";

          setTimeout(() => {
            document.getElementById("verify-error").style.width = "0px";
            document.getElementById("verify-error").style.padding = "0px 0px";
          }, 5000);
        }
      })
      .catch((error) => {
        console.log(error);
        setVerifyloading(false);
      });
  };

  const verifymail=(e)=>{
    e.preventDefault();
    document.getElementById("nextButton").disabled = "true";
    setSignupLoading(true);
    if (
      (document.querySelector("#Sign_upMessage").innerHTML =
        "! Email already exists")
    ) {
      document.querySelector("#Sign_upMessage").innerHTML = "";
    }
    document.querySelector("#Sign_upMessage").innerHTML = "";
    AxiosInstance.post("verifyemail",{
      email:signupDetails.email
    })
    .then(()=>{
      document.getElementById("nextButton").disabled = "false";
      setSignupLoading(false);
      setPassword(false);
      setLastpage(true);
    })
    .catch((error) => {
      setSignupLoading(false);
      if (error.response) {
        if (error.response.status === 401) {
          document.getElementById("email-error").innerHTML =
            "Email already exists !";
          e.target.signupemail.value = "";
        }
      }
    });
  }

  return (
    <div>
      <div className="login-image"></div>
      <div className="Login-Container">
        <div className="login-wrapper">
          <div className="side-image">
            <div
              style={{
                marginTop: "10px",
                marginLeft: "20px",
                fontSize: "18px",
              }}
            >
              <text style={{ color: "#FF4545" }}>fabro</text>
              <text style={{ color: "#374FCD" }}>Mall</text>
            </div>
            <h3 className="quote">Make Your Choice Wise</h3>
          </div>
          {!signup ? (
            <div className="sidebox">
              <p id="error" className="error"></p>
              <div className="Login-text">
                <h2>LOGIN</h2>
              </div>
              <div className="Login">
                <div className="user-div">
                  <i
                    class="fas fa-user-circle"
                    style={{ borderRadius: "50%" }}
                  ></i>
                </div>

                <div className="login-div">
                  <form
                    onSubmit={(e) => {
                      setPassword(false);
                      logging(e);
                    }}
                    autoComplete="on"
                  >
                    <div className="division_1">
                      <div>
                        <i class="fas fa-envelope"></i>
                      </div>
                      <input
                        name="email"
                        onChange={(e) => {
                          setLoginDetails({
                            ...loginDetails,
                            email: e.target.value,
                          });
                        }}
                        type="email"
                        className="input"
                        placeholder="Email-id"
                      />
                    </div>
                    <div className="division_2">
                      <div>
                        <i class="fas fa-lock"></i>
                      </div>
                      <input
                        name="password"
                        id="password"
                        onChange={(e) => {
                          setLoginDetails({
                            ...loginDetails,
                            password: e.target.value,
                          });
                        }}
                        type="password"
                        placeholder="Password"
                        className="input"
                      />
                      {password ? (
                        <i
                          onClick={() => setPassword(false)}
                          class="fas fa-eye"
                        ></i>
                      ) : (
                        <i
                          onClick={() => {
                            setPassword(true);
                          }}
                          class="fas fa-eye-slash"
                        ></i>
                      )}
                    </div>
                    <br />
                    <br />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div className="forgot-pass">Forgot Password ?</div>
                      <button
                        className="Submitbutton"
                        id="loginButton"
                        disabled={true}
                      >
                        <h3>
                          {loginloading ? (
                            <i class="fas fa-circle-notch fa-spin"></i>
                          ) : (
                            "Log-in"
                          )}
                        </h3>
                      </button>
                      {document.querySelector("#loginButton") &&
                        LoginbuttonDisable()}
                    </div>
                  </form>
                  <br />
                </div>
              </div>
              <div className="new-user">
                <h4>New user ?</h4>
                <text
                  href=""
                  className="Register"
                  onClick={() => {
                    setPassword(false);
                    setSignup(!signup);
                  }}
                >
                  <h5>Sign up</h5>
                </text>
              </div>
            </div>
          ) : confirmSignup ? (
            // code confirm
            <div className="sidebox">
              <h4
                className="ExitButton"
                onClick={() => {
                  setPassword(false);
                  setSignup(!signup);
                  setConfirmSignup(false);
                  setLastpage(false)
                  setCode("");
                  setSignupDetails({})
                }}
              >
                x
              </h4>
              <form
                onSubmit={(e) => {
                  confirmcode(e);
                  setLastpage(false)
                  setSignupDetails({})
                }}
              >
                <div className="confirm-signup">
                  <p className="verify-error" id="verify-error">
                    Too many attempts verify mail and signup again !
                  </p>
                  <h2 className="verify-header">Verify Code</h2>
                  <div className="verify-content">
                    A confirmation code was sent to your mail. please check the
                    5 digit code sent to your mail and enter below
                  </div>
                  <label>Enter Code:</label>
                  <input
                    type="text"
                    value={code}
                    className="verify-input"
                    name="vcode"
                    onChange={(e) => {
                      if (e.target.value.match(/^\d{0,5}$/)) {
                        setCode(e.target.value);
                      }
                    }}
                  />
                </div>
                <div className="verify-btn">
                  <button>
                    {verifyloading ? (
                      <i class="fas fa-circle-notch fa-spin"></i>
                    ) : (
                      "Verify"
                    )}
                  </button>
                </div>
              </form>
            </div>
          ) : // Signup page1
          !lastpage ? (
            <div className="sidebox">
              <h4
                className="ExitButton"
                onClick={() => {
                  setPassword(false);
                  setSignup(!signup);
                  setSignupDetails({})
                }}
              >
                x
              </h4>
              <p className="error" id="email-error"></p>
              <h2 className="Login-text">SIGN UP</h2>
              <div className="Login">
                <div>
                  <p
                    id="Sign_upMessage"
                    style={{
                      color: "red",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  ></p>
                  <form
                    onSubmit={(e) => {
                      verifymail(e)
                    }}
                  >
                    <div className="s-user-div">
                      <i class="fas fa-user-plus"></i>
                    </div>
                    <div>
                      <div className="contact-div">
                        <div className="division_3">
                          <div>
                            <i class="fas fa-user"></i>
                          </div>
                          <input
                            name="signupname"
                            value={signupDetails.name}
                            onChange={(e) => {
                              setSignupDetails({
                                ...signupDetails,
                                name: e.target.value,
                              });
                            }}
                            type="text"
                            className="con-input"
                            placeholder="User-name"
                            required={true}
                          />
                        </div>
                        <div className="division_3">
                          <div>
                            <i class="fas fa-phone"></i>
                          </div>
                          <input
                            name="signupcontact"
                            value={signupDetails.contact}
                            onChange={(e) => {
                              setSignupDetails({
                                ...signupDetails,
                                contact: e.target.value,
                              });
                            }}
                            type="number"
                            className="con-input"
                            placeholder="Contact"
                            required={true}
                          />
                        </div>
                      </div>
                      <br />
                      <br />

                      <div className="division_4">
                        <div>
                          <i class="fas fa-envelope"></i>
                        </div>
                        <input
                          name="signupemail"
                          value={signupDetails.email}
                          onChange={(e) => {
                            setSignupDetails({
                              ...signupDetails,
                              email: e.target.value,
                            });
                          }}
                          type="email"
                          className="input"
                          placeholder="Email-id"
                          required={true}
                        />
                      </div>
                      <br />
                      <br />

                      <div className="division_5">
                        <div>
                          <i class="fas fa-lock"></i>
                        </div>
                        <input
                          onChange={(e) => {
                            setSignupDetails({
                              ...signupDetails,
                              password: e.target.value,
                            });
                          }}
                          value={signupDetails.password}
                          type="password"
                          name="signuppassword"
                          placeholder="Password"
                          className="input"
                          id="password"
                        />
                        {password ? (
                          <i
                            onClick={() => setPassword(false)}
                            class="fas fa-eye"
                          ></i>
                        ) : (
                          <i
                            onClick={() => {
                              setPassword(true);
                            }}
                            class="fas fa-eye-slash"
                          ></i>
                        )}
                      </div>
                      <br />
                      <br />
                      <div style={{ textAlign: "center" }}>
                        <button
                          className="Submitbutton"
                          id="nextButton"
                          disabled={true}
                        >
                          <h3>
                            {signuploading ? (
                              <i class="fas fa-circle-notch fa-spin"></i>
                            ) : (
                              "Next"
                            )}
                          </h3>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          ) : (
            // signup page2
            <div className="sidebox">
              <h4
                className="ExitButton"
                id="prevexit"
              >
                <div className="prev-div" onClick={()=>
                  setLastpage(false)
                  }>
                  <i class="fas fa-arrow-left"></i>
                </div>
                <div onClick={() => {
                  setPassword(false);
                  setSignup(!signup);
                  setLastpage(false)
                  setSignupDetails({})
                }}>x</div>
              </h4>
              <p className="error" id="email-error"></p>
              <h2 className="Login-text">SIGN UP</h2>
              <div className="Login">
                <div>
                  <p
                    id="Sign_upMessage"
                    style={{
                      color: "red",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  ></p>
                  <form
                    onSubmit={(e) => {
                      setPassword(false);
                      newUser(e);
                    }}
                  >
                    <div className="s-user-div">
                      <i class="fas fa-user-plus"></i>
                    </div>
                    <div>
                      <div className="contact-div">
                        <div className="division_3" id="countrydiv">
                          <div>
                            <i class="fas fa-flag"></i>
                          </div>
                          <input
                            name="signupcountry"
                            value={signupDetails.country?signupDetails.country:""}
                            type="text"
                            className="con-input"
                            placeholder="Country"
                            required={true}
                            readOnly={true}
                          />
                         <Country setcountry={(e)=> setSignupDetails({
                                ...signupDetails,
                                country: e.target.innerHTML,
                              })}/>
                        </div>
                        <div className="division_3">
                          <div>
                            <img src={stateicon} className="state-icon"/>
                          </div>
                          <input
                            name="signupstate"
                            value={signupDetails.state?signupDetails.state:""}
                            onChange={(e) => {
                              setSignupDetails({
                                ...signupDetails,
                                state: e.target.value,
                              });
                            }}
                            type="text"
                            className="con-input"
                            placeholder="State"
                            required={true}
                          />
                        </div>
                      </div>
                      <br />
                      <br />

                      <div className="division_4">
                        <div>
                        <i class="fas fa-address-card"></i>
                        </div>
                        <input
                          name="signupaddline1"
                          value={signupDetails.addressline1?signupDetails.addressline1:""}
                          onChange={(e) => {
                            setSignupDetails({
                              ...signupDetails,
                              addressline1: e.target.value,
                            });
                          }}
                          type="text"
                          className="input"
                          placeholder="Address line-1"
                          required={true}
                        />
                      </div>
                      <br />
                      <br />

                      <div className="division_5" id="addresspin">
                        <div className="addressline">
                          <div>
                          <i class="fas fa-address-card"></i>
                          </div>
                          <input
                            value={signupDetails.addressline2}
                            onChange={(e) => {
                              setSignupDetails({
                                ...signupDetails,
                                addressline2: e.target.value,
                              });
                            }}
                            type="text"
                            name="signupaddline2"
                            placeholder="Address line-2 (optional)"
                            className="input"
                          />
                        </div>
                        <div className="pin">
                          <div>
                          <i class="fas fa-city"></i>
                          </div>
                          <input
                            value={signupDetails.pin}
                            onChange={(e) => {
                              setSignupDetails({
                                ...signupDetails,
                                pin: e.target.value,
                              });
                            }}
                            type="text"
                            name="pincode"
                            placeholder="pin"
                            className="input"
                            required={true}
                          />
                        </div>
                      </div>
                      <br />
                      <br />
                      <div style={{ textAlign: "center" }}>
                        <button
                          className="Submitbutton"
                          id="submitButton"
                          disabled={true}
                        >
                          <h3>
                            {signuploading ? (
                              <i class="fas fa-circle-notch fa-spin"></i>
                            ) : (
                              "Sign Up"
                            )}
                          </h3>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default connect()(Login);
