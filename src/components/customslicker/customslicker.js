import React, { Component } from "react";
import Slider from "react-slick";
import"./customslicker.css"
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export default class PreviousNextMethods extends Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  }
  next() {
    this.slider.slickNext();
  }
  previous() {
    this.slider.slickPrev();
  }
  render() {
    const settings = {
      dots:true,
      infinite: true,
      speed: 1000,
      autoplaySpeed:7000,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode:true,
      variableWidth:true,
      // autoplay:true
    };
    return (
      <div className="slicker-container">
        <div className="slicker-content">
          <Slider ref={(c) => (this.slider = c)} {...settings} className="custom-slider">
            <div className="each-slick">
              <div className="img-div" id="slider-1">
              <h1 id="quote-1">
                World class Designs<br/>For You
              </h1>
              </div>
            </div>
            <div className="each-slick">
              <div className="img-div"id="slider-2">
                <h1 id="quote-3">
                Good clothing makes<br/>you feel better
                </h1>
              </div>
            </div>
            <div className="each-slick">
              <div className="img-div" id="slider-3">
              <h1 id="quote-2">
                  Let your Surroundings<br/>look colourful
              </h1>
              </div>
            </div>
          </Slider>

          <div className="slicker-button-div" style={{ textAlign: "center" }}>
            <button className="slick-button" onClick={this.previous}>
            <i class="fas fa-angle-left" aria-hidden="true"></i>
            </button>
            <button className="slick-button" onClick={this.next}>
            <i class="fas fa-angle-right"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
