import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Header } from "../header/header";
import { Footer } from "../footer/footer";

const PrivateRouter = ({
  isAuthenticated,
  component: Component,
  footer,
  ...rest
}) => {
  return (
    <div>
      <Header />
      <Route
        {...rest}
        component={(props) =>
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

export default connect(mapStateToprops)(PrivateRouter);
