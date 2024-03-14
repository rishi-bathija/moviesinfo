// import axios from "axios";

// const BASE_URL = "https://api.themoviedb.org/3";
// const TMDB_API = process.env.REACT_APP_API_KEY_2 ;

// const headers = {
//     Authorization: "bearer " + TMDB_TOKEN,
// };

// export const fetchDataFromApi = async (url, params) => {
//     try {
//         const { data } = await axios.get(BASE_URL + url, {
//             headers,
//             params,
//         });
//         return data;
//     } catch (err) {
//         console.log(err);
//         return err;
//     }
// };

const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_API = process.env.REACT_APP_API_KEY_2;

export const fetchDataFromApi = async (url, params) => {
  try {
    const queryString = new URLSearchParams({ ...params, api_key: TMDB_API }).toString();
    
    const response = await fetch(BASE_URL + url + "?" + queryString, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
