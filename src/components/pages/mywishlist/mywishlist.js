import React,{useState} from "react";
import "./mywishlist.css";

const WishList = () => {
    const [eachwish,setEachWish]=useState([
        {
            wishlistname:"My Fav",
            products:[
                {
                    img: "https://firebasestorage.googleapis.com/v0/b/fabromal-gdn.appspot.com/o/bedsheet%2F104%20TC%20Cotton%20Double%20Floral%20Bedsheet(235-220cm)-399.jpeg?alt=media&token=5fe94faa-e093-4fdc-ae5e-bf28a6398025",
                    name: "104 TC Cotton Double Floral Bedsheet",
                },
                {
                    img: "https://firebasestorage.googleapis.com/v0/b/fabromal-gdn.appspot.com/o/quilt%2FCartoon%20Single%20Dohar%20%20(Microfiber%2C%20Blue%20Angry%20Birds%2C%20Blue%20Angry%20Birds)(240-220cm)-399.jpeg?alt=media&token=f29688a5-36d7-4398-9477-23fcb550613f",
                    name: "104 TC Cotton Double Floral Bedsheet ",
                },
                {
                    img: "https://firebasestorage.googleapis.com/v0/b/fabromal-gdn.appspot.com/o/pillow_cover%2F3D%20Printed%20Pillows%20Cover%20%20(Pack%20of%204%2C%2064%20cm-40%20cm%2C%20Red)-220.jpeg?alt=media&token=acddce19-ef5c-4b40-be4e-a72ba7c51db3",
                    name: "104 TC Cotton Double Floral Bedsheet",
                }, {
                    img: "https://firebasestorage.googleapis.com/v0/b/fabromal-gdn.appspot.com/o/comforter_set%2FCartoon%20Single%20Comforter%20%20(Cotton%2C%20Multicolor)-(252-242)-499.jpeg?alt=media&token=492b051e-a2fb-41c9-8f3a-50c26e847e98",
                    name: "104 TC Cotton Double Floral Bedsheet",
                },
                {
                    img: "https://firebasestorage.googleapis.com/v0/b/fabromall.appspot.com/o/sofa_cover%2F2%20Pieces%20Multi%20Sofa%20Slip%20Cover%20for%20Living%20Room%20-%203%20Seater%20Sofa%20Covers(70-29inches)-300.jpg?alt=media&token=88547d3a-d7f0-41b0-97f1-249f6caaed35",
                    name: "104 TC Cotton Double Floral Bedsheet",
                },
                {
                    img: "https://firebasestorage.googleapis.com/v0/b/fabromal-gdn.appspot.com/o/quilt%2FCartoon%20Single%20Dohar%20%20(Microfiber%2C%20Blue%20Angry%20Birds%2C%20Blue%20Angry%20Birds)(240-220cm)-399.jpeg?alt=media&token=f29688a5-36d7-4398-9477-23fcb550613f",
                    name: "104 TC Cotton Double Floral Bedsheet",
                }, 
                {
                    img: "https://firebasestorage.googleapis.com/v0/b/fabromal-gdn.appspot.com/o/quilt%2FCartoon%20Single%20Dohar%20%20(Microfiber%2C%20Blue%20Angry%20Birds%2C%20Blue%20Angry%20Birds)(240-220cm)-399.jpeg?alt=media&token=f29688a5-36d7-4398-9477-23fcb550613f",
                    name: "104 TC Cotton Double Floral Bedsheet",
                },
                {
                    img: "https://firebasestorage.googleapis.com/v0/b/fabromal-gdn.appspot.com/o/quilt%2FCartoon%20Single%20Dohar%20%20(Microfiber%2C%20Blue%20Angry%20Birds%2C%20Blue%20Angry%20Birds)(240-220cm)-399.jpeg?alt=media&token=f29688a5-36d7-4398-9477-23fcb550613f",
                    name: "104 TC Cotton Double Floral Bedsheet",
                },
                {
                    img: "https://firebasestorage.googleapis.com/v0/b/fabromal-gdn.appspot.com/o/quilt%2FCartoon%20Single%20Dohar%20%20(Microfiber%2C%20Blue%20Angry%20Birds%2C%20Blue%20Angry%20Birds)(240-220cm)-399.jpeg?alt=media&token=f29688a5-36d7-4398-9477-23fcb550613f",
                    name: "104 TC Cotton Double Floral Bedsheet",
                }
            ]
        },
        {
            wishlistname:"My Fav",
            products:[
                {
                    img: "https://firebasestorage.googleapis.com/v0/b/fabromal-gdn.appspot.com/o/quilt%2FCartoon%20Single%20Dohar%20%20(Microfiber%2C%20Blue%20Angry%20Birds%2C%20Blue%20Angry%20Birds)(240-220cm)-399.jpeg?alt=media&token=f29688a5-36d7-4398-9477-23fcb550613f",
                    name: "104 TC Cotton Double Floral Bedsheet",
                }
            ]
        },
        {
            wishlistname:"My Fav",
            products:[
                {
                    img: "https://firebasestorage.googleapis.com/v0/b/fabromal-gdn.appspot.com/o/quilt%2FCartoon%20Single%20Dohar%20%20(Microfiber%2C%20Blue%20Angry%20Birds%2C%20Blue%20Angry%20Birds)(240-220cm)-399.jpeg?alt=media&token=f29688a5-36d7-4398-9477-23fcb550613f",
                    name: "104 TC Cotton Double Floral Bedsheet",
                }
            ]
        }
    ])
  return (
    <div className="mywihslist-container">
      <div className="container">
        <div className="wishlist-title-div">
          <div className="wishlist-title">
            My <text style={{ color: "#366EFF" }}>WishList</text>
          </div>
          <button className="add-wish-button">+ Add new wishlist</button>
        </div>
        <div className="each-wishlist-div">
           {
               eachwish.map((wish)=>(
                 <div className="each-wishlist">
                     <div className="wishlist-name">
                     <i class="fas fa-heart"/>&nbsp;&nbsp;{wish.wishlistname}
                     </div>
                     <div className="wishlist-products">
                         {wish.products.map((prd)=>(
                             <div className="wish-each-product">
                               <div className="wish-prd-img-div">
                                   <img src={prd.img}/>
                               </div>
                               <div>
                                   {prd.name}
                               </div>
                               <div className="more-icon-div">
                               {/* <i class="fas fa-ellipsis-v"></i> */}
                               <div></div>
                               <div></div>
                               <div></div>
                               </div>
                             </div>
                         ))}
                     </div>
                 </div>
               ))
           }
        </div>
      </div>
    </div>
  );
};
export default WishList;
