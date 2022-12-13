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
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';

function ViewAllFlags(){
    const getCountryListURL = `https://restcountries.com/v3.1/all`
    const [isFirstLoad, setFirstLoad] = useState(true)
    const [countryList, setCountryList] = useState(null)
    const [displayModel, setDisplayModel] = useState(false)
    const [countrySelected, setCountrySelected] = useState(null)

    const setCountryIntoState = (country) =>{
        setCountrySelected(country)
        triggerModel()
    }

    const triggerModel = () => {
        setDisplayModel(!displayModel)
    }


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
                            //console.log(data)
                                                                 
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
                    <ImageList sx={{ width: 1000, height: 450 }} cols={3} >
                        {countryList == null ? '' : countryList.map((item) => (
                        <ImageListItem key={item.name.common}>
                            <img
                             src={`${item.flags.png}?w=248&fit=crop&auto=format`}
                             srcSet={`${item.flags.png}?w=248&fit=crop&auto=format&dpr=2 2x`}
                             alt={item.name.common}
                             title={item.name.common + ' ' +item.flag}
                             loading="lazy"
                             onClick={()=>setCountryIntoState(item)}
                            />
                        </ImageListItem>
                        ))}
                    </ImageList> 
                    </Col>
                </Row>
            </Container>
            {displayModel && <TransitionsModal displayModel={displayModel} country={countrySelected}/>} 
        </div>
    )
}

function TransitionsModal(props){
    const [open, setOpen] = useState(props.displayModel);
    const [languages, setLanguages] = useState(null);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [isFirstLoad, setFirstLoad] = useState(true)

    useEffect(() =>{
        const languagesList = []
        console.log(props.country)
        if (isFirstLoad){
            if (props.country.languages != null){
                Object.values(props.country.languages).map(x => {
                    languagesList.push(x)
                  })
        
                  setLanguages([
                    ...languagesList
                  ])
                
            }
            setFirstLoad(false) 
        }


    })
    return(
        <div>
        {/* <Button onClick={handleOpen}>Open modal</Button> */}
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
          <Fade in={open}>
            <Box className='modal-style'>
                <Container>
                    <Row><Col>&nbsp;</Col></Row>
                    <Row>
                        <Col>
                            <h2>{props.country.name.common+' '+props.country.flag}</h2>
                        </Col>
                        <Col className='text-end'>
                        <Image style={{border:"2px solid black"}} src={props.country == null ? 'https://miro.medium.com/max/880/0*H3jZONKqRuAAeHnG.jpg' : props.country.flags.png} fluid width="80"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        Area
                        </Col>
                        <Col>
                        {(parseFloat(props.country.area) / 1000 / 1000).toFixed(3) == 0.000 ? props.country.area :(parseFloat(props.country.area) / 1000 / 1000).toFixed(3)} million km²
                        </Col>
                    </Row>
                    <Row className='align-items-center'>
                        <Col>
                        Coat of arms
                        </Col>
                        <Col>
                        <Image style={{border:"2px solid black"}} src={props.country == null ? 'https://miro.medium.com/max/880/0*H3jZONKqRuAAeHnG.jpg' : props.country.coatOfArms.png} fluid width="80"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Capital
                        </Col>
                        <Col>
                        {
                            //  (props.country.capital.map(x => {
                            //     return x
                            // }))
                            props.country.capital == null ? '' : props.country.capital.toString()
                        }
                        </Col>
                    </Row>  
                    <Row>
                        <Col>
                            Population
                        </Col>
                        <Col>
                        {
                         props.country.population
                        }
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Languages
                        </Col>
                        <Col>
                        {
                             languages == null ? '' : languages.toString() 
                        }
                        </Col>
                    </Row>
                </Container>
            </Box>
          </Fade>
        </Modal>
      </div>
    )
}

export default ViewAllFlags