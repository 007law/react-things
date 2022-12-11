import {useState, useEffect, useRef } from 'react'
import { getDatabase, ref, set, push, child, update } from "firebase/database";
import firebase from './Firebase';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Main from './Main';
let userProfile = null ;
function User(){
const [user, setUser] = useState('')
const [message, setMessage] = useState('Unique name will be fun!')
const [messageCSS, setMessageCSS] = useState('text-muted')
const [userCreatedStatus, setUserStatus] = useState(false)

const onUserNameChanged = (event) => {
    setUser(event.target.value)
    setMessageCSS('Unique name will be fun!')
    setMessageCSS('text-muted')
  }

const handleSubmit = (event) => {
    event.preventDefault()
    if (user == ''){
      setMessage('Name is required!')
      setMessageCSS('text-danger')
    }
    else{
      const db = getDatabase();
      const updates = {};
      // console.log(push(child(ref(db), 'users')).key)
      const IDKey = push(child(ref(db), 'users')).key;
      updates['/users/' + IDKey] = {
        name : user
        ,createDT: Date.now()
      };

      update(ref(db), updates);

      // set(ref(db, 'users/' + user +'-'+ Date.now()), {
      //   name : user
      //   ,createDT: Date.now()
      // });
      setUserStatus(true)
      setConstUser(IDKey)
    }
   
  }

  const setConstUser = (pushID) =>{
    userProfile = {
      name: user,
      pushID: pushID
    }
  }

 return(
  userCreatedStatus ? 
  <div>
    Have fun, {user}
    <Main/>
  </div>
  :
  <div>
      <Container>
        <Row>
          <Col>&nbsp;</Col>
        </Row>
        <Row>
          <Col>&nbsp;</Col>
        </Row>
        <Row>
            <Col> 
            <div className='div-center'>
              <Form onSubmit={handleSubmit}>
                  <h1>Before start:</h1>
                  <div className="mb-5"></div>
                  <Form.Group className="mb-3" controlId="formBasicName">
                      <Form.Label>Name</Form.Label>
                          <Form.Control type="name" placeholder="Enter your name" value={user} onChange={onUserNameChanged}
                          required/>
                          <Form.Control.Feedback type="invalid">
                            Please choose a username.
                          </Form.Control.Feedback>
                          <Form.Text className={messageCSS}>
                              {message}
                          </Form.Text>
                          
                  </Form.Group>
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                            Start the game!
                </Button>
              </Form>
            </div>
            </Col>
        </Row>
      </Container>
  </div>
 )
    // return(
    
    //     <div>
            // <Container>
            //   <Row>
            //     <Col>&nbsp;</Col>
            //   </Row>
            //   <Row>
            //     <Col>&nbsp;</Col>
            //   </Row>
            //     <Row>
            //         <Col> 
            //         <div className='div-center'>
            //           <Form onSubmit={handleSubmit}>
            //               <h1>Before start:</h1>
            //               <div className="mb-5"></div>
            //               <Form.Group className="mb-3" controlId="formBasicName">
            //                   <Form.Label>Name</Form.Label>
            //                       <Form.Control type="name" placeholder="Enter your name" value={user} onChange={onUserNameChanged}
            //                       required/>
            //                       <Form.Control.Feedback type="invalid">
            //                         Please choose a username.
            //                       </Form.Control.Feedback>
            //                       <Form.Text className={messageCSS}>
            //                           {message}
            //                       </Form.Text>
                                  
            //               </Form.Group>
            //             <Button variant="primary" type="submit" onClick={handleSubmit}>
            //                         Start the game!
            //             </Button>
            //           </Form>
            //         </div>
            //         </Col>
            //     </Row>
            // </Container>
           
    //     </div>
    // )
}
export {userProfile}
export default User