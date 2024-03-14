import React, { useState, useEffect } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import { useParams } from "react-router-dom"

import './style.css'
import ContentWrapper from "../contentWrapper/ContentWrapper"
import noResults from "../../assets/no-results.png"
import Spinner from "../spinner/Spinner"
import MovieCard from "../movieCard/MovieCard"


const SearchResults = () => {
    const [data, setData] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    const [loading, setLoading] = useState(false);
    const { query } = useParams();


    const apiKey = process.env.REACT_APP_API_KEY_2; // Replace with your TMDb API key
    const apiUrl = 'https://api.themoviedb.org/3'; // TMDb API base URL

    const fetchDataFromApi = async (endpoint, params = {}) => {
        const queryString = new URLSearchParams(params);
        const url = `${apiUrl}${endpoint}?api_key=${apiKey}&${queryString}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };

    useEffect(() => {
        setPageNum(1);
        const fetchData = async () => {
            try {
                const result = await fetchDataFromApi('/search/multi', { query, page: 1 });
                setData(result);
            } catch (error) {
                console.error('Error in fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [query])

    // const fetchInitialData = () => {
    //     setLoading(true);
    //     fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
    //         (res) => {
    //             setData(res);
    //             setPageNum((prev) => prev + 1);
    //             setLoading(false);
    //         }
    //     );
    // };

    // const fetchNextPageData = () => {
    //     fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
    //         (res) => {
    //             if (data?.results) {
    //                 setData({ ...data, results: [...data?.results, ...res.results], })
    //             }
    //             else {
    //                 setData(res);
    //             }
    //             setPageNum((prev) => prev + 1);
    //         }
    //     );
    // };

    const fetchNextPageData = async () => {
        try {
          const res = await fetchDataFromApi('/search/multi', { query, pageNum});
        //   ('/search/multi', { query, page: 1 })
          if (data?.results) {
            setData({ ...data, results: [...data?.results, ...res.results] });
          } else {
            setData(res);
          }
          setPageNum((prev) => prev + 1);
        } catch (error) {
          console.error('Error fetching next page data:', error);
        }
      };

    return (
        <div className="searchResultsPage">
            {loading && <Spinner initial={true} />}
            {!loading && (
                <ContentWrapper>
                    {data?.results?.length > 0 ? (
                        <>
                            <div className="pageTitle">
                                {`Search ${data.total_results > 1 ? "results" : "result"} of '${query}'`}</div>
                            <InfiniteScroll
                                className="content"
                                dataLength={data?.results?.length || []}
                                next={fetchNextPageData}
                                hasMore={pageNum <= data?.total_pages}
                                loader={<Spinner />}
                            >
                                {data?.results?.map((item, index) => {
                                    if (item.media_type === "person") return;
                                    return (
                                        <MovieCard data={item} fromSearch={true} key={index} />
                                    )
                                })}
                            </InfiniteScroll>
                        </>
                    ) : (
                        <span className="resultNotFound">
                            Sorry, Results not found
                        </span>
                    )}
                </ContentWrapper>
            )}
        </div>
    );
}
    ;
export default SearchResults
