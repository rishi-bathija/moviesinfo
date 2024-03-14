// // SingleMovie.js:-

// import React, {useState,useEffect} from 'react'
// import { NavLink, useParams } from 'react-router-dom'

// const SingleMovie = () => {
//     const {id} = useParams();

//     const [isLoading, setisLoading,error,setisError] = useState(true);
//     const [movie, setMovie] = useState("");
  
//     const API_URL = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&i=${id}`;
  
//     const getMovies = async (url) => {
//       setisLoading(true); // Show loading state while fetching data
//       try {
//         const response = await fetch(url);
//         const data = await response.json();
//         console.log(data);
//         if (data.Response === 'True') {
//           setMovie(data);
//           setisError({ show: false, msg: '' });
//         }
//       } catch (error) {
//         console.log(error);
//         setMovie([]); // Reset movie state
//         setisError({
//           show: true,
//           msg: 'An error occurred while fetching data.',
//         });
//       } finally {
//         setisLoading(false); // Set isLoading to false when the API call is done
//       }
//     };
  
//     useEffect(() => {
//       // debouncing
//       let timeOut = setTimeout(() => {
//         getMovies(API_URL);
//       }, 800);
//       // cleanup in the below line
//       return () => clearTimeout(timeOut);
//     }, [id]);

//     if(isLoading)
//     {
//         return(
//             <div className="movie-section">
//                 <div className="my-3 loading">Loading...</div>
//             </div>
//         );
//     }

//   return (
//     <div>
//       <section className='movie-section'>
//         <div className="movie-card">
//           <figure><img src={movie.Poster} alt="" /></figure>
//           <div className="card-content">
//             <p className="title">{movie.Title}</p>
//             <p className="card-text">{movie.Released}</p>
//             <p className="card-text">{movie.Genre}</p>
//             <p className="card-text">{movie.imdbRating}</p>
//             <p className="card-text">{movie.Country}</p>
//             <NavLink to="/home" className="back-btn">Go Back</NavLink>
//           </div>
//           </div>
//       </section>
//     </div>
//   )
// }

// export default SingleMovie


import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import './movies.css'
const SingleMovie = () => {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState({});
  const [isError, setIsError] = useState({ show: false, msg: '' });

  const API_URL = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&i=${id}`;

  const getMovieDetails = async (url) => {
    setIsLoading(true); // Show loading state while fetching data
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.Response === 'True') {
        setMovie(data);
        setIsError({ show: false, msg: '' });
      } else {
        setIsError({
          show: true,
          msg: data.Error,
        });
      }
    } catch (error) {
      console.log(error);
      setMovie({});
      setIsError({
        show: true,
        msg: 'An error occurred while fetching data.',
      });
    } finally {
      setIsLoading(false); // Set isLoading to false when the API call is done
    }
  };

  useEffect(() => {
    getMovieDetails(API_URL);
  }, [id]);

  if (isLoading) {
    return (
      <div className="movie-section">
        <div className="my-3 loading">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <section className="movie-section">
        {isError.show ? (
          <div className="alert alert-danger">{isError.msg}</div>
        ) : (
          <div className="movie-card">
            <figure>
              <img src={movie.Poster} alt={movie.Title} />
            </figure>
            <div className="card-content">
              <p className="title">{movie.Title}</p>
              <p className="card-text">Released: {movie.Released}</p>
              <p className="card-text">Genre: {movie.Genre}</p>
              <p className="card-text">IMDb Rating: {movie.imdbRating}</p>
              <p className="card-text">Country: {movie.Country}</p>
              <NavLink to="/" className="back-btn">
                Go Back
              </NavLink>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default SingleMovie;
