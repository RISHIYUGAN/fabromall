import React, { useState, useEffect } from "react";
import "./mywishlist.css";
import AxiosInstance from "../../axios/axiosInstance";
import { MoreIcon } from "../../utility/moreicon/moreicon";
import { connect } from "react-redux";
import { wishlistset } from "../../Redux/action";
import { Loader } from "../../utility/loader/loader";
import Wishlistpop from "../mywishlist/wishlistpopup";

const WishList = (props) => {
  const [eachwish, setEachWish] = useState({});
  const [addnew, setAddnew] = useState(false);
  const [addload, setAddload] = useState(false);
  const [editing, setEditing] = useState(false);
  const [pageloading, setPageLoading] = useState(true);
  const [id, setId] = useState();
  const [wishpop, setWishPop] = useState(false);
  const [addwish, setAddwish] = useState(false);
  const [adding, setAdding] = useState(false);
  const [popaddload, setPopAddload] = useState(false);
  const [oldname, setOldname] = useState({});
  const [editname, setEditname] = useState({});
  const [changing, setChanging] = useState(false);
  const [changeload, setChangeload] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);
  const [updateopen,setUpdateopen] = useState(false)

  const onScroll = (e) => {
    setScrollTop(e.target.documentElement.scrollTop);
    setScrolling(e.target.documentElement.scrollTop > scrollTop);
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (document.getElementById("has" + id)) {
      console.log(scrollTop + window.innerHeight, document.body.offsetHeight);
      if (
        document.getElementById("has" + id).offsetTop - 20 == scrollTop ||
        scrollTop + window.innerHeight == document.body.offsetHeight
      ) {
        document.getElementById("has" + id).style.transition = "transform 0.5s";
        document.getElementById("has" + id).style.transform =
          "perspective(1px) translateZ(0px) scale(1.02,1.02)";
        setTimeout(() => {
          document.getElementById("has" + id).style.transform =
            "perspective(1px) translateZ(0px) scale(1.0,1.0)";
          setTimeout(() => {
            document.getElementById("has" + id).style.transition = "none";
          }, 500);
        }, 2000);
      }
    }
  }, [scrollTop]);

  useEffect(() => {
    setPageLoading(true);
    AxiosInstance.post("/view-wishlist").then((res) => {
      console.log(res.data);
      setEachWish(res.data);
      // setPageLoading(false);
    });
  }, []);

  const addwishlist = (e) => {
    e.preventDefault();
    setAddload(true);
    setEditing(true);
    var name = e.target.wishlistname.value;
    setId(name);
    console.log(name);
    var present = false;
    props.wishlist.forEach((element) => {
      if (element == name) {
        present = true;
        setAddload(false);
        setEditing(false);
        window.scrollTo(
          0,
          document.getElementById("has" + name).offsetTop - 20
        );
      }
    });
    console.log(present);
    if (present == false) {
      AxiosInstance.post("/create-wishlist", {
        name: name,
        product: [],
      })
        .then((res) => {
          console.log(res.data);
          setAddload(false);
          setAddnew(false);
          setEachWish(res.data.wishlists);
          props.wishlistset(res.data.wishlistnames);
        })
        .catch(() => {
          setAddload(false);
        });
    }
  };
  const deleteproduct = (name, model, loader) => {
    console.log(name, model);
    if (editing == false) {
      setEditing(true);
      document.getElementById(loader).style.display = "flex";
      AxiosInstance.post("/delete-wishproduct", {
        name: name,
        model_number: model,
      })
        .then((res) => {
          console.log(res.data);
          if (document.getElementById(loader))
            document.getElementById(loader).style.display = "none";
          setEachWish(res.data);
          setEditing(false);
        })
        .catch(() => {
          document.getElementById(loader).style.display = "none";
          setEditing(false);
        });
    }
  };
  const deletewishlist = (name) => {
    if (editing == false) {
      setEditing(true);
      document.getElementById(name).style.display = "flex";
      AxiosInstance.post("/delete-wishlist", {
        name: name,
      })
        .then((res) => {
          console.log(res.data);
          if (document.getElementById(name))
          document.getElementById(name).style.display = "none";
          setEachWish(res.data.wishlists);
          props.wishlistset(res.data.wishlistnames);
          setEditing(false);
        })
        .catch(() => {
          if (document.getElementById(name))
            document.getElementById(name).style.display = "none";
          setEditing(false);
        });
    }
  };
  const addtowish = (e) => {
    e.preventDefault();
    if (adding == false) {
      setAdding(true);
      setAddload(true);
      document.getElementById(oldname.id).style.display = "flex";
      const name = e.target.childNodes[1].textContent;
      console.log(name, oldname);
      setWishPop(false);
      AxiosInstance.post("/replace-wishlist", {
        fromwishlistname: oldname.name,
        towishlistname: name,
        model_number: oldname.model_number,
      })
        .then((res) => {
          console.log(res.data);
          if (document.getElementById(oldname.id))
            document.getElementById(oldname.id).style.display = "none";
          setEachWish(res.data);
          setAddload(false);
          setAdding(false);
        })
        .catch(() => {
          if (document.getElementById(oldname.id))
            document.getElementById(oldname.id).style.display = "none";
          setAddload(false);
          setAdding(false);
        });
    }
  };
  const renamewishlist = (name) => {
    document.getElementById("edit" + name).style.display = "flex";
    document.getElementById("input" + name).focus();
    // console.log(document.getElementById("edit" + name + "div"))
  };
  const changename = (e) => {
    e.preventDefault();
    if (changing === false) {
      setChanging(true);
      setChangeload(true);
      console.log(editname, e.target.newname.value);
      AxiosInstance.post("/rename-wishlist", {
        oldwishlistname: editname.oldname,
        newwishlistname: e.target.newname.value,
      })
        .then((res) => {
          document.getElementById(editname.id).style.display = "none";
          setEachWish(res.data.wishlists);
          setChanging(false);
          setChangeload(false);
          setUpdateopen(false)
          props.wishlistset(res.data.wishlistnames);
        })
        .catch(() => {
          setChanging(false);
          setChangeload(false);
        });
    }
  };
  return (
    <div className="mywishlist-container">
      <Wishlistpop
        popbtn={false}
        wishpop={wishpop}
        cancelpop={() => {
          setWishPop(false);
          setAddwish(false);
        }}
        addwish={addwish}
        setAddwish={() => setAddwish(true)}
        addtowish={(e) => addtowish(e)}
        adding={adding}
        setAdding={(bool) => setAdding(bool)}
        addload={popaddload}
        setAddload={(bool) => setPopAddload(bool)}
      />
      <div className="container">
        <div className="wishlist-title-div">
          <div className="wishlist-title">
            My <text style={{ color: "#366EFF" }}>WishList</text>
          </div>
          {addnew ? (
            <div className="add-wishlist">
              <form
                onSubmit={(e) => {
                  addwishlist(e);
                }}
              >
                <input
                  className="add-wish-input"
                  type="text"
                  placeholder="Enter name"
                  name="wishlistname"
                />
                <button className="add-wish-input">
                  {addload ? (
                    <i class="fas fa-circle-notch fa-spin"></i>
                  ) : (
                    "+ Add"
                  )}
                </button>
              </form>
            </div>
          ) : (
            <button
              className="add-wish-button"
              onClick={() => {
                setAddnew(true);
              }}
            >
              + Add new wishlist
            </button>
          )}
        </div>
        <div className="each-wishlist-div">
          {pageloading ? (
            <Loader color="#393cff"/>
          ) : Object.keys(eachwish).length !== 0 ? (
            Object.keys(eachwish).map((wish) => (
              <div className="each-wishlist" id={"has" + wish + "div"}>
                <div className="wishlist-name" id={"edit" + wish + "div"}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <i class="fas fa-heart" />
                    &nbsp;&nbsp;{wish}&nbsp;&nbsp;&nbsp;
                    <i
                      class="fas fa-circle-notch fa-spin"
                      style={{
                        color: "white",
                        fontSize: "15px",
                        display: "none",
                      }}
                      id={wish}
                    ></i>
                  </div>

                  <div className="edit-name-div">
                    <form
                      onSubmit={(e) => {
                        changename(e);
                      }}
                    >
                      <div className="edit-name-input" id={"edit" + wish}>
                        <input
                          type="text"
                          placeholder="Enter Name"
                          id={"input" + wish}
                          name="newname"
                        />
                        <button>
                          {changeload ? <Loader color="white" /> : "Update"}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            document.getElementById(
                              "edit" + wish
                            ).style.display = "none";
                            setUpdateopen(false)
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                    <MoreIcon
                      option1="Delete Wishlist"
                      action1={() => deletewishlist(wish)}
                      option2="Rename Wishlist"
                      action2={() => {
                        if(updateopen==false){
                          setUpdateopen(true)
                          document.getElementById(
                            wish + "wishlist"
                          ).style.display = "none";
                          setEditname({ oldname: wish, id: "edit" + wish });
                          renamewishlist(wish);
                        } 
                      }}
                      color="white"
                      backgroundColor="transparent"
                      boxshadow="none"
                      position="relative"
                      top="0px"
                      right="0px"
                      textcolor="black"
                      fontsize="16px"
                      fontfamily="poppins-500"
                      drpdwn={wish + "wishlist"}
                    />
                  </div>
                </div>
                <div className="wishlist-products">
                  {eachwish[wish].map((prd, index) => (
                    <div className="wish-each-product">
                      <div className="del-loader" id={wish + "-" + index}>
                        <i class="fas fa-circle-notch fa-spin"></i>
                      </div>
                      <div className="wish-prd-img-div">
                        <img src={prd.img} />
                      </div>
                      <div>{prd.name}</div>
                      <MoreIcon
                        option1="Delete product"
                        action1={() =>
                          deleteproduct(
                            wish,
                            prd.model_number,
                            wish + "-" + index
                          )
                        }
                        option2="Move Product"
                        action2={() => {
                          setOldname({
                            name: wish,
                            product: prd.model_number,
                            id: wish + "-" + index,
                          });
                          setWishPop(true);
                        }}
                        fontfamily="poppins-500"
                        drpdwn={wish + "wishprdct"}
                      />
                    </div>
                  ))}
                  <div className="wish-add-prd">
                    <h3>+</h3>
                    <h5>Add Products</h5>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="wish-empty">
              You <text style={{ color: "red" }}>haven't</text> added anything
              to your wishlist
              <h4>
                <i class="fas fa-shopping-cart" />
                Shop Now
              </h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  wishlist: state.Wishlist,
});
const mapDispatchToProps = (dispatch) => ({
  wishlistset: (value) => dispatch(wishlistset(value)),
});
export default connect(mapStateToProps, mapDispatchToProps)(WishList);
