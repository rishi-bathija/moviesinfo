import React, { useState } from 'react'
import ContentWrapper from '../../contentWrapper/ContentWrapper'
import SwitchTabs from '../../switchtabs/SwitchTabs'
import useFetch from '../../../hooks/useFetch';
import Carousel from '../../carousel/Carousel';

const Trending = () => {
    const [endpoint, setEndpoint] = useState("day");
    const { data, loading } = useFetch(`/trending/all/${endpoint}`)
    const [selectedFilter, setSelectedFilter] = useState("Day");

    // const onDropdownChange = (event) => {
    //     setEndpoint(event.target.value);
    // }

    const onDropdownChange = (selectedEndpoint, selectedFilterText) => {
        setEndpoint(selectedEndpoint);
        setSelectedFilter(selectedFilterText);
    }

    const onTabChange = (tab) => {
        if (tab === "Day") setEndpoint("day");
        else if (tab === "Week") setEndpoint("week");
        else setEndpoint("month");
    }

    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">Trending</span>
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
                            <li><a class="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); onDropdownChange("day", "Day") }}>Day</a></li>
                            <li><a class="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); onDropdownChange("week", "Week") }}>Week</a></li>
                            {/* <li><a class="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); onDropdownChange("month", "Month") }}>Month</a></li>
                            <li><a class="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); onDropdownChange("year", "Year") }}>Year</a></li> */}
                        </ul>
                    </div>
                </div>
            </ContentWrapper>
            <Carousel data={data?.results} loading={loading}/>
        </div>
    )
}

export default Trending