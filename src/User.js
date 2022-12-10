import {useState, useEffect, useRef } from 'react'
import { getDatabase, ref, set, push } from "firebase/database";
import firebase from './Firebase';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

function User(){
const [user, setUser] = useState('')

const onUserNameChanged = (event) => {
    setUser(event.target.value)
  }

const handleSubmit = (event) => {
    event.preventDefault()
    const db = getDatabase();
    set(ref(db, 'users/' + user +'-'+ Date.now()), {
      name : user
      ,createDT: Date.now()
    });
  }

    return(
        <div className='div-center'>
           <Form onSubmit={handleSubmit}>
            <h1>Before start:</h1>
            <div className="mb-5"></div>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                    <Form.Control type="name" placeholder="Enter your name" value={user} onChange={onUserNameChanged}/>
                    <Form.Text className="text-muted">
                        Unique name will be fun!
                    </Form.Text>
                    
            </Form.Group>
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                            Start the game!
                </Button>
            </Form>
        </div>
    )
}

export default User