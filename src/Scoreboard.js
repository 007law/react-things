import {useState, useEffect, useRef } from 'react'
import { getDatabase, ref, set, push, onValue } from "firebase/database";
import firebase from './Firebase';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Scoreboard(){
    const [scoreArr, setScore] = useState(null)
    const [isFirstLoad, setFirstLoad] = useState(true)

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

    useEffect(() =>{
    //    console.log('re-render')
    //    if (scoreArr != null){
    //     console.log(scoreArr)
    //    }
    if (scoreArr == null){
        displayScoreBoard()
    }
    
    },[scoreArr])


    return(
        <div className='div-center'>
             <Container>
                <Row>
                    <Col>
                    <h1>Scoreboard</h1>
                    </Col> 
                </Row>
                <Row>
                    <Col>&nbsp;</Col>
                    <Col>&nbsp;</Col>
                    <Col>
                    <Button variant={"danger"} type="button" onClick={() => displayScoreBoard()}>
                                   Refresh
                        </Button>
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
                    scoreArr.map((x,index)=>{
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
                                    {new Date(x.scoreDT).getDate() + '/'+ (new Date(x.scoreDT).getMonth()+1 )+'/'+ new Date(x.scoreDT).getFullYear()}
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