import logo from './logo.svg';
import './App.css';
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
      <div className="loader-container">
        <ClipLoader color={'#33fff0'} size={60} />
      </div>
    ) : (
      <div className="main-content">
        <h1>Hello World!</h1>
        <p>
          This is a demo Project to show how to add animated loading with
          React.
        </p>


      </div>
    )}
  </div>
  );
}

export default App;
