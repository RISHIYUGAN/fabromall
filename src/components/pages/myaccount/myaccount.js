import React, { useState, useEffect } from "react";
import "./myaccount.css";
import profile from "../../../Assets/images/header/user.jpg";
import { connect } from "react-redux";
import { AuthChange } from "../../Redux/action";
import { useRef } from "react";
import { database } from "../../firebase/firebase";
import axios from "axios";
import Compressor from "compressorjs";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import stateicon from "../../../Assets/images/login/united-states.png";
import AxiosInstance from "../../axios/axiosInstance";
import { Loader } from "../../utility/loader/loader";

var ImageCompressor = require("image-compressor");

const MyAccount = (props) => {
  const [profilepic, setProfilepic] = useState(profile);
  const [progress, setProgress] = useState(0);
  const [isprogress, setIsprogress] = useState(false);
  const [eidtprofile, setEditprofile] = useState(false);
  const [pageloading, setPageLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [updateload, setUpdateload] = useState(false);
  const [switchedit,setSwitchedit] = useState(false)

  const inputRef = useRef();
  const [info, setInfo] = useState({});
  const [editcontent, setEditcontent] = useState();

  useEffect(() => {
    AxiosInstance.post("view-profile").then((res) => {
      console.log(res.data);
      setInfo(res.data);
      setPageLoading(false);
    });
  }, []);

  // useEffect(() => {
  //  const storage = database.storage();
  //   var storageRef = storage.ref("profile/");
  //   var listRef = storageRef;
  //   console.log(listRef);
  //   listRef.listAll().then((res) => {
  //     console.log(res);
  //     res.items.forEach((itemRef, index) => {
  //       console.log(itemRef);
  //       itemRef.getDownloadURL().then((res) => {
  //         setProfilepic(res);
  //       });
  //     });
  //   });
  // }, []);

  const logout = () => {
    props.dispatch(AuthChange(null));
    localStorage.removeItem("tok");
  };

  const uploadimage = (e) => {
    if (e.target.files.length === 0) return;
    setIsprogress(true);
    const storage = database.storage();
    var file = e.target.files[0];
    new Compressor(file, {
      quality: 0.6,
      convertSize: 5000,
      success(result) {
        setProgress(75);
        const formData = new FormData();
        formData.append("file", result, result.name);
        console.log(result);
        storage
          .ref(`profile/${info.email.split("@")[0]}`)
          .put(result)
          .then((res) => {
            res.ref.getDownloadURL().then((url) => {
              setProgress(100);
              setTimeout(() => {
                setEditcontent({ ...editcontent, img: url });
                setIsprogress(false);
                setProgress(0);
              }, 1000);
            });
          });
      },
      error(err) {
        console.log(err.message);
      },
    });
  };

  const profileedit = (e) => {
    e.preventDefault();
    if (!updating) {
      setUpdating(true);
      setUpdateload(true);
      AxiosInstance.post("edit-profile", editcontent).then((res) => {
        setInfo(res.data);
        setUpdating(false);
        setUpdateload(false);
        setEditprofile(false);
      });
    }
  };
  return (
    <div className="my-account-container">
      {switchedit&&<div className="load-wait">
        <div class="sk-chase">
          <div class="sk-chase-dot"></div>
          <div class="sk-chase-dot"></div>
          <div class="sk-chase-dot"></div>
          <div class="sk-chase-dot"></div>
          <div class="sk-chase-dot"></div>
          <div class="sk-chase-dot"></div>
        </div>
      </div>}
      <input
        type="file"
        className="file-upload"
        accept="image/png, image/jpeg, image/jpg"
        ref={inputRef}
        onChange={(e) => {
          uploadimage(e);
        }}
      />
      {pageloading ? (
        <div className="ep-loader">
          <Loader color="rgb(93, 65, 255)" />
        </div>
      ) : eidtprofile ? (
        <div className="container">
          <form onSubmit={(e) => profileedit(e)}>
            <div className="edit-profile-container">
              <div className="bck-icon" onClick={() => setEditprofile(false)}>
                <i class="fas fa-arrow-left"></i>
              </div>
              <div className="edit-profile-wrapper">
              <div className="edit-pf-title">EDIT YOUR PROFILE<br/></div>
                <div
                  className="acc-prof-pic"
                  style={{
                    backgroundImage: `url("${
                      editcontent.img ? editcontent.img : profile
                    }")`,
                  }}
                  onClick={() => inputRef.current.click()}
                >
                  {isprogress && (
                    <div className="progress-div">
                      <CircularProgressbar
                        styles={{
                          // root: { width: "45px", height: "45px"},
                          text: {
                            fontSize: "28px",
                            fill: "green",
                          },
                        }}
                        strokeWidth={5}
                        value={progress}
                        className="progress"
                      />
                    </div>
                  )}
                </div>

                <div className="edit-input-wrapper">
                  <div className="input-1">
                    <div>
                      <div className="pf-icon-div">
                        <i class="fas fa-user"></i>
                      </div>
                      <input
                        type="text"
                        placeholder="Name"
                        required="true"
                        value={editcontent.name}
                        onChange={(e) => {
                          setEditcontent({
                            ...editcontent,
                            name: e.target.value,
                          });
                        }}
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
                        value={editcontent.country}
                        onChange={(e) => {
                          setEditcontent({
                            ...editcontent,
                            country: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="input-2">
                    <div>
                      <div className="pf-icon-div">
                        <i class="fas fa-address-card"></i>
                      </div>
                      <input
                        type="text"
                        placeholder="Address Line - 1"
                        value={editcontent.addressline1}
                        required="true"
                        onChange={(e) => {
                          setEditcontent({
                            ...editcontent,
                            addressline1: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="input-3">
                    <div>
                      <div className="pf-icon-div">
                        <i class="fas fa-address-card"></i>
                      </div>
                      <input
                        type="text"
                        placeholder="Address Line - 2"
                        value={editcontent.addressline2}
                        onChange={(e) => { 
                          setEditcontent({
                            ...editcontent,
                            addressline2: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="input-4">
                    <div>
                      <div className="pf-icon-div">
                        <img src={stateicon} className="state-icon" />
                      </div>
                      <input
                        type="text"
                        placeholder="State"
                        value={editcontent.state}
                        required="true"
                        onChange={(e) => {
                          setEditcontent({
                            ...editcontent,
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
                        value={editcontent.pin}
                        required="true"
                        onChange={(e) => {
                          setEditcontent({
                            ...editcontent,
                            pin: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="update-pf-div">
                  <button className="update-pf">
                    {updateload ? <Loader /> : "Update"}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div className="container">
          <div className="account-wrapper">
            <div className="acc-prof-pic-wrapper">
              <div className="acc-prof-pic-div">
                <div
                  className="acc-prof-pic"
                  style={{
                    backgroundImage: `url("${info.img ? info.img : profile}")`,
                  }}
                >
                  {isprogress && (
                    <div className="progress-div">
                      <CircularProgressbar
                        styles={{
                          // root: { width: "45px", height: "45px"},
                          text: {
                            fontSize: "28px",
                            fill: "green",
                          },
                        }}
                        strokeWidth={5}
                        value={progress}
                        className="progress"
                      />
                    </div>
                  )}
                </div>
                <div className="acc-name-div">
                  <h3>{info.name}</h3>
                  <div className="user-mobile">
                    <div>{info.contact}</div>
                  </div>
                </div>
              </div>
              <button
                className="acc-edit-btn"
                onClick={() => {
                  setSwitchedit(true)
                  setEditcontent(info);
                  setTimeout(()=>{
                    setSwitchedit(false)
                    setEditprofile(true);
                  },5000)
                }}
              >
                Edit Profile
              </button>
            </div>
            <div className="acc-count-div">
              <div className="acc-each-info">
                <h4>My Cart</h4>
                <div>{info.cart}</div>
              </div>
              <div className="acc-each-info">
                <h4>My WishList</h4>
                <div>{info.wishlist}</div>
              </div>
              <div className="acc-each-info">
                <h4>My Order</h4>
                <div>{info.order}</div>
              </div>
            </div>
            <div className="acc-address-div">
              <div className="acc-each-info">
                <h4>Country</h4>
                <div>{info.country}</div>
              </div>
              <div className="acc-each-info">
                <h4>State</h4>
                <div>{info.state}</div>
              </div>
              <div className="acc-each-info">
                <h4>Email</h4>
                <div>{info.email}</div>
              </div>
              <div className="acc-each-info">
                <h4>Address</h4>
                <div className="a">
                  {info.addressline1 + "," + info.addressline2 + "-" + info.pin}
                </div>
              </div>
            </div>
            <button
              className="logout"
              onClick={() => {
                logout();
              }}
            >
              <i class="fas fa-power-off"></i>&nbsp;Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default connect()(MyAccount);
