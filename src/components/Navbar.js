import React, { useContext } from 'react'
import './styling.css'
import apiContext from '../context/api/ApiContext'
import { useNavigate } from 'react-router-dom'
const Navbar = () => {
  const context = useContext(apiContext);
  const {query, setQuery, API_URL} = context;
  const navigate = useNavigate();


  const handleChange = (e)=>{
    setQuery(e.target.value);
  }
 
 
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className='navbar-brand styling' href='/'>Moviesinfo</a>
            <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" value={query} onChange={handleChange} placeholder='Search a Movie'/>
                {/* <button className="btn btn-success" style={{border:'1px solid white'}}type="submit"  >Search</button> */}
            </form>
            </div>
        </nav>
    </div> 
  )
}

export default Navbar
