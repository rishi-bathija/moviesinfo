// ApiState.js:-

import React, { useState } from 'react';
import ApiContext from './ApiContext';
import { useEffect } from 'react';

const ApiState = (props) => {
  const [isLoading, setisLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const [isError, setisError] = useState({ show: false, msg: '' });
  const [query, setQuery] = useState('titanic');

  const API_URL = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${query}`;

  const API_URL_1 = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY_2}`;


  const getMovies = async (url) => {
    setisLoading(true); // Show loading state while fetching data
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      if (data.Response === 'True') {
        setMovie(data.Search);
        setisError({ show: false, msg: '' });
      } else {
        setMovie([]); // Reset movie state
        setisError({
          show: true,
          msg: data.Error,
        });
      }
    } catch (error) {
      console.log(error);
      setMovie([]); // Reset movie state
      setisError({
        show: true,
        msg: 'An error occurred while fetching data.',
      });
    } finally {
      setisLoading(false); // Set isLoading to false when the API call is done
    }
  };

  const getData = async (url) =>{
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
  }

  // useEffect(()=>{
  //   getData(API_URL_1);
  // },[]);

  useEffect(() => {
    // debouncing
    let timeOut = setTimeout(() => {
      getMovies(API_URL);
    }, 800);
    // cleanup in the below line
    return () => clearTimeout(timeOut);
  }, [query]);

  return (
    <ApiContext.Provider value={{ isLoading, isError, movie, setQuery, query, API_URL}}>
      {props.children}
    </ApiContext.Provider>
  );
};

export default ApiState;
