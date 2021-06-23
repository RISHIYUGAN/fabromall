import React,{useState} from "react"
import "./footer.css"

export const Footer=()=>{
    const [footer,setFooter]=useState({
        "Account":[{link:"My Account",icon:"",href:""},{link:"My Cart",icon:"",href:""},{link:"My Wishlist",icon:"",href:""},{link:"Order History",icon:"",href:""}],
        "Help Center":[{link:"Product issues",icon:"",href:""},{link:"Report",icon:"",href:""},{link:"Feedback",icon:"",href:""}],
        "Follow Us":[{link:"Instagram",icon:"fab fa-instagram",href:""},{link:"Facebook",icon:"fab fa-facebook-f",href:""}],
        "Contact Us":[{link:"Make a call",icon:"fas fa-phone",href:""},{link:"Mail Us",icon:"fas fa-envelope",href:""},{link:"Whatsapp",icon:"fab fa-whatsapp",href:""}]
    })
    // {console.log(footer["Help Center"])}
    return(
        <div className="footer-container">
          <div className="container">
            <div className="footer-content">
                <div className="footer-wrapper">
                    {Object.keys(footer).map((cnt,index)=>(
                        <div className="each-foot">
                          <div className="footer-title-div">
                            <h3 className="footer-title">{cnt}</h3>
                            <div className="each-ft-cnt-div">
                            {Object.values(footer)[index].map((cnt)=>(
                              <a href={cnt.href?cnt.href:null}  className="each-link">{cnt.icon&&<i class={cnt.icon}/>} {cnt.link}</a>
                            ))}
                            </div>
                          </div>
                        </div>
                    ))}
                </div>
                <div className="footer-line"></div>
                <div className="privacy">
                  <div>Terms & Conditions</div>
                  <div>Privacy Policy</div>
                </div>
            </div>
          </div>
        </div>
    )
}