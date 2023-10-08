import React, { useState, useEffect } from 'react';
import { Navbar, Nav, NavDropdown, Button, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function Usernav() {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
  const userToken = sessionStorage.getItem('usertoken');
  if (userToken) {
    axios.get('/api/user', {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
      .then((response) => {
        console.log('API Response:', response.data); // Add this line for debugging
        const { name, email } = response.data;
        setUserData({ name, email });
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }
}, []);


  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand>Atropia</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav"  >
        <Nav style={{paddingLeft:"70%"}}>
          <Nav.Link href="/user"> Movies</Nav.Link>
        
        
        </Nav>
        <Nav className="ml-auto" style={{paddingLeft:"5%", paddingRight:"8%", height:"10%",width:"30%"}}>
          <Dropdown className="ml-auto" >
            <Dropdown.Toggle variant="light" id="dropdown-basic" style={{width:"100%", height:"100%"}} >
              <img style={{width:"50%",height:"50%"}}
                src="https://static.vecteezy.com/system/resources/previews/014/194/216/original/avatar-icon-human-a-person-s-badge-social-media-profile-symbol-the-symbol-of-a-person-vector.jpg" 
                alt="User"
                className="rounded-circle"
              />
            </Dropdown.Toggle>
           
    <Dropdown.Menu>
      <Dropdown.Item>Email: {userData.email}</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item>Name: {userData.name}</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item href="/">Log Out</Dropdown.Item>
    </Dropdown.Menu>
 
</Dropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Usernav;