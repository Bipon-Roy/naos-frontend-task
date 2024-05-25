import axios from "axios";

const CLIENT_ID = import.meta.env.VITE_Spotify_Client_Id;
const CLIENT_SECRET = import.meta.env.VITE_Spotify_Client_Secret;
const AUTH_URL = "https://accounts.spotify.com/api/token";
const SEARCH_URL = "https://api.spotify.com/v1/search";

let accessToken = "";

const getAccessToken = async () => {
    try {
        //send request to get access token
        const response = await axios.post(AUTH_URL, "grant_type=client_credentials", {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
            },
        });
        accessToken = response.data.access_token; //set the access token value
    } catch (error) {
        throw new Error("Failed to get access token");
    }
};

const searchTrack = async (query) => {
    if (!accessToken) {
        await getAccessToken(); // wait for a while to get access token
    }
    try {
        //fetch music
        const response = await axios.get(`${SEARCH_URL}?q=${query}&type=track`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const tracks = response.data.tracks.items;
        if (tracks.length > 0) {
            return tracks[0]; //returning the fist matched track with search query
        } else {
            return null; //return null if no track was found
        }
    } catch (error) {
        throw new Error("Failed to search for track");
    }
};

export default searchTrack;
