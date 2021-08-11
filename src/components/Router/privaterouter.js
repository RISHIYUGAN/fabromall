import React,{useEffect} from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { suggestionset, wishlistset } from "../Redux/action";
import AxiosInstance from "../axios/axiosInstance";

const PrivateRouter = ({
  isAuthenticated,
  component: Component,
  footer,
  suggestions,
  wishlistnames,
  ...rest
}) => {
    useEffect(() => {
      AxiosInstance.post("/suggestions").then((res) => {
        console.log(res.data);
        suggestions(res.data.suggestions);
        wishlistnames(res.data.wishlistnames);
      });
    }, []);

  return (
    <div>
      <Header />
      <Route
        {...rest}
        render ={(props) =>
          isAuthenticated ? (
            <div>
              <Component {...props} />
            </div>
          ) : (
            <div>
              <Redirect to="/" />
            </div>
          )
        }
      />
      {footer === true && <Footer />}
    </div>
  );
};

const mapStateToprops = (state) => ({
  isAuthenticated: state.Auth,
});

const mapDispatchToProps = (dispatch) => ({
  suggestions: (value)=>dispatch(suggestionset(value)),
  wishlistnames: (value)=>dispatch(wishlistset(value))
});
export default connect(mapStateToprops,mapDispatchToProps)(PrivateRouter);
