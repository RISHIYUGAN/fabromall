import React from "react"

export const Loader=(props)=>{
    return(
        // <i class={`fas fa-circle-notch fa-spin ${props.className}`} style={{color:props.color}}></i>
        <div class="sk-chase">
        <div class="sk-chase-dot"><div className="sk-chase-dot-before" style={{backgroundColor:props.color}}></div></div>
        <div class="sk-chase-dot"><div className="sk-chase-dot-before" style={{backgroundColor:props.color}}></div></div>
        <div class="sk-chase-dot"><div className="sk-chase-dot-before" style={{backgroundColor:props.color}}></div></div>
        <div class="sk-chase-dot"><div className="sk-chase-dot-before" style={{backgroundColor:props.color}}></div></div>
        <div class="sk-chase-dot"><div className="sk-chase-dot-before" style={{backgroundColor:props.color}}></div></div>
        <div class="sk-chase-dot"><div className="sk-chase-dot-before" style={{backgroundColor:props.color}}></div></div>
      </div>
    )
}