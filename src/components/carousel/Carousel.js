import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";

import "./style.css";


const Carousel = ({ title, data, loading, endpoint }) => {
  const carouselContainer = useRef();
  console.log(carouselContainer.current);
  const { url } = useSelector((state) => state.homeSlice)
  const { genres } = useSelector((state) => state.homeSlice)
  const navigate = useNavigate();

  const navigation = (dir) => {
    const container = carouselContainer.current;
    const scrollAmt = dir === "left" ? container.scrollLeft - (container.offsetWidth + 20) : container.scrollLeft + (container.offsetWidth + 20);
    container.scrollTo({
      left: scrollAmt,
      behaviour: "smooth",
    })
  }

  const skItems = () => {
    return (
      <div className="skeletonItem">
        <div className="posterBloack skeleton"></div>
        <div className="textBlock">
          <div className="title skeleton"></div>
          <div className="date skeleton"></div>
        </div>
      </div>
    )
  }
  return (
    <div className="carousel">
      <ContentWrapper>
        {title && <div classsName="carouselTitle" style={{
          fontSize: '24px',
          color: 'white',
          marginBottom: '20px',
          fontWeight: 'normal'
        }}>{title}</div>}

        <i class="fa-solid fa-arrow-left" onClick={() => navigation("left")}></i>
        <i class="fa-solid fa-arrow-right" onClick={() => navigation("right")}></i>

        {!loading ? (
          <div className="carouselItems" ref={carouselContainer}>
            {data?.map((item) => {
              const posterUrl = item.poster_path ? url.poster + item.poster_path : PosterFallback;
              return (
                <div key={item.id} className="carouselItem" onClick={() => navigate(`/${item.media_type || endpoint}/${item.id}`)}>
                  <div className="posterBlock">
                    <Img src={posterUrl} />
                    {/* {`header ${mobileMenu ? "mobileView" : ""} ${show}`} */}

                    {/* <div className="circleRating">{item.vote_average.toFixed(1)}/10</div> */}
                    <div className={`circleRating ${item.vote_average < 5 ? "flop" : item.vote_average < 7 ? "average" : "hit"}`}>
                      {item.vote_average.toFixed(1)}/10
                    </div>

                    <div className="genres">
                      {item.genre_ids.slice(0, 2)?.map((g) => {
                        if (!genres[g]?.name) return;
                        return (
                          <div className="genre">
                            {genres[g]?.name}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  <div className="textBlock">
                    <span className="title">
                      {item.title || item.name}
                    </span>
                    <span className="date">
                      {dayjs(item.release_date).format('MMM D, YYYY')}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="loadingSkeleton">
            {skItems()}
            {skItems()}
            {skItems()}
            {skItems()}
            {skItems()}
          </div>
        )}
      </ContentWrapper>
    </div>
  )
}

export default Carousel