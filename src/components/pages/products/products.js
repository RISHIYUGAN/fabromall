import React, { useState, useEffect } from "react";
import "./products.css";
import Select from "react-select";
import { connect } from "react-redux";
import { history } from "../../Router/router";
import AxiosInstance from "../../axios/axiosInstance";
import { suggestionset } from "../../Redux/action";
import { ProductSearch } from "../../utility/search/search";

const Products = (props) => {
  const [productslist, setProductslist] = useState([]);
  const [pages, setPages] = useState({
    prepage: 1,
    centpage: 2,
    postpage: 3,
  });
  const [suggest, setSuggest] = useState([
    "Bedsheet",
    "Bath Towel",
    "Quilt",
    "Window Curtain",
    "Apron",
  ]);
  const [searchfilter, setSearchFilter] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totpages, setTotPages] = useState(10);
  const [sorts, setSorts] = useState(["Price", "Rating"]);
  const [filters, setFilters] = useState([
    {
      placeholder: "Price",
      value: [
        {
          label: (
            <span>
              below&nbsp;&nbsp;
              <i
                class="fas fa-rupee-sign"
                style={{ marginRight: "3px", fontSize: "15px" }}
              ></i>
              250
            </span>
          ),
          value: "null-300",
        },
        {
          label: (
            <span>
              <i
                class="fas fa-rupee-sign"
                style={{ marginRight: "3px", fontSize: "15px" }}
              ></i>{" "}
              250 - 500
            </span>
          ),
          value: "250-500",
        },
        {
          label: (
            <span>
              <i
                class="fas fa-rupee-sign"
                style={{ marginRight: "3px", fontSize: "15px" }}
              ></i>{" "}
              500 - 1000
            </span>
          ),
          value: "500-1000",
        },
        {
          label: (
            <span>
              above&nbsp;&nbsp;
              <i
                class="fas fa-rupee-sign"
                style={{ marginRight: "3px", fontSize: "15px" }}
              ></i>{" "}
              1000
            </span>
          ),
          value: "1000-null",
        },
      ],
    },
    {
      placeholder: "Rating",
      value: [
        { value: "chocolate", label: "Chocolate" },
        { value: "strawberry", label: "Strawberry" },
        { value: "vanilla", label: "Vanilla" },
      ],
    },
    {
      placeholder: "Sold rate",
      value: [
        { value: "chocolates", label: "Chocolates" },
        { value: "strawberries", label: "Strawberries" },
        { value: "vanillas", label: "Vanillas" },
      ],
    },
  ]);
  const [suggestvalue, setSuggestvalue] = useState("");
  const [searchsuggest, setSearchSuggest] = useState([]);

  useEffect(() => {
    window.addEventListener("scroll", handlescroll);
    var request=history.location.state?history.location.state.product:[{categoryname: "Bedroom",
    categoryvalue: "Bedroom",
    typename: "Bedsheet",
    typevalue: "Bedsheet",
  }]
    AxiosInstance.post("/fetch_product",request).then(
      (res) => {
        console.log(res.data.current);
        setProductslist(res.data.current.products);
        setTotPages(res.data.totalpages);
        setCurrentPage(res.data.current.currentpage);
        setPages({
          prepage: res.data.totalpages >= 1 && 1,
          centpage: res.data.totalpages >= 2 && 2,
          postpage: res.data.totalpages >= 3 && 3,
        });
      }
    );
    console.log(history.location);
    return () => {
      window.removeEventListener("scroll", handlescroll);
    };
  }, []);

  useEffect(() => {
    setSearchSuggest(props.suggestions);
  }, [props.suggestions]);

  useEffect(() => {
    if(suggestvalue===""){
      setSearchFilter([])
      return 0;
    }
    var arr = searchsuggest.filter((sug) => {
      return sug.typename.toLowerCase().includes(suggestvalue.toLowerCase());
    });
    setSearchFilter(arr);
  }, [suggestvalue]);

  const handlescroll = () => {
    if (window.pageYOffset === 0) {
      document.getElementById("suggestion").style.boxShadow = "none";
    } else {
      document.getElementById("suggestion").style.boxShadow =
        "0 0 10px rgba(0, 0, 0, 0.5)";
    }
  };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      // borderBottom: "1px dotted pink",
      color: state.isSelected ? "white" : "#0C0C0C",
      padding: 20,
      fontFamily: "poppins-reg",
    }),
    value: (provided) => ({
      ...provided,
      fontFamily: "poppins-reg",
    }),
    placeholder: (provided) => ({
      ...provided,
      fontFamily: "poppins-reg",
      fontSize: "14px",
      color: "#6B6B6B",
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";
      const fontFamily = "poppins-500";
      const color = "#0C0C0C";
      return { ...provided, opacity, transition, fontFamily, color };
    },
  };

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
  const searchprd = (e) => {
    e.preventDefault();
    e.target.search.blur();
    if(searchfilter.length!==0){
      console.log("entering")
      AxiosInstance.post("/fetch_product",searchfilter).then((res) => {
        console.log(res.data);
        setProductslist(res.data.current.products);
        setTotPages(res.data.totalpages);
        setCurrentPage(res.data.current.currentpage);
        setPages({
          prepage: res.data.totalpages >= 1 && 1,
          centpage: res.data.totalpages >= 2 && 2,
          postpage: res.data.totalpages >= 3 && 3,
        });
      });
    }
  };
  const pageset = (number) => {
    if (number > 1 && number < totpages) {
      setPages({
        prepage: number - 1,
        centpage: number,
        postpage: number + 1,
      });
    }
    if (number >= 1 && number <= totpages) {
      setCurrentPage(number);
      setTimeout(() => {
        if (
          number === parseInt(document.getElementById("pg-highlight").innerHTML)
        ) {
          var skip = (number - 1) * 12;
          AxiosInstance.post("/pagination", {
            skip: skip,
            limit: 12,
          }).then((res) => {
            console.log(res.data.current.products);
            setProductslist(res.data.current.products);
            setCurrentPage(number);
            if (number > 1 && number < totpages) {
              setPages({
                prepage: number - 1,
                centpage: number,
                postpage: number + 1,
              });
            }
          });
        }
      }, 1000);
    }
  };

  return (
    <div className="products-container">
      <div id="suggestion" className="suggestions-div">
        <div className="container">
          <div className="suggestions-wrapper">
            <div className="suggestions">
              {suggest.map((sug) => (
                <div className="each-suggestion">
                  <div
                    className="suggest-image"
                    style={{
                      backgroundImage:
                        'url("https://firebasestorage.googleapis.com/v0/b/fabromal-gdn.appspot.com/o/quilt%2FCartoon%20Single%20Dohar%20%20(Microfiber%2C%20Blue%20Angry%20Birds%2C%20Blue%20Angry%20Birds)(240-220cm)-399.jpeg?alt=media&token=f29688a5-36d7-4398-9477-23fcb550613f")',
                    }}
                  ></div>
                  <div className="sug-name">{sug}</div>
                </div>
              ))}
            </div>
            <ProductSearch
            suggestvalue={suggestvalue}
            setSuggestvalue={(e)=> setSuggestvalue(e.target.value)}
            focus={() => {
              document.getElementById(
                "pseudo-placeholder"
              ).style.display = "none";
              if(searchfilter.length!==0)
              document.getElementById("show-sugs").style.display="block"
            }}
            blur={
              (e) => {
                setTimeout(()=>{
                  document.getElementById("show-sugs").style.display="none"
                },150)
                if (e.target.value === "")
                  document.getElementById(
                    "pseudo-placeholder"
                  ).style.display = "block";
              }
            }
            searchfilter={searchfilter}
            setSuggestvaluetype={(typename)=>{
              setSuggestvalue(typename)
            }}
            searchprd={(e) => {
              searchprd(e);
            }}
            />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="product-content">
          <div className="products-display-div">
            <div className="filter-sort">
              <div className="filter-div">
                <div className="filt-title">
                  <div>
                    <i class="fas fa-filter"></i>
                  </div>
                  <div className="filt-tit-text">Filter by</div>
                </div>
                <div className="filters">
                  {filters.map((option) => (
                    <div className="select-div">
                      <Select
                        options={option.value}
                        styles={customStyles}
                        placeholder={option.placeholder}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="sort-div" style={{ marginTop: "35px" }}>
                <div className="sort-title">
                  <div>
                    <i class="fas fa-sort-amount-down"></i>
                  </div>
                  <div className="sort-tit-text">Sort by</div>
                </div>
                <div className="sorts">
                  <form onChange={(e) => console.log(e.target.value)}>
                    {sorts.map((sort) => (
                      <div className="check-div">
                        <label for={sort}>
                          <input
                            type="radio"
                            id={sort}
                            name="sorting"
                            value={sort}
                          />
                          <div className="custom-radio">
                            <i class="fas fa-check"></i>
                          </div>
                          {sort}
                        </label>
                      </div>
                    ))}
                  </form>
                  <div className="sort-select">
                    <Select
                      options={[
                        { value: "Ascending", label: "Ascending" },
                        { value: "Descending", label: "Descending" },
                      ]}
                      styles={customStyles}
                      defaultValue={[
                        { value: "Ascending", label: "Ascending" },
                      ]}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="pds-list">
              {productslist.map((product) => (
                <div className="each-prdct">
                  <div className="prdct-img-div">
                    <img src={product.img} className="prd-img" />
                  </div>
                  <div className="prdct-des">
                    <div className="prdct-name">{product.name}</div>
                    <div className="rating-div">
                      <div className="rate">
                        {marked(product.rating).map((star) => star)}
                        <div className="rating-num">{product.rating}.0</div>
                      </div>
                      <div className="sold-rate">(350)</div>
                    </div>
                    <div className="price-div">
                      <div className="ogn-price">
                        <i class="fas fa-rupee-sign"></i> {product.price}.00
                        <div className="strike"></div>
                      </div>
                      <div className="offer">{product.offer}% off</div>
                      <div className="dscnt-offer">
                        <i class="fas fa-rupee-sign"></i>{" "}
                        {Math.round(product.price * (1 - product.offer / 100))}
                        .00
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="pagination">
            <div className="page-show">
              <div
                onClick={() => {
                  pageset(currentPage - 1);
                }}
                className="pre-next pre-page"
              >
                <i class="fas fa-angle-left"></i>&nbsp;&nbsp; Previous Page
              </div>
              <div className="e-page-wrap">
                <div className="page-info">
                  {currentPage} / {totpages}
                </div>
                <div
                  onClick={() => {
                    pageset(pages.prepage);
                  }}
                  className="e-page"
                  id={pages.prepage === currentPage && "pg-highlight"}
                >
                  {pages.prepage}
                </div>
                {totpages >= 2 && (
                  <div
                    onClick={() => {
                      pageset(pages.centpage);
                    }}
                    id={pages.centpage === currentPage && "pg-highlight"}
                    className="e-page"
                  >
                    {pages.centpage}
                  </div>
                )}
                {totpages >= 3 && (
                  <div
                    onClick={() => {
                      pageset(pages.postpage);
                    }}
                    className="e-page"
                    id={pages.postpage === currentPage && "pg-highlight"}
                  >
                    {pages.postpage}
                  </div>
                )}
              </div>
              <div
                onClick={() => {
                  pageset(currentPage + 1);
                }}
                className="pre-next post-page"
              >
                Next Page&nbsp;&nbsp;<i class="fas fa-angle-right"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  suggestions: state.Suggestions,
});
export default connect(mapStateToProps)(Products);
