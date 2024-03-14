import React, { useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch'
import { useParams } from 'react-router-dom'
import DetailsBanner from "./detailsBanner/DetailsBanner"
import { fetchDataFromApi } from '../../utils/api'
import Cast from './cast/Cast'
import VideosSection from './videosSection/VideosSection'
import Similar from './carousels/Similar'
import Recommendation from './carousels/Recommendation'


const Details = () => {
    const {mediaType, id} = useParams();

    const {data, loading} = useFetch(`/${mediaType}/${id}/videos`)
    console.log(data);
    const {credits, creditsLoading} = useFetch(`/${mediaType}/${id}/credits`)

    const [detailedCredits, setDetailedCredits] = useState([]);

    const fetchDetailedCredit = async (creditId) => {
        try {
            const detailedCreditData = await fetchDataFromApi(`/credit/${creditId}`);
            return detailedCreditData;
        } catch (error) {
            console.error("Error fetching detailed credit data:", error);
            return null;
        }
    };

    const fetchDetailedCredits = async (crew) => {
        const detailedCreditsData = await Promise.all(
            crew.map(async (member) => {
                const detailedCreditData = await fetchDetailedCredit(member.credit_id);
                return detailedCreditData;
            })
        );

        return detailedCreditsData;
    };
     
    useEffect(() => {
        const fetchAndSetDetailedCredits = async () => {
            if (credits?.crew) {
                const detailedCreditsData = await fetchDetailedCredits(credits.crew);
                setDetailedCredits(detailedCreditsData);
            }
        };

        fetchAndSetDetailedCredits();
    }, [credits]);

    return (
        <div>
            <DetailsBanner video={data?.results?.[0]} crew={detailedCredits}/>
            <Cast data={credits?.cast} loading={creditsLoading}/>
            <VideosSection data={data} loading={loading}/>
            <Similar mediaType={mediaType} id={id}/>
            <Recommendation mediaType={mediaType} id={id}/>
        </div>
    )
}

export default Details