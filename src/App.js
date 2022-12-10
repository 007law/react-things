import logo from './logo.svg';
import './App.css';
import User from "./User";
import GuessCountry from "./GuessCountry";
import {useState, useEffect, useRef } from 'react'
import ClipLoader from 'react-spinners/ClipLoader';
import {BrowserRouter,Routes,Route, useParams, useNavigate, NavLink} from 'react-router-dom'

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
      <BrowserRouter>
        <h1>🇲🇾 Guess the Flag! 🇲🇾</h1>
          <nav>
              <NavLink to={"/user"}>User</NavLink><br/>
              <NavLink to={"/guesscountry"}>Play Guess Country By Flag</NavLink>
          </nav>
        <Routes>
          <Route path="/" element={<User />}></Route>
          <Route path="/guesscountry" element={<GuessCountry />}></Route>
          <Route path="/user" element={<User />}></Route>
          <Route path="*" element={<p>Page not found</p>}/>
        </Routes>
      </BrowserRouter>
        {/* <User/> */}
      </div>
    )}
  </div>
  );
}

export default App;
