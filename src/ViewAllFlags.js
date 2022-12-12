import {useState, useEffect, useRef } from 'react'
import { getDatabase, ref, set, push, child, update } from "firebase/database";
import { BrowserRouter, NavLink, Route, Routes, Link, useParams, Outlet, useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from "react-bootstrap/Image";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Button from '@mui/material/Button';

function ViewAllFlags(){
    const getCountryListURL = `https://restcountries.com/v3.1/all`
    const [isFirstLoad, setFirstLoad] = useState(true)
    const [countryList, setCountryList] = useState(null)
    useEffect(() =>{
        document.getElementsByTagName("a")[0].style.color = "#545e6f"; 
        document.getElementsByTagName("a")[0].style.background = "#f0f0f0"; 

        if (isFirstLoad){
            const result = fetch(getCountryListURL)        
                        .then(response => response.json())
                        .then(data =>{
                            setFirstLoad(false) 
                            setCountryList(data.map(x => {
                                return {...x, isShown:false}
                            }))
                            console.log(data)
                                                                 
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
                <Row>
                    <Col>
                    <ImageList sx={{ width: 1000, height: 450 }} cols={3} rowHeight={152}>
                        {countryList == null ? '' : countryList.map((item) => (
                        <ImageListItem key={item.name.common}>
                            <img
                             src={`${item.flags.png}`}
                             srcSet={`${item.flags.png}`}
                             alt={item.name.common}
                             loading="lazy"
                            //onClick={triggerModel}
                            />
                        </ImageListItem>
                        ))}
                    </ImageList> 
                    </Col>
                </Row>
            </Container>
           
        </div>
    )
}

export default ViewAllFlags