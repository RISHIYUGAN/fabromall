import React, { useState, useEffect } from "react";
import "./login.css";
import axios from "axios";
import { connect } from "react-redux";
import AxiosInstance from "../../axios/axiosInstance";
import { AuthChange } from "../../Redux/action";

const Login = (props) => {
  const [signup, setSignup] = useState(false);
  const [password, setPassord] = useState(false);
  const [signupDetails, setSignupDetails] = useState({
    name: "",
    email: "",
    password: "",
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

  const LoginbuttonDisable = () => {
    if (loginDetails.email && loginDetails.password) {
      var loginButton = document.querySelector("#loginButton");
      loginButton.disabled = false;
    } else {
      var loginButton = document.querySelector("#loginButton");
      loginButton.disabled = true;
    }
  };
  const SignupbuttonDisable = () => {
    if (signupDetails.name && signupDetails.email && signupDetails.password) {
      var submitButton = document.querySelector("#submitButton");
      submitButton.disabled = false;
    } else {
      var submitButton = document.querySelector("#submitButton");
      submitButton.disabled = true;
    }
  };
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
    document.getElementById("submitButton").disabled = "true";
    setSignupLoading(true);
    if (
      (document.querySelector("#Sign_upMessage").innerHTML =
        "! Email already exists")
    ) {
      document.querySelector("#Sign_upMessage").innerHTML = "";
    }
    document.querySelector("#Sign_upMessage").innerHTML = "";
    e.preventDefault();
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
        if (error.response) {
          if (error.response.status === 401) {
            document.getElementById("email-error").innerHTML =
              "Email already exists !";
            e.target.signupname.value = "";
            e.target.signupemail.value = "";
            e.target.signuppassword.value = "";
            e.target.signupcontact.value = "";
          }
        }
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
        // document.getElementById.id("error").innerHTML=""
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
              setCode("")
            }, 2500);
            document.getElementById("verify-error").innerHTML =
              "Signup Successful";
            document.getElementById("verify-error").style.color="green"
            document.getElementById("verify-error").style.padding = "0px 5px";
            document.getElementById("verify-error").style.width = "100%";
            setTimeout(() => {
              document.getElementById("verify-error").style.width = "0px";
              document.getElementById("verify-error").style.padding = "0px 0px";
            }, 2000);
          } else {
            document.getElementById("verify-error").innerHTML =
              "OTP is Incorrect! Please verify and try again";
            document.getElementById("verify-error").style.color="red"
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
          document.getElementById("verify-error").style.color="red"
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

                <div>
                  <form
                    onSubmit={(e) => {
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
                          onClick={() => setPassord(false)}
                          class="fas fa-eye"
                        ></i>
                      ) : (
                        <i
                          onClick={() => {
                            setPassord(true);
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
                    setSignup(!signup);
                  }}
                >
                  <h5>Sign up</h5>
                </text>
              </div>
            </div>
          ) : confirmSignup ? (
            <div className="sidebox">
              <h4
                className="ExitButton"
                onClick={() => {
                  setSignup(!signup);
                  setConfirmSignup(false);
                  setCode("")
                }}
              >
                x
              </h4>
              <form
                onSubmit={(e) => {
                  confirmcode(e);
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
          ) : (
            <div className="sidebox">
              <h4
                className="ExitButton"
                onClick={() => {
                  setSignup(!signup);
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
                      newUser(e);
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
                          type="password"
                          name="signuppassword"
                          placeholder="Password"
                          className="input"
                          id="password"
                        />
                        {password ? (
                          <i
                            onClick={() => setPassord(false)}
                            class="fas fa-eye"
                          ></i>
                        ) : (
                          <i
                            onClick={() => {
                              setPassord(true);
                            }}
                            class="fas fa-eye-slash"
                          ></i>
                        )}
                      </div>
                      <br />
                      <br />
                      {document.querySelector("#submitButton") &&
                        SignupbuttonDisable()}
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
                              "Sign-up"
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
