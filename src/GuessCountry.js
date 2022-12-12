import {useState, useEffect, useRef } from 'react'
import { getDatabase, ref, set, push, child, update } from "firebase/database";
import { BrowserRouter, NavLink, Route, Routes, Link, useParams, Outlet, useNavigate} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from "react-bootstrap/Image";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {userProfile} from "./User";
let finalScore = null ;

//https://restcountries.com/v3.1/all
function GuessCountry(){
    const getCountryListURL = `https://restcountries.com/v3.1/all`
    const [score, setScore] = useState(0)
    const [isFirstLoad, setFirstLoad] = useState(true)
    const params = useParams()
    const [mode, setMode] = useState(params.mode ? params.mode : '')
    const [selectedOption, setSelectedOption] = useState(null)
    const [correctAnswerNo, setAnswerNo] = useState(0)
    const [wrongAttemptNo, setWrongAttemptNo] = useState(0)
    const [wrongAttemptIcon, setWrongAttemptIcon] = useState(['','',''])
    const [countryList, setCountryList] = useState(null)
    const [country, setCountry] = useState(null)
    const [option1, setOption1] = useState(null)
    const [option2, setOption2] = useState(null)
    const [option3, setOption3] = useState(null)
    const [option4, setOption4] = useState(null)
    const [optionsCss, setOptionsCss] = useState(['primary','primary','primary','primary'])
    const [second, setSecond] = useState(3) 
    const [runTimer, setTimerRun] = useState(false) 
    const navigate = useNavigate()
    const generateQuiz = () =>{      
        const min = 0;
        const max = countryList.length;
        const randomNoArr = [];
        const oriOptionsCSS = optionsCss
        const randomNo1= 0
        const randomNo2= 0
        const randomNo3= 0
        const randomNo4 = 0

        var randomArr = [];
        while(randomArr.length < 4){
            var r = parseInt(min + (Math.random() * (max - min)));
            if(randomArr.indexOf(r) === -1) {
                randomArr.push(r);
                randomNoArr.push(r)
            }
        }
        const correctAnswer = parseInt(0 + (Math.random() * (randomNoArr.length - 0)))
        setAnswerNo(correctAnswer)

        setOption1(countryList[randomNoArr[0]])
        setOption2(countryList[randomNoArr[1]])
        setOption3(countryList[randomNoArr[2]])
        setOption4(countryList[randomNoArr[3]])
        setCountry(countryList[randomNoArr[correctAnswer]])
        oriOptionsCSS.fill('primary')
        setOptionsCss([
            ...oriOptionsCSS
        ])
        setSelectedOption(null)
    }


    const verifyAnswerSelected= (selectedCountry, optionNo) => {
        setSelectedOption(optionNo)
        // console.log(optionNo)
       const oriOptionsCSS = optionsCss
       //console.log(selectedCountry+' '+optionNo)

        if (selectedCountry == null && optionNo == -1){
            //console.log('calling here 1')
            setWrongAttemptIcon([
                ...wrongAttemptIcon.slice(0,wrongAttemptNo),
                '❌',
                ...wrongAttemptIcon.slice(wrongAttemptNo+1)
            ])
            setWrongAttemptNo(wrongAttemptNo + 1)
           
        }
        else{
            if (selectedCountry.name.common == country.name.common){
                setOptionsCss([
                    ...oriOptionsCSS.slice(0,optionNo),
                    'success disabled',
                    ...oriOptionsCSS.slice(optionNo+1)
                ])
                //Add score
                setScore(score+1)
            }
            else{
                //console.log('calling here 2')
                oriOptionsCSS.fill('danger disabled')
                oriOptionsCSS[correctAnswerNo]='success disabled';
                setOptionsCss([
                    ...oriOptionsCSS
                ])
                setWrongAttemptIcon([
                    ...wrongAttemptIcon.slice(0,wrongAttemptNo),
                    '❌',
                    ...wrongAttemptIcon.slice(wrongAttemptNo+1)
                ])
                setWrongAttemptNo(wrongAttemptNo + 1)
            }
        }
    }

    const displayGameOver =()=>{
        toggleTimer()
        const db = getDatabase();
        const updates = {};
        //const IDKey = push(child(ref(db), 'scores')).key;
        updates['/scores/' + userProfile.pushID] = {
            name: userProfile.name
          ,score : score
          ,scoreDT: Date.now()
        };
        update(ref(db), updates);
        setFinalScore()
        navigate('/scoreboard')
        document.getElementsByTagName("a")[0].style.color = "#545e6f"; 
        document.getElementsByTagName("a")[0].style.background = "#f0f0f0"; 
        // alert('Your total score is :' +score)
    }

    const toggleTimer = () => {
        setTimerRun(!runTimer)
    }

    const setFinalScore = () =>{
        finalScore = score
      }

    useEffect(() =>{
    if (wrongAttemptNo == 3){ //0,1,2
            displayGameOver()
        }
    },[wrongAttemptNo,wrongAttemptIcon])

    useEffect(() =>{
        let timer = null 
        const tick = () => {
            setSecond(second - 1)
            //console.log(second + ' selectedOption: '+selectedOption)
            if (second == 1 && (country == null || selectedOption != null)){
                setSecond(5)
                generateQuiz()  
            }
            else if (second == 1 && selectedOption == null){
                 verifyAnswerSelected(null,-1)
                 setSecond(5)
                 generateQuiz()  
             }
        }

        if (!runTimer){
            clearInterval(timer)
            setSecond(3)
            //console.log('Timer has been reset: ' + second)
        }
        
        if (runTimer){
            //console.log('Timer running: ' + second)
            timer = setInterval(tick, 1000)

            const cleanUp = () => {
                clearInterval(timer)
            }
            return cleanUp
        }

        if (isFirstLoad){
            document.getElementsByTagName("a")[0].style.color = "#fff"; 
            document.getElementsByTagName("a")[0].style.background = "#7600dc"; 
            const result = fetch(getCountryListURL)        
                        .then(response => response.json())
                        .then(data =>{
                            setFirstLoad(false) 
                            setCountryList(data.map(x => {
                                return {...x, isShown:false}
                            }))
                            // console.log(data)
                            toggleTimer();                                              
                         });  
            // set first nav active

                    
        }

        return () => clearInterval(timer)
    },[runTimer,second]);

    return(
        <div className='div-center'>
             {
            country == null 
            ? <h4>Game will start in {second}</h4>
            : 
            <Container>
            <Row>
                <Col> <p>What is the name of country?</p></Col>
            </Row>
            <Row>
                <Col><h4>Score: {score}</h4></Col>
               
                <Col>
                    {country == null ?  (<h4>Game will start in {second}</h4>) : (<h4>Remaining: {second} second(s)</h4> ) }
                   
                </Col>
            </Row>
            <Row>
                <Col><h2>{wrongAttemptIcon[0]}&nbsp;{wrongAttemptIcon[1]}&nbsp;{wrongAttemptIcon[2]}</h2></Col>
            </Row>
            <Row>
            <Col>&nbsp;</Col>
                <Col xs={6}>
                     <Image style={{border:"2px solid black"}} src={country == null ? 'https://miro.medium.com/max/880/0*H3jZONKqRuAAeHnG.jpg' :country.flags.svg} fluid />
                </Col>
                <Col>&nbsp;</Col>
            </Row>
            <Row>
                <Col>&nbsp;</Col>
            </Row>
            <Row>
                <Col>
                    {/* <Button variant={optionsCss[0]} type="submit" onClick={() => {verifyAnswerSelected(option1, 0);setSelectedOption();}}> */}
                    <Button variant={optionsCss[0]} title={option1.flag} type="submit" onClick={() => {verifyAnswerSelected(option1, 0);}}>
                                {option1 == null ? '' : option1.name.common}
                    </Button>
                </Col>
                <Col>
                    <Button variant={optionsCss[1]} title={option2.flag} type="submit" onClick={() => verifyAnswerSelected(option2, 1)}>
                                {option2 == null ? '' :option2.name.common}
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col>&nbsp;</Col>
            </Row>
            <Row>
                <Col>
                    <Button variant={optionsCss[2]} title={option3.flag} type="submit" onClick={() => verifyAnswerSelected(option3, 2)}>
                                {option3 == null ? '' : option3.name.common}
                    </Button>
                </Col>
                <Col>
                    <Button variant={optionsCss[3]} title={option4.flag} type="submit" onClick={() => verifyAnswerSelected(option4, 3)}>
                                {option4 == null ? '' : option4.name.common}
                    </Button>
                </Col>
            </Row>
        </Container>
            }
           
        </div>
    )
}
export {finalScore}
export default GuessCountry