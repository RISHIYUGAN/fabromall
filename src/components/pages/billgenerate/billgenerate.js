import React from "react";
import "./billgenerate.css";
import * as htmlToImage from "html-to-image";
import download from "downloadjs";

const BillGenerate = (props) => {
  const downloadimg = () => {
    htmlToImage
      .toPng(document.getElementById("my-node"))
      .then(function (dataUrl) {
        download(dataUrl, `fabromall-order_`);
      });
  };
  return (
    <div className="bill-container">
      <div
        className="bill-back-drop"
          onClick={
          () =>
        props.exitbill()
        }
      ></div>
      <div className="bill-wrapper-div">
        <div className="bill-wrapper" id="my-node">
          <h4 className="bill-logo">fabroMall</h4>
          <div className="bill-title">Payment Bill</div>
          <div className="sum-prd-info-wrapper" id="bill-content">
            <div className="sum-prd-des">
              <div className="sum-prd-each-des">
                <h4 className="each-sum-prd-key">Name</h4>
                <div className="sum-prd-value">{props.profile.name}</div>
              </div>
              <div className="sum-prd-each-des">
                <h4 className="each-sum-prd-key">Contact</h4>
                <div className="sum-prd-value">{props.profile.contact}</div>
              </div>
              <div className="sum-prd-each-des">
                <h4 className="each-sum-prd-key">Product Name</h4>
                <div className="sum-prd-value">{props.product.name}</div>
              </div>
              <div className="sum-prd-each-des">
                <h4 className="each-sum-prd-key">Model Number</h4>
                <div className="sum-prd-value">
                  {props.product.model_number}
                </div>
              </div>
              <div className="divider"></div>
              <div className="sum-prd-each-des">
                <h4 className="each-sum-prd-key">Order-id</h4>
                <div className="sum-prd-value">
                {props.payment.orderid}
                </div>
              </div>
              <div className="sum-prd-each-des">
                <h4 className="each-sum-prd-key">Payment-id</h4>
                <div className="sum-prd-value">
                 {props.payment.paymentid}
                </div>
              </div>
              <div className="sum-prd-each-des">
                <h4 className="each-sum-prd-key">Product Price</h4>
                <div className="sum-prd-value">
                <i class="fas fa-rupee-sign"></i>&nbsp;{props.product.discountprice}.00
                </div>
              </div>
             
              <div className="sum-prd-each-des">
                <h4 className="each-sum-prd-key">Delivery Charge</h4>
                <div className="sum-prd-value">
                <i class="fas fa-rupee-sign"></i>&nbsp;{props.deliverycharge}.00
                </div>
              </div>
              <div className="sum-prd-each-des">
                <h4 className="each-sum-prd-key">Quantity</h4>
                <div className="sum-prd-value">
                  {props.quantity}
                </div>
              </div>
              <div className="sum-prd-each-des" id="bill-total">
                <h4 className="each-sum-prd-key" >Total</h4>
                <div className="sum-prd-value" id="total">
                <i class="fas fa-rupee-sign"></i>&nbsp;{props.product.discountprice*props.quantity+props.deliverycharge}.00
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button className="download-bill" onClick={() => downloadimg()}>
        DOWNLOAD BILL
      </button>
    </div>
  );
};
export default BillGenerate;
