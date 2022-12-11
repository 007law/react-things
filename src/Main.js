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

function Main(){

    return(
        <div>
        <BrowserRouter>
            <h1>🇲🇾 Guess the Flag! 🇲🇾</h1>
            <nav>
                <NavLink to={"/guesscountry"}>Play Guess Country By Flag</NavLink><br/>
                <NavLink to={"/scoreboard"}>Scoreboard</NavLink><br/>
            </nav>
            <Routes>
            <Route path="/" element={<GuessCountry />}></Route>
            <Route path="/guesscountry" element={<GuessCountry />}></Route>
            <Route path="/scoreboard" element={<Scoreboard />}></Route>
            <Route path="*" element={<p>Page not found</p>}/>
            </Routes>
      </BrowserRouter>
        </div>
    )
}

export default Main