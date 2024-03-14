import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import "./style.css";

import ContentWrapper from "../../contentWrapper/ContentWrapper.js";
import useFetch from "../../../hooks/useFetch.js";
// import Genres from "../../../components/genres/Genres";
// import CircleRating from "../../../components/circleRating/CircleRating";
import Img from "../../lazyLoadImage/Img.js";
import PosterFallback from "../../../assets/no-poster.png";
import { PlayIcon } from "../Playbtn.js";
import VideoPopup from "../../../components/videoPopup/VideoPopup";

const DetailsBanner = ({ video, crew }) => {

    console.log(crew);
    const { mediaType, id } = useParams();

    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };

    const { data, loading } = useFetch(`/${mediaType}/${id}`)
    console.log("Data", data);

    const { url } = useSelector((state) => state.homeSlice)
    const { genres } = useSelector((state) => state.homeSlice)

    const _genres = data?.genres?.map((g) => g.id)

    // const director = credits?.crew?.filter((f) => f.job === "Director" || []);
    // console.log(director);
    // const producer = credits?.crew?.filter((f) => f.job === "Producer" || []);
    // console.log(producer);
    // const writer = credits?.crew?.filter((f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer" || []);
    // console.log(writer);


    const director = crew?.filter((f) => f.job === "Director");
    const producer = crew?.filter((f) => f.job === "Producer");
    const writer = crew?.filter((f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer");


    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);
    // console.log(genres);
    return (
        <div className="detailsBanner">
            {!loading ? (
                <>
                    {!!data && (
                        <>
                            <div className="backdrop-img">
                                <Img src={url.backdrop + data.backdrop_path} />
                            </div>
                            <div className="opacity-layer"></div>
                            <ContentWrapper>
                                <div className="content">
                                    <div className="left">
                                        {data.poster_path ? (
                                            <Img className="posterImg" src={url.backdrop + data.poster_path} />
                                        ) : (
                                            <Img className="posterImg" src={PosterFallback} />
                                        )}
                                    </div>
                                    <div className="right">
                                        <div className="title">
                                            {`${data.name || data.title} (${dayjs(data.release_date).format("YYYY")})`}
                                        </div>
                                        <div className="subtitle">{data.tagline}</div>

                                        <div className="genress">
                                            {_genres?.map((g) => {
                                                if (!genres[g]?.name) return;
                                                return (
                                                    <div className="genre">
                                                        {genres[g]?.name}
                                                    </div>
                                                )
                                            })}
                                        </div>

                                        <div className="row">
                                            <div className={`rating ${data?.vote_average < 5 ? "flop" : data?.vote_average < 7 ? "average" : "hit"}`}>
                                                {data?.vote_average.toFixed(1)}/10
                                            </div>
                                            <div className="playbtn" onClick={() => {
                                                setShow(true);
                                                setVideoId(video?.key);
                                            }}>
                                                {/* <i class="bi bi-play-circle"></i> */}
                                                <PlayIcon />
                                                <span className="text">Watch Trailer</span>
                                            </div>
                                        </div>

                                        <div className="overview">
                                            <div className="heading">
                                                Overview
                                            </div>
                                            <div className="description">
                                                {data.overview}
                                            </div>
                                        </div>

                                        <div className="info">
                                            {data.status && (
                                                <div className="infoitem">
                                                    <span className="text bold">
                                                        Status:{" "}
                                                    </span>
                                                    <span className="text">
                                                        {data.status}
                                                    </span>
                                                </div>
                                            )}
                                            {data.runtime && (
                                                <div className="infoitem">
                                                    <span className="text bold">
                                                        Runtime:{" "}
                                                    </span>
                                                    <span className="text">
                                                        {(toHoursAndMinutes(data.runtime))}
                                                    </span>
                                                </div>
                                            )}
                                            {data.release_date && (
                                                <div className="infoitem">
                                                    <span className="text bold">
                                                        Release date:{" "}
                                                    </span>
                                                    <span className="text">
                                                        {dayjs(data.release_date).format("MMM D,YYYY")}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {director?.length > 0 && (
                                            <div className="info">
                                                <span className="text bold">
                                                    Director:{" "}
                                                </span>
                                                <span className="text">
                                                    {director?.map((d, i) => (
                                                        <span key={i}>
                                                            {d.name}
                                                            {i !== director.length - 1 && ", "}
                                                        </span>
                                                    ))}
                                                </span>
                                            </div>
                                        )}

                                        {writer?.length > 0 && (
                                            <div className="info">
                                                <span className="text bold">
                                                    Writer:{" "}
                                                </span>
                                                <span className="text">
                                                    {writer?.map((d, i) => (
                                                        <span key={i}>
                                                            {d.name}
                                                            {writer.length -
                                                                1 !==
                                                                i && ", "}
                                                        </span>
                                                    ))}
                                                </span>
                                            </div>
                                        )}

                                        {producer?.length > 0 && (
                                            <div className="info">
                                                <span className="text bold">
                                                    Producer:{" "}
                                                </span>
                                                <span className="text">
                                                    {producer?.map((d, i) => (
                                                        <span key={i}>
                                                            {d.name}
                                                            {producer.length -
                                                                1 !==
                                                                i && ", "}
                                                        </span>
                                                    ))}
                                                </span>
                                            </div>
                                        )}

                                        {data?.created_by?.length > 0 && (
                                            <div className="info">
                                                <span className="text bold">
                                                    Creator:{" "}
                                                </span>
                                                <span className="text">
                                                    {data?.created_by?.map(
                                                        (d, i) => (
                                                            <span key={i}>
                                                                {d.name}
                                                                {data
                                                                    ?.created_by
                                                                    .length -
                                                                    1 !==
                                                                    i && ", "}
                                                            </span>
                                                        )
                                                    )}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <VideoPopup
                                    show={show}
                                    setShow={setShow}
                                    videoId={videoId}
                                    setVideoId={setVideoId}
                                />
                            </ContentWrapper>
                        </>
                    )}
                </>
            ) : (
                <div className="detailsBannerSkeleton">
                    <ContentWrapper>
                        <div className="left skeleton"></div>
                        <div className="right">
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                        </div>
                    </ContentWrapper>
                </div>
            )
            }
        </div >
    );
};

export default DetailsBanner;
