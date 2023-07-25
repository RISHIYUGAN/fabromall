import React, { useState, useEffect } from "react";
import "./products.css";
import Select from "react-select";
import { connect } from "react-redux";
import { history } from "../../Router/router";
import AxiosInstance from "../../axios/axiosInstance";
import { suggestionset } from "../../Redux/action";
import { ProductSearch } from "../../utility/search/search";
import { ProductsDisplay } from "./productsdisplay";
import { Route } from "react-router-dom"

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
    "Window Curtain"
  ]);
  const [searchfilter, setSearchFilter] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totpages, setTotPages] = useState(0);
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
          value: "0-250",
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
          value: "1000-",
        },
      ],
    },
    {
      placeholder: "Rating",
      value: [
        { value: "1", label: "above 1" },
        { value: "2", label: "above 2" },
        { value: "3", label: "above 3" },
        { value: "4", label: "above 4" },
      ],
    },
    {
      placeholder: "Sold rate",
      value: [
        { value: "chocolates", label: "Chocolates" },
        { value: "strawberries", label: "Strawberriessssssssssssssssssss" },
        { value: "vanillas", label: "Vanillas" },
      ],
    },
  ]);
  const [filterState, setFilterState] = useState({});
  const [filtervalues, setFiltervalues] = useState({});
  const [sortvalue, setSortvalue] = useState([
    { value: "Ascending", label: "Ascending" },
  ]);
  const [sortCheck, setSortCheck] = useState({
    type: "",
    sorttype: "Ascending",
  });
  const [suggestvalue, setSuggestvalue] = useState("");
  const [searchsuggest, setSearchSuggest] = useState([]);
  const [sorttype, setSorttype] = useState();
  const [filtervaluecopy, setFiltervaluecopy] = useState({});
  const [filtering, setfiltering] = useState(false);
  const [disableSort, setDisableSort] = useState(true);
  const [pageLoad, setPageLoad] = useState(true);

  useEffect(() => {

    console.log(history)
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handlescroll);
    console.log(localStorage.getItem("currentpage"))
    if (localStorage.getItem("currentpage") == "1") {
      const local = localStorage.getItem("prdcts");
      var request = local
        ? JSON.parse(local)
        : [
          {
            categoryname: "Bedroom",
            categoryvalue: "Bedroom",
            typename: "Bedsheet",
            typevalue: "Bedsheet",
          },
        ];
      setPageLoad(true);
      AxiosInstance.post("/fetch_product", request)
        .then((res) => {
          console.log(res.data);
          setProductslist(res.data.current.products);
          setTotPages(res.data.totalpages);
          setCurrentPage(res.data.current.currentpage);
          setPages({
            prepage: res.data.totalpages >= 1 && 1,
            centpage: res.data.totalpages >= 2 && 2,
            postpage: res.data.totalpages >= 3 && 3,
          });
          setPageLoad(false);
        })
        .catch(() => {
          setPageLoad(false);
        });
    }
    else {
      var skip = (parseInt(localStorage.getItem("currentpage")) - 1) * 12
      AxiosInstance.post("/pagination", {
        skip: skip,
        limit: 12,
      })
        .then((res) => {
          console.log(res.data);
          var json = JSON.stringify(res.data.current.currentpage)
          localStorage.setItem("currentpage", json)
          setProductslist(res.data.current.products);
          setCurrentPage(res.data.current.currentpage);
          setTotPages(res.data.totalpages)
          if (res.data.current.currentpage > 1 && res.data.current.currentpage < res.data.totalpages) {
            // console.log("entering",parseInt(localStorage.getItem("currentpage")) - 1,parseInt(localStorage.getItem("currentpage")),parseInt(localStorage.getItem("currentpage")) + 1)
            setPages({
              prepage: res.data.current.currentpage - 1,
              centpage: res.data.current.currentpage,
              postpage: res.data.current.currentpage + 1,
            });
          }
          else if (res.data.current.currentpage == res.data.totalpages) {
            setPages({
              prepage: res.data.current.currentpage - 2,
              centpage: res.data.current.currentpage - 1,
              postpage: res.data.current.currentpage,
            });
          }
          setPageLoad(false);
        })
        .catch(() => {
          setPageLoad(false);
        });
    }
    return () => {
      window.removeEventListener("scroll", handlescroll);
    };
  }, []);

  useEffect(() => {
    setSearchSuggest(props.suggestions);
  }, [props.suggestions]);

  useEffect(() => {
    if (suggestvalue === "") {
      setSearchFilter([]);
      return 0;
    }
    var arr = searchsuggest.filter((sug) => {
      return sug.typename.toLowerCase().includes(suggestvalue.toLowerCase());
    });
    setSearchFilter(arr);
  }, [suggestvalue]);

  const handlescroll = () => {
    if (document.getElementById("suggestion")) {
      if (window.pageYOffset === 0) {
        document.getElementById("suggestion").style.boxShadow = "none";
      } else {
        document.getElementById("suggestion").style.boxShadow =
          "0 0 10px rgba(0, 0, 0, 0.5)";
      }
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
    setPageLoad(true);
    e.target.search.blur();
    if (searchfilter.length !== 0) {
      console.log("entering");
      AxiosInstance.post("/fetch_product", searchfilter)
        .then((res) => {
          const pagejson = JSON.stringify(res.data.current.currentpage)
          localStorage.setItem("currentpage", pagejson)
          console.log(res.data);
          setFilterState({});
          setFiltervalues({});
          var json = JSON.stringify(searchfilter);
          localStorage.setItem("prdcts", json);
          setProductslist(res.data.current.products);
          setTotPages(res.data.totalpages);
          setCurrentPage(res.data.current.currentpage);
          setPages({
            prepage: res.data.totalpages >= 1 && 1,
            centpage: res.data.totalpages >= 2 && 2,
            postpage: res.data.totalpages >= 3 && 3,
          });
          setPageLoad(false);
        })
        .catch(() => {
          setPageLoad(false);
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
      setTimeout(() => {
        setPageLoad(true);
      }, 500);

      window.scroll({
        top: 0,
        behavior: "smooth",
      });
      setCurrentPage(number);
      setTimeout(() => {
        if (
          number === parseInt(document.getElementById("pg-highlight").innerHTML)
        ) {
          var skip = (number - 1) * 12;
          // console.log("pagesetif3");
          AxiosInstance.post("/pagination", {
            skip: skip,
            limit: 12,
          })
            .then((res) => {
              const json = JSON.stringify(number)
              localStorage.setItem("currentpage", json)
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
              setPageLoad(false);
            })
            .catch(() => {
              setPageLoad(false);
            });
        }
      }, 1000);
    }
  };
  const filtersort = (e) => {
    e.preventDefault();
    var check2 = true;
    var type = e.target.sorting.value;
    var sorttype = type !== "" ? e.target.sorttype.value : null;
    // console.log(Object.keys(filtervaluecopy).length,Object.keys(filtervalues).length)
    if (
      Object.keys(filtervaluecopy).length !== 0 &&
      Object.keys(filtervalues).length === 0
    ) {
      check2 = false;
    } else {
      Object.keys(filtervalues).forEach((element, index) => {
        var check = filtervalues[element] === filtervaluecopy[element];
        check2 = check2 && check;
      });
    }
    // console.log(
    //  check2,
    //  sorttype,sortCheck.sorttype,
    //  sortCheck.type,type,
    //  "...",!!check2===true,!!sortCheck.type==type,!!type!==""?(sortCheck.sorttype===sorttype):true,
    //   "pump",!(check2===true&&!!(sortCheck.type===type)&&!!(type!==""?(sortCheck.sorttype===sorttype):true))
    //   )
    if (
      !(
        check2 === true &&
        !!(sortCheck.type === type) &&
        !!(type !== "" ? sortCheck.sorttype === sorttype : true)
      )
    ) {
      // console.log(check2);
      // console.log("entering filter");
      setPageLoad(true);
      AxiosInstance.post("/filter-sort", {
        filter: !check2,
        ...filtervalues,
        type: type !== "" ? type.toLowerCase() : null,
        sorttype: type !== "" ? sorttype.toLowerCase() : null,
      })
        .then((res) => {
          console.log(res.data);
          setProductslist(res.data.current.products);
          setTotPages(res.data.totalpages);
          setCurrentPage(res.data.current.currentpage);
          setPages({
            prepage: res.data.totalpages >= 1 && 1,
            centpage: res.data.totalpages >= 2 && 2,
            postpage: res.data.totalpages >= 3 && 3,
          });
          setFiltervaluecopy(filtervalues);
          setSortCheck({
            type: type,
            sorttype: sorttype,
          });
          setPageLoad(false);
        })
        .catch(() => {
          setPageLoad(false);
        });
    }
  };

  const eachproduct = (prd) => {
    var json = JSON.stringify({ category: prd.category, type: prd.type, model_number: prd.model_number })
    localStorage.setItem('eachproduct', json)
    window.scrollTo(0, 0)
    history.push("/eachproduct")
  }
  return (
    <div className="products-container">
      {console.log("filtervalues---", filtervalues)}
      <div className="container">
        <div id="suggestion" className="suggestions-div">
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
              setSuggestvalue={(e) => setSuggestvalue(e.target.value)}
              focus={() => {
                document.getElementById("pseudo-placeholder").style.display =
                  "none";
                if (searchfilter.length !== 0)
                  document.getElementById("show-sugs").style.display = "block";
              }}
              blur={(e) => {
                setTimeout(() => {
                  document.getElementById("show-sugs").style.display = "none";
                }, 150);
                if (e.target.value === "")
                  document.getElementById("pseudo-placeholder").style.display =
                    "block";
              }}
              searchfilter={searchfilter}
              setSuggestvaluetype={(typename) => {
                setSuggestvalue(typename);
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
              <form
                onSubmit={(e) => {
                  filtersort(e);
                }}
              >
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
                          value={
                            filterState[
                              `${option.placeholder
                                .split(" ")[0]
                                .toLowerCase()}`
                            ]
                              ? filterState[
                              `${option.placeholder
                                .split(" ")[0]
                                .toLowerCase()}`
                              ]
                              : null
                          }
                          options={option.value}
                          styles={customStyles}
                          placeholder={option.placeholder}
                          onChange={(e) => {
                            console.log("running");
                            setFiltervalues({
                              ...filtervalues,
                              [`${option.placeholder
                                .split(" ")[0]
                                .toLowerCase()}`]: e ? e.value : null,
                            });
                            setFilterState({
                              ...filterState,
                              [`${option.placeholder
                                .split(" ")[0]
                                .toLowerCase()}`]: e ? e : null,
                            });
                          }}
                          isClearable={true}
                        />
                      </div>
                    ))}
                    {/* {console.log("filt-val", filtervalues)} */}
                  </div>
                  <div className="sort-btn-div">
                    <button
                      onClick={() => {
                        setFilterState({});
                        setFiltervalues({});
                      }}
                      className="reset-filt-div"
                    >
                      Reset filter
                    </button>
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
                    {sorts.map((sort) => (
                      <div className="check-div">
                        <label for={sort}>
                          <input
                            type="radio"
                            id={sort}
                            name="sorting"
                            value={sort}
                            onChange={(e) => {
                              if (disableSort === true) {
                                setDisableSort(false);
                              }
                            }}
                          />
                          <div className="custom-radio">
                            <i class="fas fa-check"></i>
                          </div>
                          {sort}
                        </label>
                      </div>
                    ))}
                    <div className="sort-select">
                      <Select
                        options={[
                          { value: "Ascending", label: "Ascending" },
                          { value: "Descending", label: "Descending" },
                        ]}
                        styles={customStyles}
                        value={sortvalue}
                        name="sorttype"
                        onChange={(e) => setSortvalue(e)}
                        isDisabled={disableSort}
                      />
                    </div>
                  </div>
                  <div className="sort-btn-div">
                    <button
                      onClick={() => {
                        document.getElementsByName("sorting").forEach((el) => {
                          el.checked = false;
                        });
                        setDisableSort(true);
                        setSortvalue([
                          { value: "Ascending", label: "Ascending" },
                        ]);
                      }}
                      className="reset-filt-div"
                    >
                      Reset Sort
                    </button>
                  </div>
                </div>
                <div className="apply-btn-div">
                  <button className="filter-btn">Apply</button>
                </div>
              </form>
            </div>
            {pageLoad ? (
              <div className="page-loading">
                <i class="fas fa-circle-notch fa-spin"></i>
              </div>
            ) : (
              <ProductsDisplay eachproduct={(product) => eachproduct(product)} productslist={productslist} marked={(rating) => marked(rating)} />
            )}
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
                id="check"
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
