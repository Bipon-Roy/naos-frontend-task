import axios from "axios";

const ACCESS_KEY = import.meta.env.VITE_Unsplash_Access;
const SEARCH_URL = "https://api.unsplash.com/search/photos";

const searchImages = async (query) => {
    try {
        //fetch images
        const response = await axios.get(`${SEARCH_URL}?query=${query}&client_id=${ACCESS_KEY}`);
        const results = response.data.results;
        if (results.length > 0) {
            return results; //return images if exist
        } else {
            return []; //return empty array if no images were found
        }
    } catch (error) {
        throw new Error("Failed to search for images");
    }
};

export default searchImages;
