import React, { useState } from 'react';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';

const AddMovie = (props) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(props.data);
  console.log("method",props.method);
  console.log("data",props.data)
  console.log("id",props.data._id)
   const[userToken,setuserToken]=useState(sessionStorage.getItem("usertoken"));
  const[userId,setuserId]=useState(sessionStorage.getItem("userId"))
  const[userRole,setuserRole]=useState(sessionStorage.getItem("userRole"))

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      if (name === 'category' || name === 'screen'||name==='time') {
       
        let updatedArray = [...formData[name]];

        if (checked) {
          updatedArray.push(value);
        } else {
          updatedArray = updatedArray.filter((item) => item !== value);
        }

        setFormData({
          ...formData,
          [name]: updatedArray,
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let data={
      userId:userId,
      token:userToken,
      useRole:userRole,
      movieName:formData.movieName,
      image:formData.image,
      category:formData.category,
      languages:formData.languages,
      description:formData.description,
      ticketRates:formData.ticketRates,
      seat:formData.seat,
      availableSeats:formData.availableSeats,
      screen:formData.screen,
      cast:formData.cast

    }
    console.log('Data sent to server:', data);
    
    console.log(data._id)
   

   
     if (props.method === 'post') {
      
      axios.post('/api/addmovie', data)
  
        .then((response) => {
          if (response.data.message === "post added successfully") {
            alert(response.data.message);
            navigate('/admin');
          } else {
            alert("failed to add movie");
            navigate('/admin');
          }
        })
        .catch((err) => {
          console.error('Movie addition error:', err);
          alert("Movie addition failed. Please try again.");
        });
    }
   if (props.method === 'put') {

  axios.put('/api/movies/'+formData._id,data)
    .then((response) => {
      if (response.data.message === "Updated successfully") {
        alert(response.data.message);
        navigate('/admin');
      } else {
        alert("Movie update failed");
      }
    })
    .catch((err) => {
      console.error('Movie update error:', err);
      alert("Movie update failed. Please try again.");
    });
}
 

  };
      


            //'http://localhost:4000/api/addmovie', data}
    //     .then((response) => {
    //       // console.log('Response Data:', response.data); 
    //       if(response.data.message==="post"){
    //         alert("post success")
    //       }
          
    //     })
    //     .catch((err) => {
    //       console.error('Movie addition error:', err);
    //       alert("Movie addition failed. Please try again.");
    //     });
    // }
  
   
    
  
  
  return (
    <div>

    <div className="container">
      
      <h2 className="mt-4 mb-4">Add New Movie</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Movie Name</label>
          <input
            type="text"
            name="movieName"
            value={formData.movieName}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Image</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Category</label>
          <div>
            <label className="mr-3">
              <input
                type="checkbox"
                name="category"
                value="UG"
                onChange={handleChange}
              />{' '}
              UG
            </label>
            <label className="mr-3">
              <input
                type="checkbox"
                name="category"
                value="PG"
                onChange={handleChange}
              />{' '}
              PG
            </label>
            <label className="mr-3">
              <input
                type="checkbox"
                name="category"
                value="A"
                onChange={handleChange}
              />{' '}
              A
            </label>
          </div>
        </div>
        <div className="form-group">
          <label>Languages</label>
          <select
            name="languages"
            value={formData.languages}
            onChange={handleChange}
            className="form-control"
            required
          >
            <option value="">Select Language</option>
            <option value="Malayalam">Malayalam</option>
            <option value="English">English</option>
            <option value="Tamil">Tamil</option>
          </select>
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Time</label>
          <div>
            <label className="mr-3">
              <input
                type="checkbox"
                name="time"
                value="11.30"
                onChange={handleChange}
              />{' '}
              11.30
            </label>
            <label className="mr-3">
              <input
                type="checkbox"
                name="time"
                value="1.30"
                onChange={handleChange}
              />{' '}
              1.30
            </label>
            <label className="mr-3">
              <input
                type="checkbox"
                name="time"
                value="4.30"
                onChange={handleChange}
              />{' '}
              4.30
            </label>
            <label className="mr-3">
              <input
                type="checkbox"
                name="time"
                value="9.30"
                onChange={handleChange}
              />{' '}
              9.30
            </label>
          </div>
        </div>
        <div className="form-group">
          <label>Ticket Rates</label>
          <input
            type="number"
            name="ticketRates"
            value={formData.ticketRates}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Seat</label>
          <input
            type="number"
            name="seat"
            value={formData.seat}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Available Seat</label>
          <input
            type="number"
            name="availableSeats"
            value={formData.availableSeats}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Cast</label>
          <input
            type="text"
            name="cast"
            value={formData.cast}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Screen</label>
          <div>
            <label className="mr-3">
              <input
                type="checkbox"
                name="screen"
                value="Screen 1"
                onChange={handleChange}
              />{' '}
              Screen 1
            </label>
            <label className="mr-3">
              <input
                type="checkbox"
                name="screen"
                value="Screen 2"
                onChange={handleChange}
              />{' '}
              Screen 2
            </label>
            <label className="mr-3">
              <input
                type="checkbox"
                name="screen"
                value="Screen 3"
                onChange={handleChange}
              />{' '}
              Screen 3
            </label>
          </div>
        </div>
        <button type="submit" className="btn btn-dark" >
          Submit
        </button>
      </form>
    </div>
    <div className="footer-spacer"  style={{marginTop:"15%"}}><footer className="bg-dark text-light mt-3 py-2 text-center"style={{position:"absolute",marginTop:"20%",width:"100%",}}>
        &copy; Atropia
      </footer></div> 
    </div>
  );
};

export default AddMovie;





