import React, { useEffect, useState } from 'react'
import './style.css'
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';
import { useSelector } from 'react-redux';
import ContentWrapper from '../../contentWrapper/ContentWrapper';
import Img from '../../lazyLoadImage/Img';

const HeroBanner = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { url } = useSelector((state)=>state.homeSlice)
  const {data, loading} = useFetch("/movie/upcoming");
  
  useEffect(()=>{
    // In order to generate a fully working image URL, you'll need 3 pieces of data. Those pieces are a base_url, a file_size and a file_path.
    
    // ?. :- optional chaining has been used
    const bg = url.backdrop + data?.results?.[Math.floor(Math.random()*20)]?.backdrop_path;
    setBackground(bg);

  },[data]);


  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };
  return (
    <div>
      <div className="heroBanner">
        {/* if loading state is false, only then display the image */}
        {!loading && <div className="backdrop-img">
          <Img src={background} alt="" />
        </div>}

        <div className="opacity-layer"></div>
        <ContentWrapper>
          <div className="heroBannerContent">
            <span className="title">Welcome</span>
            <span className="subtitle">
              Millions of movies, TV shows and people to discover.
              Explore now.
            </span>
            <div className="searchInput">
              <input type="text" placeholder='Search for a movie or tv show...' onChange={(e) => { setQuery(e.target.value) }} onKeyUp={searchQueryHandler} />
              <button>Search</button>
            </div>
          </div>
        </ContentWrapper>
      </div>
    </div>
  )
}

export default HeroBanner