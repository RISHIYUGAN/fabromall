export const suggestionset=(sug)=>{
    return(
      {
          type:"SuggestionSet",
          suggestions:sug
      }
    )
}
export const AuthChange=(auth)=>{
  return({
    type:"Auth",
    auth
  })
}