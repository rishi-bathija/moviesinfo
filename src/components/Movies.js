// Movies.js:-

import React, { useContext } from 'react'
import apiContext from '../context/api/ApiContext'
import './movies.css'
import { Link } from 'react-router-dom'

const Movies = (props) => {
    const context = useContext(apiContext);
    const { movie, isError, isLoading } = context;

    if (isLoading) {
        return (
            <div className="movie-section">
                <div className="my-3 loading">Loading...</div>
            </div>
        );
    }
    return (
        <div>
            <div className="container my-3">
                {isError.show ? (
                    <div className="alert alert-danger">
                        {isError.msg}
                    </div>
                ) : (
                    <div className='movie-container'>
                        {movie.map((currMovie) => {
                            const { imdbID, Title, Poster } = currMovie;
                            return (
                                <Link to={`/movie/${imdbID}`} key={imdbID}>
                                    <div className="movie-item">
                                        <h2 className='movie-title' key={imdbID}>{Title ? Title.slice(0, 20) : ""}...</h2>
                                        <img className="movie-poster" src={Poster} />
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Movies