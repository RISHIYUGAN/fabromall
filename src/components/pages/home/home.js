import React, { useState, useEffect } from "react";
import PreviousNextMethods from "../../customslicker/customslicker";
import "./home.css";
import AxiosInstance from "../../axios/axiosInstance";
import { connect } from "react-redux";
import { suggestionset } from "../../Redux/action";
import { history } from "../../Router/router";
import { NavLink } from "react-router-dom";

const Home = (props) => {
  const [types, setTypes] = useState({});

  const [suggest, setSuggest] = useState([]);

  useEffect(() => {
    AxiosInstance.get("/fetch_home_products").then((res) => {
      console.log(res.data);
      setTypes(res.data);
    });
  }, []);

  useEffect(() => {
    setSuggest(props.suggestions);
  }, [props.suggestions]);

  return (
    <div className="home-container">
      <div className="container">
        <div>
          <PreviousNextMethods />
        </div>
        <div className="home-content">
          <div className="each-type">
            {Object.keys(types).map((type, index) => (
              <div>
                {index === 3 && (
                  <div className="gallery">
                    <div className="gal-cont-rel">
                      <div className="gal-cont">
                        <div className="content">
                          The word 'fabric' also derives from Latin, with roots
                          in the Proto-Indo-European language. Stemming most
                          recently from the Middle French fabrique, or
                          'building, thing made', and earlier from the Latin
                          fabrica ('workshop; an art, trade; skilful production,
                          structure, fabric'), the noun fabrica stems from the
                          Latin faber, or 'artisan who works in hard materials',
                          which itself is derived from the Proto-Indo-European
                          dhabh- , meaning 'to fit together.Textiles are made
                          from many materials, with four main sources: animal
                          (wool, silk), plant (cotton, flax, jute, bamboo),
                          mineral (asbestos, glass fibre), and synthetic (nylon,
                          polyester, acrylic, rayon).
                        </div>
                      </div>
                    </div>
                    <div className="grid-div-rel">
                      <div className="grid-div">
                        <div className="grid-wrapper">
                          <div className="box-1"></div>
                          <div className="box-2"></div>
                          <div className="box-3"></div>
                          <div className="box-4"></div>
                          <div className="box-5"></div>
                          <div className="box-6"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div className="type-container">
                  <div className="type-title-div">
                    <div className="type-title">
                      {type[0].toUpperCase() + type.slice(1)} fabrics
                    </div>
                    <div className="line"></div>
                  </div>
                  <div
                    className="home-show"
                    onMouseOver={() => {
                      document.getElementById(
                        "homeshow-" + index
                      ).style.display = "flex";
                    }}
                    onMouseLeave={() => {
                      document.getElementById(
                        "homeshow-" + index
                      ).style.display = "none";
                    }}
                  >
                    {Object.values(types)[index].map((cat, ind) => (
                      <div className="each-product">
                        {ind === 5 && (
                          <div
                            id={"homeshow-" + index}
                            className="hover-div"
                            onClick={() => {
                              new Promise((resolve) => {
                                var filt = [];
                                suggest.filter((sug) => {
                                  if (
                                    sug.typename
                                      .toLowerCase()
                                      .includes(type.toLowerCase())
                                  ) {
                                    filt = [...filt, sug];
                                    resolve(filt);
                                  }
                                  return sug.typename
                                    .toLowerCase()
                                    .includes(type.toLowerCase());
                                });
                              }).then((res) => {
                                var json = JSON.stringify(res);
                                localStorage.setItem("prdcts", json);
                                history.push("/products");
                              });
                            }}
                          >
                            <div>See More</div>
                            <i class="fas fa-arrow-circle-right"></i>
                          </div>
                        )}
                        <div className="h-prd-img">
                          <img src={cat.img} />
                        </div>
                        <div className="h-prd-des">
                          <div>{cat.name}</div>
                          <div className="h-price">
                            <i class="fas fa-rupee-sign"></i>&nbsp;{cat.price}
                            .00
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  suggestions: state.Suggestions,
});
export default connect(mapStateToProps)(Home);
