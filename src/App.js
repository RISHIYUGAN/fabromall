import logo from './logo.svg'
import React,{useState,useEffect} from "react"
import './App.css';
import { Provider } from 'react-redux';
import configureStore from "./components/Redux/store"
import { AppRouter } from './components/Router/router';
import AxiosInstance from './components/axios/axiosInstance';
import { suggestionset } from './components/Redux/action';

export const store=configureStore()

function App() {
  useEffect(()=>{
   AxiosInstance.get("/suggestions")
   .then((res)=>{
     console.log(res.data)
     store.dispatch(suggestionset(res.data))
   })
  },[])
  return (
    <div>
       <Provider store={store}>
          <AppRouter/>
       </Provider>
    </div>
  );
}
export default App