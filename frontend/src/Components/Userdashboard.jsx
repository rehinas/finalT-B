import React, { useState, useEffect } from 'react';
import Usernav from './Usernav';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function Userdashboard() {
  const [cards, setCards] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  

  const fetchNewPosts = async () => {
    try {
      const response = await fetch('/api/movies');
      const newPosts = await response.json();
      setCards(newPosts);
    
    } catch (error) {
      console.error('Error fetching new posts:', error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(fetchNewPosts, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <Usernav />
      <div style={{ marginTop: "5%" }}>
        <Row xs={1} md={3} className="g-4">
          {cards.map((card) => (
            <Col key={card.id}>
              
              <Card
                className={`custom-card ${hoveredCard === card.id ? 'highlighted' : ''}`}
                style={{ marginLeft: "10%" ,marginRight:"10%"}}
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <Card.Img variant="top" src={card.image} />
                <Card.Body>
                  <Card.Title>{card.movieName}</Card.Title>
                  <Card.Text>Category: {card.category}</Card.Text>
                  <Card.Text>Language: {card.languages}</Card.Text>
                 
                  <div className="custom-buttons">
                  <Link to={`/details/${card._id}`}>
                      <Button variant="dark" style={{ marginLeft: "8px" }}>More</Button>
                    </Link>
                    <Link to={`/book/${card._id}`}>
                    <Button variant="dark" style={{ marginLeft: "8px" }}>Book</Button>
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
     <div className="footer-spacer"  style={{marginTop:"15%"}}><footer className="bg-dark text-light mt-3 py-2 text-center"style={{position:"absolute",marginTop:"20%",width:"100%",}}>
        &copy; Atropia
      </footer></div>  
      
    </div>
  );
}

export default Userdashboard;






