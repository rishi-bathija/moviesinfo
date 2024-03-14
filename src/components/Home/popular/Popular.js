import React, { useState } from 'react'
import ContentWrapper from '../../contentWrapper/ContentWrapper'
import SwitchTabs from '../../switchtabs/SwitchTabs'
import useFetch from '../../../hooks/useFetch';
import Carousel from '../../carousel/Carousel';

const Popular = () => {
    const [endpoint, setEndpoint] = useState("movie");
    const { data, loading } = useFetch(`/${endpoint}/popular`)
    const [selectedFilter, setSelectedFilter] = useState("Movies");

    // const onDropdownChange = (event) => {
    //     setEndpoint(event.target.value);
    // }

    const onDropdownChange = (selectedEndpoint, selectedFilterText) => {
        setEndpoint(selectedEndpoint);
        setSelectedFilter(selectedFilterText);
    }

    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">What's Popular</span>
                {/* <SwitchTabs data={["Day","Week","Month"]} onTabChange={onTabChange}/> */}
                {/* <div className="filter">
                    <span className="filterTitle">Filter:</span>
                <select value={endpoint} onChange={onDropdownChange}>
                    <option value="day">Day</option>
                    <option value="week">Week</option>
                    <option value="month">Month</option>
                </select>
                </div> */}
                <div className="filter">
                    <span className="filterTitle">Filter:</span>
                    <div class="btn-group">
                        <button type="button" class="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            {selectedFilter}
                        </button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); onDropdownChange("movie", "Movies") }}>Movies</a></li>
                            <li><a class="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); onDropdownChange("tv", "TV Shows") }}>TV Shows</a></li>
                            {/* <li><a class="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); onDropdownChange("month", "Month") }}>Month</a></li>
                            <li><a class="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); onDropdownChange("year", "Year") }}>Year</a></li> */}
                        </ul>
                    </div>
                </div>
            </ContentWrapper>
            <Carousel data={data?.results} loading={loading} endpoint={endpoint}/>
        </div>
    )
}

export default Popular