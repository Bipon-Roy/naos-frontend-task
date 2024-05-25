import axios from "axios";

const CLIENT_ID = import.meta.env.VITE_Spotify_Client_Id;
const CLIENT_SECRET = import.meta.env.VITE_Spotify_Client_Secret;
const AUTH_URL = "https://accounts.spotify.com/api/token";
const SEARCH_URL = "https://api.spotify.com/v1/search";

let accessToken = "";

const getAccessToken = async () => {
    const response = await axios.post(AUTH_URL, "grant_type=client_credentials", {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
        },
    });
    accessToken = response.data.access_token;
};

const searchTrack = async (query) => {
    if (!accessToken) {
        await getAccessToken();
    }
    const response = await axios.get(`${SEARCH_URL}?q=${query}&type=track`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response.data.tracks.items[0];
};

export default searchTrack;
