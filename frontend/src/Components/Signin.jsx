import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom'; 
import { Navbar, Container, Nav, Image } from 'react-bootstrap';
import axios from 'axios';
function Signin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('/api/login', formData);
  
      if (response && response.data) { // Check if response and response.data are defined
        if (response.data.message === 'Login successful') {
          const token = response.data.token;
          const userId = response.data.data._id;
          const userRole = response.data.data.userRole;
  
          console.log(userRole);
          console.log(token);
          console.log(userId);
          sessionStorage.setItem("usertoken", token);
          sessionStorage.setItem("userId", userId);
          sessionStorage.setItem("userRole", userRole);
  
          if (userRole === 'admin') {
            alert('Login successful as Admin');
            navigate('/admin');
          } else if (userRole === 'user') {
            alert('Login successful');
            navigate('/user');
          }
        } else {
          alert('Login failed: ' + response.data.message);
        }
      } else {
        alert('Login failed: Unexpected response from the server');
      }
    } catch (error) {
      alert('Login failed: ' + error.response.data.message);
      console.error(error);
    }
  };
  
  return (
    <div style={{ backgroundImage: "url(https://www.seattlemag.com/sites/default/files/field/image/cinerama_1.jpg)", height: "100vh", backgroundSize: "cover", backgroundAttachment: "fixed" }}>
      <Navbar bg="transparent" variant="dark" expand="lg" className="fixed-top">
        <Container>
          <Image
            src="data:image/jpeg;base64,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"
            alt="Logo"
            style={{ height: "40px", marginRight: "2px" }}
          />
          <Navbar.Brand href="#home">Atropia</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="/" style={{ marginRight: "170px" }}>Home</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="container">
        <div className='row justify-content-center align-items-center' style={{ minHeight: "100vh" }}>
          <div className='col-md-4' style={{ boxShadow: "-1px 1px 60px 10px black", background: "rgba(0,0,0,0.4)" }}>
            <div className="row">
              <div className="col-md-12">
                <h3 className="text-left fs-25" style={{ color: "white", marginTop: "35%" }}>Sign In</h3>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className='label control-label fs-19px' style={{ fontWeight: "normal", marginTop: "15px", color: "white" }}>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      style={{ background: "transparent", borderRadius: "0px", borderBottom: "1px solid white", marginTop: "15px", height: "40px",color:"white" }}
                    />
                  </div>
                  <div className="form-group">
                    <label className='label control-label fs-19px' style={{ fontWeight: "normal", marginTop: "15px", color: "white" }}>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      style={{ background: "transparent", borderRadius: "0px", borderBottom: "1px solid white", marginTop: "15px", height: "40px",color:"white" }}
                    />
                  </div><br></br>
                  <button type="submit" className="btn btn-light w-100 mb-4 btn-block">
                    Sign In
                  </button>
                </form>
                <p className="mt-3 text-center " style={{color:"white"}}>
                  Don't have an account? <a href="/sign" style={{color:"white"}}>Sign up</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;


