import React,{Fragment} from "react"

export const ProductSearch=(props)=>{
  return(
  
    <div className="search-div">
        <form
    onSubmit={(e)=>props.searchprd(e)}
    autocomplete="off"
  >
      <div className="search-input-div">
        <input
          type="text"
          value={props.suggestvalue}
          autocomplete="off"
          onChange={(e) => {
           props.setSuggestvalue(e) 
          }}
          onFocus={props.focus}
          onBlur={(e)=>props.blur(e)}
          name="search"
          id="search-id"
        />
        <div id="pseudo-placeholder" className="pseudo-placeholder" style={{display:`${props.suggestvalue===""?"block":"none"}`}}>
          <i class="fas fa-search"></i>&nbsp;Search
        </div>
        <div id="show-sugs" className="show-sugs" style={{display:`${props.searchfilter.length===0?"none":"block"}`}}>
          {props.searchfilter.map((prd) => (
            <div
              className="search-options"
              onClick={() => {
                props.setSuggestvaluetype(prd.typename);
              }}
            >
              <div
                className="search-sug-img-div"
                style={{ backgroundImage: `url("${prd.img}")` }}
              ></div>
              <div className="search-sug-name">{prd.typename}</div>
            </div>
          ))}
        </div>
      </div>
      <button className="search-btn">
        <i class="fas fa-search"></i>
      </button>
      </form>
    </div>
  
  )
}