import {useState, useEffect, useRef } from 'react'
import { getDatabase, ref, set, push, onValue } from "firebase/database";
import firebase from './Firebase';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {finalScore} from "./GuessCountry";
import { BrowserRouter, NavLink, Route, Routes, Link, useParams, Outlet, useNavigate} from "react-router-dom";

function Scoreboard(){
    const [scoreArr, setScore] = useState(null)
    const [scoreItemToDisplay, setscoreItemToDisplay] = useState(10)
    const navigate = useNavigate()

    const displayScoreBoard =()=>{
        const db = getDatabase();
        const scoresRef = ref(db, 'scores/');

        onValue(scoresRef, (snapshot) => {
            const data = snapshot.val();
            const scoreList = []
            //setScore(scoreArr)
            Object.values(data).map(x => {
                scoreList.push(x)
              })
              //console.log(scoreList)
              setScore([
                ...scoreList.sort((a, b) => b.score - a.score)
              ])
          });
    }

    const playGuessCountry = () =>{
        navigate('/guesscountry')
    }

    const setScoreItemsToDisplay = (number) =>{
        setscoreItemToDisplay(number)
    }

    useEffect(() =>{
    //    console.log('re-render')
    //    if (scoreArr != null){
    //     console.log(scoreArr)
    //    }
    document.getElementsByTagName("a")[0].style.color = "#545e6f"; 
    document.getElementsByTagName("a")[0].style.background = "#f0f0f0"; 

    if (scoreArr == null){
        displayScoreBoard()
        //console.log(finalScore)
        if (finalScore != null){
            alert('Your total score is :' +finalScore)
        }
    }
    
    },[scoreArr])


    return(
        <div className='div-center scoreboard-width'>
             <Container>
                <Row>
                    <Col>
                    <h1>Scoreboard</h1>
                    </Col> 
                </Row>
                <Row>
                    <Col>
                    <Button variant={"outline-info"} type="button" onClick={() => setScoreItemsToDisplay(10)}>
                                    Show Top 10
                        </Button>{" "}
                        <Button variant={"outline-info"} type="button" onClick={() => setScoreItemsToDisplay(100)}>
                                    Show Top 100
                        </Button>
                    </Col>
                  
                    <Col>
                        {/* <Button variant={"danger"} type="button" onClick={() => displayScoreBoard()}>
                                    Refresh
                        </Button> */}
                        <Button variant={"outline-warning"} type="button" onClick={() => playGuessCountry()}>
                                    Play Game!
                        </Button>{" "}
                        {/* <Button variant={"outline-danger"} type="button" onClick={() => playGuessCountry()}>
                                    Change new name to play!
                        </Button>{" "} */}
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <h3>Position</h3>
                    </Col>
                    <Col>
                   <h3>Name</h3> 
                    </Col>
                  <Col>
                  <h3>Total Score</h3>
                  </Col>
                  <Col>
                  <h3>Played On</h3>
                  </Col>
                </Row>
                {
                    scoreArr == null ? '':
                    scoreArr.slice(0, scoreItemToDisplay).map((x,index)=>{
                        return(
                            <Row key={x.scoreDT}>
                                <Col>
                                    {index+1}
                                </Col>
                                <Col>
                                    {x.name}
                                </Col>
                                <Col>
                                    {x.score}
                                </Col>
                                <Col>
                                    {new Date(x.scoreDT).getDate().toString().padStart(2,'0') + '/'+ ((new Date(x.scoreDT).getMonth()+1).toString().padStart(2,'0') )+'/'+ new Date(x.scoreDT).getFullYear()+'  '+new Date(x.scoreDT).getHours().toString().padStart(2,'0')+':'+new Date(x.scoreDT).getMinutes().toString().padStart(2,'0')}
                                </Col>
                        </Row>
                        )
                       
                    })
                }
             </Container>
        </div>
    )
}

export default Scoreboard