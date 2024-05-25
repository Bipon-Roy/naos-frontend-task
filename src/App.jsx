import { useState } from "react";
import searchTrack from "./services/spotifyService";
import searchImages from "./services/unsplashService";

const App = () => {
    const [query, setQuery] = useState("");
    const [track, setTrack] = useState(null);
    const [images, setImages] = useState([]);

    const handleSearch = async () => {
        const trackResult = await searchTrack(query);
        const imageResults = await searchImages(query);
        setTrack(trackResult);
        setImages(imageResults);

        if (trackResult && trackResult.preview_url) {
            const audio = new Audio(trackResult.preview_url);
            audio.play();
        }
    };
    console.log(track);
    console.log(images);
    return (
        <div className="max-w-3xl mx-auto">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for music..."
                className="w-full sm:w-2/3 p-2 border border-gray-300 rounded-md"
            />
            <button
                onClick={handleSearch}
                className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600"
            >
                Search
            </button>
        </div>
    );
};

export default App;
