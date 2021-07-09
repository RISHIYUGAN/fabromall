import React,{useState,useEffect} from "react";
import "./myaccount.css";
import profile from "../../../Assets/images/header/user.jpg";
import { connect } from "react-redux";
import { AuthChange } from "../../Redux/action";
import { useRef } from "react";
import { database } from "../../firebase/firebase";
import axios from 'axios';
import Compressor from 'compressorjs';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';

var ImageCompressor=require("image-compressor")

const MyAccount = (props) => {
  const [profilepic,setProfilepic] = useState(profile)
  const [progress,setProgress]=useState(0)
  const [isprogress,setIsprogress]=useState(false)
  const inputRef=useRef()
  const [info,setInfo]=useState({
    cart:0,
    wishlist:0,
    order:0,
    country:"India",
    state:"Tamil Nadu",
    Address:"1,kulandhaimalainagar,velayuthampalayam,karur(Dt)-639117"
  })

  useEffect(()=>{
    const storage=database.storage()
    var storageRef = storage.ref("profile/");
    var listRef = storageRef;
    console.log(listRef)
    listRef.listAll()
    .then((res)=>{
      console.log(res)
      res.items.forEach((itemRef,index)=>{
        console.log(itemRef)
         itemRef.getDownloadURL()
         .then((res)=>{
            setProfilepic(res)
           
         })
      })
    })
  },[])

  const logout=()=>{
    props.dispatch(AuthChange(null))
    localStorage.removeItem("tok")
  }


  const uploadimage=(e)=>{
    if(e.target.files.length===0)
     return;
     setIsprogress(true)
    const storage=database.storage()
    var file=e.target.files[0]
    // var storageRef = storage.ref("profilepic/");
    // setProgress(25)
    new Compressor(file,
      {
       quality: 0.6,
       convertSize:5000,
       success(result) {
        setProgress(75)
         const formData = new FormData();
         formData.append('file', result, result.name);
         console.log(result)
         storage.ref(`profile/profilepic`).put(result)
         .then((res)=>{
          res.ref.getDownloadURL()
         .then(url=>{
            setProgress(100)
            setTimeout(()=>{
              setProfilepic(url)
              setIsprogress(false)
              setProgress(0)
            },1000)
            
          })
    })
       },
       error(err){
         console.log(err.message);
       }
       }
     )
  }
  return (
    <div className="my-account-container">
      <div className="container">
        <input type="file" className="file-upload" accept="image/png, image/jpeg, image/jpg"  ref={inputRef} onChange={(e)=>{uploadimage(e)}}/>
        <div className="account-wrapper">
          <div className="acc-prof-pic-wrapper">
            <div className="acc-prof-pic-div">
              <div
                className="acc-prof-pic"
                style={{ backgroundImage: `url("${profilepic}")` }}
                onClick={()=>inputRef.current.click()}
              >
                {isprogress&&<div className="progress-div">
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
                }
              </div>
              
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
          <button className="logout" onClick={()=>{logout()}}><i class="fas fa-power-off"></i>&nbsp;Logout</button>
        </div>
       
      </div>
    </div>
  );
};
export default connect()(MyAccount);
