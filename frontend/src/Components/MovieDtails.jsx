// Import other necessary components and libraries
import React, { useEffect, useState } from 'react';
import Usernav from './Usernav';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Rating from './Rating'; // Import the Rating component

function MovieDetails() {
  const [movie, setMovie] = useState({});
  const [userRating, setUserRating] = useState(null);
  const { id } = useParams();
  const [averageRating, setAverageRating] = useState(null); // State to store the average rating

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`/api/movies/${id}`);
        setMovie(response.data);
        setUserRating(response.data.userRating);

        // Calculate the average rating
        const ratings = response.data.ratings || []; // Assuming ratings is an array of user ratings
        if (ratings.length > 0) {
          const totalRating = ratings.reduce((acc, rating) => acc + rating, 0);
          const avgRating = totalRating / ratings.length;
          setAverageRating(avgRating.toFixed(1)); // Round to 1 decimal place
        } else {
          setAverageRating('N/A'); // No ratings available
        }
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleUserRatingChange = async (newRating) => {
    try {
      // Update the user's rating
      const response = await axios.put(`/api/movies/${id}/rate`, { rating: newRating });
      setUserRating(response.data.userRating);

      // Update the average rating when the user adds a new rating
      const ratings = response.data.ratings || [];
      if (ratings.length > 0) {
        const totalRating = ratings.reduce((acc, rating) => acc + rating, 0);
        const avgRating = totalRating / ratings.length;
        setAverageRating(avgRating.toFixed(1));
      } else {
        setAverageRating('N/A');
      }
    } catch (error) {
      console.error('Error updating user rating:', error);
    }
  };

  return (
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
              <p><strong>Category:</strong> {movie.category}</p>
              <p><strong>Languages:</strong> {movie.languages}</p>
              <p><strong>Description:</strong> {movie.description}</p>
              <p><strong>Cast:</strong> {movie.cast}</p>
              <p><strong>Average Rating:</strong> {averageRating}</p> 
              <Rating
                initialValue={userRating || 0}
                readOnly={false}
                onRatingChange={handleUserRatingChange}
              />
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;











