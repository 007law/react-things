import {useState, useEffect, useRef } from 'react'
import { getDatabase, ref, set, push, child, update } from "firebase/database";
import { BrowserRouter, NavLink, Route, Routes, Link, useParams, Outlet, useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from "react-bootstrap/Image";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function ViewAllFlags(){
    const getCountryListURL = `https://restcountries.com/v3.1/all`
    const [isFirstLoad, setFirstLoad] = useState(true)
    const [countryList, setCountryList] = useState(null)
    useEffect(() =>{
        if (isFirstLoad){
            const result = fetch(getCountryListURL)        
                        .then(response => response.json())
                        .then(data =>{
                            setFirstLoad(false) 
                            setCountryList(data.map(x => {
                                return {...x, isShown:false}
                            }))
                            // console.log(data)
                                                                 
                         });  
        }
    })
    return (
        <div className='div-center flags-width'>
            <Container>
                <Row>
                    <Col>
                    <h1>View all flag here</h1>
                    </Col>
                </Row>
            </Container>
           
        </div>
    )
}

export default ViewAllFlags