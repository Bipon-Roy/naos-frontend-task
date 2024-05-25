import axios from "axios";

const ACCESS_KEY = import.meta.env.VITE_Unsplash_Access;
const SEARCH_URL = "https://api.unsplash.com/search/photos";

const searchImages = async (query) => {
    const response = await axios.get(`${SEARCH_URL}?query=${query}&client_id=${ACCESS_KEY}`);
    return response.data.results;
};

export default searchImages;
