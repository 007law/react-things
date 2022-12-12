import {useState, useEffect, useRef } from 'react'
import { getDatabase, ref, set, push } from "firebase/database";
import firebase from './Firebase';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Scoreboard from './Scoreboard';
import {BrowserRouter,Routes,Route, useParams, useNavigate, NavLink} from 'react-router-dom'
import User from "./User";
import GuessCountry from "./GuessCountry";
import ViewAllFlags from './ViewAllFlags';

function Main(props){
    const [isFirstLoad, setFirstLoad] = useState(props.isFirstLoad)
    useEffect(()=>{
      // console.log('Test: '+props.isFirstLoad)
      // if (isFirstLoad){
      //   setFirstLoad(!isFirstLoad)
      //     navigate('/guesscountry')
      // }
    })

    return(
        <div>
        <BrowserRouter>
            <h1>🇲🇾 Guess the Flag! 🇲🇾</h1>
            <nav className=''>
                <NavLink to={"/guesscountry"}
                  style={({ isActive }) => ({
                    color: isActive ? '#fff' : '#545e6f',
                    background: isActive ? '#7600dc' : '#f0f0f0',
                  })}
                >Play Guess Country By Flag</NavLink><br/><br/>

                <NavLink to={"/scoreboard"}
                  style={({ isActive }) => ({
                    color: isActive ? '#fff' : '#545e6f',
                    background: isActive ? '#7600dc' : '#f0f0f0',
                  })}
                >Scoreboard</NavLink><br/><br/>

                <NavLink to={"/viewallflags"}
                  style={({ isActive }) => ({
                    color: isActive ? '#fff' : '#545e6f',
                    background: isActive ? '#7600dc' : '#f0f0f0',
                  })}
                >View All Flags</NavLink><br/>
            </nav>
            <Routes>
            <Route path="/" element={<GuessCountry />}></Route>
            <Route path="/guesscountry" element={<GuessCountry />}></Route>
            <Route path="/scoreboard" element={<Scoreboard />}></Route>
            <Route path="/viewallflags" element={<ViewAllFlags />}></Route>
            <Route path="*" element={<p>Page not found</p>}/>
            </Routes>
      </BrowserRouter>
        </div>
    )
}

export default Main