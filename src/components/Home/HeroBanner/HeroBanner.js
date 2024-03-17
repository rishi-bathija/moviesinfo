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
  const { url } = useSelector((state) => state.homeSlice);
  const { data, loading } = useFetch("/movie/upcoming");

  useEffect(() => {
    const bg = url.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
  }, [data]);

  const searchQueryHandler = () => {
    if (query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    searchQueryHandler(); // Call search handler when form is submitted
  };

  return (
    <div>
      <div className="heroBanner">
        {!loading && (
          <div className="backdrop-img">
            <Img src={background} alt="" />
          </div>
        )}
        <div className="opacity-layer"></div>
        <ContentWrapper>
          <div className="heroBannerContent">
            <span className="title">Welcome</span>
            <span className="subtitle">
              Millions of movies, TV shows and people to discover. Explore now.
            </span>
            <form onSubmit={handleSubmit}> {/* Add onSubmit event handler */}
              <div className="searchInput">
                <input
                  type="text"
                  placeholder="Search for a movie or tv show..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit">Search</button> {/* Change to type="submit" */}
              </div>
            </form>
          </div>
        </ContentWrapper>
      </div>
    </div>
  );
};


export default HeroBanner