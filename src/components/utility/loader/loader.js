import React from "react"

export const Loader=(props)=>{
    return(
        <i class={`fas fa-circle-notch fa-spin ${props.className}`} style={{color:props.color}}></i>
    )
}