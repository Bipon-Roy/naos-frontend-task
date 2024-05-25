import { useState } from "react";
import searchTrack from "./services/spotifyService";
import searchImages from "./services/unsplashService";

const App = () => {
    const [query, setQuery] = useState("");
    const [track, setTrack] = useState(null);
    const [images, setImages] = useState([]);
    const [trackError, setTrackError] = useState(false);
    const [imageError, setImageError] = useState(false);

    //search functionality
    const handleSearch = async (e) => {
        e.preventDefault();

        //reset previous values
        setTrack(null);
        setImages([]);
        setTrackError(false);
        setImageError(false);

        try {
            //setting track state value if exist
            const trackResult = await searchTrack(query);
            if (trackResult) {
                setTrack(trackResult);
                if (trackResult.preview_url) {
                    const audio = new Audio(trackResult.preview_url);
                    audio.play();
                }
            } else {
                setTrackError(true); //setting error state when no track was found
            }
        } catch (error) {
            setTrackError(true);
        }

        try {
            //setting images value if exist
            const imageResults = await searchImages(query);
            if (imageResults.length > 0) {
                setImages(imageResults);
            } else {
                setImageError(true);
            }
        } catch (error) {
            setImageError(true); //setting error state when no images were found
        }
    };

    return (
        //rendering the UI
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
            {/* header section e.g search field and button */}
            <header className="w-full max-w-2xl bg-white shadow-md rounded-lg p-4 mb-6">
                <h1 className="text-2xl font-bold mb-4 text-center">Music Search App</h1>
                <form
                    onSubmit={handleSearch}
                    className="flex flex-col sm:flex-row justify-center items-center gap-4"
                >
                    <input
                        required
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search for music..."
                        className="w-full sm:w-2/3 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400"
                    />
                    <button className="sm:w-auto w-full  px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600">
                        Search
                    </button>
                </form>
            </header>

            {/*conditionally rendering main content or error message */}
            <main
                className={`w-full max-w-2xl ${
                    track || images.length > 0 || trackError || imageError
                        ? "bg-white shadow-md"
                        : ""
                } rounded-lg p-4`}
            >
                {track ? (
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-2">
                            {track.name} by {track.artists[0].name}
                        </h2>
                        <audio controls src={track.preview_url} autoPlay>
                            Your browser does not support the audio element.
                        </audio>
                    </div>
                ) : (
                    trackError && (
                        <p className="text-red-500 text-center my-2 font-medium">
                            <span className="uppercase">Sorry!</span> No track was found, or an
                            error occurred.
                        </p>
                    )
                )}
                <div>
                    {images.length ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {images.map((image) => (
                                <img
                                    key={image.id}
                                    src={image.urls.small}
                                    alt={image.alt_description}
                                    className="w-full h-[220px] rounded-md shadow"
                                />
                            ))}
                        </div>
                    ) : (
                        imageError && (
                            <p className="text-red-500 text-center my-2 font-medium">
                                <span className="uppercase">Sorry!</span> No images were found, or
                                an error occurred.
                            </p>
                        )
                    )}
                    {images.length > 0 && (
                        <p className="mb-2 text-end font-semibold text-sm">
                            Total Images Found : {images.length}
                        </p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default App;
