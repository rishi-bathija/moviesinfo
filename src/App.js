// App.js:-

import React from 'react'
import Error from './components/Error'
import ApiState from './context/api/ApiState'
import { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import Movies from './components/Movies'
import Home from './components/Home/Home'
import { fetchDataFromApi } from './utils/api'
import { getApiConfiguration, getGenres } from './store/homeSlice'
import { useSelector, useDispatch } from 'react-redux'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Details from './components/details/Details'
import SearchResults from './components/searchResults/SearchResults'
import Explore from './components/explore/Explore'

const App = () => {

  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.homeSlice)

  useEffect(() => {
    fetchApiConfiguration();
    genresCall();
  }, [])

  const fetchApiConfiguration = () => {
    fetchDataFromApi("/configuration").then((res) => {
      // console.log(res);

      const url = {
        backdrop: res?.images.secure_base_url + "original",
        poster: res?.images.secure_base_url + "original",
        profile: res?.images.secure_base_url + "original",
      }
      dispatch(getApiConfiguration(url));
    });
  }

  // const genresCall = async () => {
  //   let promises = [];
  //   let endPoints = ["tv", "movie"];
  //   let allGenres = {};

  //   endPoints.forEach((url) => {
  //     promises.push(fetchDataFromApi(`/genre/${url}/list`));
  //   });

  //   const data = await Promise.all(promises);
  //   console.log(data);

  //   // destructuring genres from each array of movie and tv show
  //   data.map(({ genres }) => {
  //     return genres.map((item) => (allGenres[item.id] = item));
  //   });
  //   // console.log(allGenres);
  //   dispatch(getGenres(allGenres));
  // };


  const genresCall = async () => {
    try {
      const endPoints = ["tv", "movie"];
      let allGenres = {};

      for (const url of endPoints) {
        const response = await fetchDataFromApi(`/genre/${url}/list`);
        console.log(response);
        const { genres } = response;

        genres.forEach((item) => (allGenres[item.id] = item));
      }
      console.log("All Genres", allGenres);
      dispatch(getGenres(allGenres));
    } catch (error) {
      console.error('Error fetching genres:', error);
      // Handle error as needed
    }
  };

  return (
    <>
      {/* <div className="App">
      {url?.total_pages}
    </div> */}
      <ApiState>
        <Router>
          <div>
            {/* <Navbar /> */}
            <Header />
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route exact path='/movies' element={<Movies />} />
              {/* <Route path="/movie/:id" element={<SingleMovie />} /> */}
              <Route exact path='/:mediaType/:id' element={<Details />} />
              <Route exact path='/search/:query' element={<SearchResults />} />
              <Route path='/explore/:mediaType' element={<Explore />} />
              <Route path="*" element={<Error />} />

            </Routes>
            <Footer />
          </div>
        </Router>
      </ApiState>
    </>
  )
}

export default App