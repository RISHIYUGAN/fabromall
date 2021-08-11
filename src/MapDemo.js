import React, {Component} from "react"

const Planets=['Mars','Venus','Jupiter','Earth','Saturn','Neptune'];

const mappingFunction=(item)=> <li className="list-group-item" key={item}>{item}</li>;


class MapDemo extends Component{

render(){
    const list1=Planets.map(mappingFunction)
    return <ul className="list-group m-5">{list1}</ul>
}
}
export default MapDemo;