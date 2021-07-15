import React from "react"

export const ProductsDisplay=(props)=>{
    return(
        <div className="pds-list">
                {props.productslist.map((product) => (
                  <div className="each-prdct" onClick={()=>props.eachproduct(product)}>
                    <div className="prdct-img-div">
                      <img src={product.img} className="prd-img" />
                    </div>
                    <div className="prdct-des">
                      <div className="prdct-name">{product.name}</div>
                      <div className="rating-div">
                        <div className="rate">
                          {props.marked(product.rating).map((star) => star)}
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
                          {Math.round(
                            product.price * (1 - product.offer / 100)
                          )}
                          .00
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
        
    )
}