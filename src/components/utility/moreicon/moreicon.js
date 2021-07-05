import React from "react";

export const MoreIcon = (props) => {
  return (
    <div className="more-icon-div" style={{backgroundColor:`${props.backgroundColor}`,boxShadow:`${props.boxshadow}`,position:`${props.position}`,top:`${props.top}`,right:`${props.right}`,color:`${props.textcolor}`,fontSize:`${props.fontsize}`,fontFamily:`${props.fontfamily}`}} onMouseOver={()=>{
      document.getElementById(props.drpdwn).style.display="flex"
    }}
    onMouseLeave={()=>{
      document.getElementById(props.drpdwn).style.display="none"
    }}
    >
      <div className="dot" style={{backgroundColor:`${props.color}`}}></div>
      <div className="dot" style={{backgroundColor:`${props.color}`}}></div>
      <div className="dot" style={{ position: "relative",backgroundColor:`${props.color}`}}>
        <div className="wish-drop-down" id={props.drpdwn}>
          <div className="wish-dd-wrapper">
            <div className="drop-content" onClick={()=>props.action1()}>
              {props.option1} <div className="drop-down-mark"></div>
            </div>
            <div className="drop-content" onClick={()=>props.action2()}>{props.option2}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
