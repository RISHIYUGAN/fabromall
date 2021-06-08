import logo from './logo.svg'
import React,{useState,useEffect} from "react"
import './App.css';
import { Provider } from 'react-redux';
import configureStore from "./components/Redux/store"
import { AppRouter } from './components/Router/router';

export const store=configureStore()

function App() {
  return (
    <div>
       <Provider store={store}>
          <AppRouter/>
       </Provider>
    </div>
  );
}
export default App;