import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Axios from 'axios';
import AddMovie from './Addmovie';


function Admindashboard() {
  const [cards, setCards] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [update,setUpdate]=useState(false);
  const [singleValue,setsignleValue]=useState([]);


  

  const fetchNewPosts = async () => {
    try {
      const response = await fetch('/api/movies');
      const newPosts = await response.json();
      setCards(newPosts);
    
    } catch (error) {
      console.error('Error fetching new posts:', error);
    }
  };
  const handleDelete = async (postId) => {
    try {
      await Axios.delete(`/api/movies/${postId}`);
   
      fetchNewPosts();
      alert("successfully deleted")
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };
  const handleUpdate = (card) => {
    console.log("update clicked",card)
    setUpdate(true);
    setsignleValue(card)
  };

  useEffect(() => {
    const intervalId = setInterval(fetchNewPosts, 5000);

    return () => clearInterval(intervalId);
  }, []);

  let finalJSX=<div style={{ marginTop: "5%" }}>
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
            <Card.Text>Rating :{card.userRating}/5</Card.Text>
            
           
            <div className="custom-buttons">
           
                <Button variant="dark" style={{ marginLeft: "8px" }} onClick={()=>handleUpdate(card)}>Update</Button>
              
              <Button
                variant="dark"
                style={{ marginLeft: "8px" }}
                onClick={() => handleDelete(card._id)}
              >Delete</Button>
       
            </div>
          </Card.Body>
        </Card>
      </Col>
    ))}
  </Row>
</div>
if(update) finalJSX=<AddMovie method="put" data={singleValue}/>

  return (
      finalJSX
  );
}
export default Admindashboard;
