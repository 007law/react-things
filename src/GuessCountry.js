import {useState, useEffect, useRef } from 'react'
import { getDatabase, ref, set, push } from "firebase/database";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from "react-bootstrap/Image";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


//https://restcountries.com/v3.1/all
function GuessCountry(){
    const getCountryListURL = `https://restcountries.com/v3.1/all`

    const [score, setScore] = useState(0)
    const [isFirstLoad, setFirstLoad] = useState(true)
    const [quizNo, setQuizNo] = useState(0)
    const [randomNo, setRandomNo] = useState(0)
    const [countryList, setCountryList] = useState(null)
    const [country, setCountry] = useState(null)

    // const option = { text: ''}
    // const [option1, setOption1] = useState(option)
    // const [option2, setOption2] = useState(option)
    // const [option3, setOption3] = useState(option)
    // const [option4, setOption4] = useState(option)
    const [option1, setOption1] = useState(null)
    const [option2, setOption2] = useState(null)
    const [option3, setOption3] = useState(null)
    const [option4, setOption4] = useState(null)

    const getRandomNo = (min, max) =>{
        // setRandomNo(parseInt(0 + (Math.random() * (countryList.length - 0))))
        setRandomNo(parseInt(min + (Math.random() * (max - min))))
       // console.log('CountryList:'+ countryList.length +' '+randomNo)
    }

    const generateQuiz = () =>{
        const min = 0;
        const max = countryList.length;
        const randomNoArr = [];
        randomNoArr.push(parseInt(min + (Math.random() * (max - min))))
        randomNoArr.push(parseInt(min + (Math.random() * (max - min))))
        randomNoArr.push(parseInt(min + (Math.random() * (max - min))))
        randomNoArr.push(parseInt(min + (Math.random() * (max - min))))


        // setOption1(countryList[parseInt(min + (Math.random() * (max - min)))])
        // setOption2(countryList[parseInt(min + (Math.random() * (max - min)))])
        // setOption3(countryList[parseInt(min + (Math.random() * (max - min)))])
        // setOption4(countryList[parseInt(min + (Math.random() * (max - min)))])
        setOption1(countryList[randomNoArr[0]])
        setOption2(countryList[randomNoArr[1]])
        setOption3(countryList[randomNoArr[2]])
        setOption4(countryList[randomNoArr[3]])
        setCountry(countryList[randomNoArr[parseInt(0 + (Math.random() * (randomNoArr.length - 0)))]])
        console.log(country)
    }


    const verifyAnswerSelected= (country) => {
        console.log(country)
    }

    const setOptions = () =>{

        setOption1({
            text: 'Malaysia'
        })

        setOption2({
            text: 'Malaysia 1'
        })

        setOption3({
            text: 'Malaysia 2'
        })

        setOption4({
            text: 'Malaysia 3'
        })
    }

    useEffect(() =>{
        if (isFirstLoad){
            const result = fetch(getCountryListURL)        
                        .then(response => response.json())
                        .then(data =>{
                        // console.log(data.map(object => {
                        //     return {...object, isShown: false};
                        //   }))
                        setFirstLoad(false) 
                        setCountryList(data.map(x => {
                            return {...x, isShown:false}
                        })) 

                        //getRandomNo();
                                
            });  
        }
    });

    return(
        <div className='div-center'>
        
           
            <Container>
                <Row>
                    <Col> <p>What is the name of country?</p></Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col></Col>
                    <Col>
                        <Button variant="primary" type="submit" onClick={generateQuiz}>
                                    Skip!
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col>&nbsp;</Col>
                </Row>
                <Row>
                    <Col>
                         <Image src={country == null ? 'https://miro.medium.com/max/880/0*H3jZONKqRuAAeHnG.jpg' :country.flags.svg} fluid />
                    </Col>
                </Row>
                <Row>
                    <Col>&nbsp;</Col>
                </Row>
                <Row>
                    <Col>
                        <Button variant="primary" type="submit" onClick={() => verifyAnswerSelected(option1)}>
                                    {option1 == null ? '' : option1.name.common}
                        </Button>
                    </Col>
                    <Col>
                        <Button variant="primary" type="submit" onClick={() => verifyAnswerSelected(option2)}>
                                    {option2 == null ? '' :option2.name.common}
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col>&nbsp;</Col>
                </Row>
                <Row>
                    <Col>
                        <Button variant="primary" type="submit" onClick={() => verifyAnswerSelected(option3)}>
                                    {option3 == null ? '' : option3.name.common}
                        </Button>
                    </Col>
                    <Col>
                        <Button variant="primary" type="submit" onClick={() => verifyAnswerSelected(option4)}>
                                    {option4 == null ? '' : option4.name.common}
                        </Button>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default GuessCountry