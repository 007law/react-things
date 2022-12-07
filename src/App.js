import logo from './logo.svg';
import './App.css';
import User from "./User";
import {useState, useEffect, useRef } from 'react'
import ClipLoader from 'react-spinners/ClipLoader';


function App() {
  const [loading, setLoading] = useState(true);

  const toggleLoading = () => {
    setLoading(!loading)
  }


  return (
    <div className="container">
        <button onClick={toggleLoading}>Toggle</button>
    {loading ? (
      <div className="loader-container loading-center">
        <ClipLoader color={'#33fff0'} size={60} />
      </div>
    ) : (
      <div className="main-content">
        
        <User/>
      </div>
    )}
  </div>
  );
}

export default App;
