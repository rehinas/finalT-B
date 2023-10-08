import React, { useEffect, useState } from 'react';
import Usernav from './Usernav';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Book = () => {
  const [movie, setMovie] = useState({});
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [email, setEmail] = useState('');
  const [numSeats, setNumSeats] = useState(1); // Default to booking one seat
  const [selectedDate, setSelectedDate] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`/api/movies/${id}`);
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleSeatSelection = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleNumSeatsChange = (e) => {
    const newNumSeats = parseInt(e.target.value, 10);
    setNumSeats(newNumSeats);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

    const handleBookTickets = async () => {
      try {
        if (numSeats === 0 || !email || !selectedDate) {
          alert('Please select seats, provide an email address, and select a date.');
          return;
        }
    
        if (isNaN(movie.availableSeats) || numSeats > movie.availableSeats) {
          alert('House full! Please select fewer seats.');
          return;
        }
    
        const response = await axios.post(`/api/movies/${id}`, {
          numSeats, // Send the number of selected seats as 'numSeats' instead of 'selectedSeats'
          email,
          date: selectedDate,
        });
    
        if (response.data.success) {
          alert('Booking successful! An email confirmation has been sent.');
        }
      } catch (error) {
        console.error('Error booking tickets:', error);
      }
    };
     

  return (
    <div>
      <div style={{ backgroundImage: "url(https://i.pinimg.com/736x/c5/9f/92/c59f926ba4076b2b549525661de57643.jpg)", height: "100vh", backgroundSize: "cover", backgroundAttachment: "fixed" }}>
        <Usernav />
        <div style={{ marginTop: "5%" }}>
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <img src={movie.image} className="img-fluid" alt="Movie Poster" />
              </div>
              <div className="col-md-6" style={{ color: "white" }}>
                <h2>{movie.movieName}</h2>
                <p><strong>Total Seats:</strong> {movie.seat}</p>
                <p><strong>Available seats:</strong> {movie.availableSeats}</p>
                <p><strong>Screen:</strong> {movie.screen}</p>
            
                <p><strong>TiketRate pre person:</strong> {movie.ticketRates}</p>
                <div>
                  <p><strong>Select Seats</strong></p>
                  {movie.seatAvailability?.map((seat) => (
                    <button
                      key={seat.id}
                      onClick={() => handleSeatSelection(seat.id)}
                      disabled={!seat.isAvailable || selectedSeats.includes(seat.id)}
                    >
                      {seat.id}
                    </button>
                  ))}
                </div>

                <div>
                  <p><strong>Email:</strong></p>
                  <input
                      type="email"
                      
                      id="email"
                      name="email"
                     
                      onChange={handleEmailChange}
                      required
                      style={{ background: "transparent", borderRadius: "0px", borderBottom: "1px solid white", marginTop: "5px", height: "40px",width:"40%",color:"white" }}
                    />
                </div>

                <div>
                  <p><strong>Number of Seats:</strong></p>
                  <input type="number" value={numSeats} onChange={handleNumSeatsChange} min="1" max={isNaN(movie.availableSeats) ? 1 : movie.availableSeats} style={{ background: "transparent", borderRadius: "0px", borderBottom: "1px solid white", marginTop: "5px", height: "40px",width:"40%",color:"white" }}/>
                </div>

                <div>
                  <p><strong>Select Date:</strong></p>
                  <input type="date" value={selectedDate} onChange={handleDateChange} style={{ background: "transparent", borderRadius: "0px", borderBottom: "1px solid white", marginTop: "5px", height: "40px",width:"40%",color:"white" }}/>
                </div>

                <button onClick={handleBookTickets}  className="btn btn-light w-40 mb-4 btn-block" style={{ background: "transparent", borderRadius: "0px", borderBottom: "1px solid white", marginTop: "10px", height: "40px",width:"40%",color:"white" }}>Book Tickets</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Book;






