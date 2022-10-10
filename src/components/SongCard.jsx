import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";

import PlayPause from "./PlayPause";
import {
    playPause,
    // playPause,
    setActiveSong,
    // setActiveSongs,
} from "../redux/features/playerSlice";
import { useDispatch } from "react-redux";

const SongCard = ({ song, isPlaying, activeSong, data, i }) => {
    const dispatch = useDispatch();
    const handlePauseClick = () => {
        dispatch(playPause(false));
    };

    const handlePlayClick = () => {
        dispatch(setActiveSong({ song, data, i }));
        dispatch(playPause(true));
    };

    return (
        <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
            <div className="relative w-full h-56 group">
                <div
                    className={`absolute inset-0 rounded-lg justify-center items-center bg-black bg-opacity-50 group-hover:flex ${
                        setActiveSong?.title === song.title
                            ? "flex bg-black bg-opacity-70"
                            : "hidden"
                    }`}
                >
                    <PlayPause
                        isPlaying={isPlaying}
                        activeSong={activeSong}
                        song={song}
                        handlePause={handlePauseClick}
                        handlePlay={handlePlayClick}
                    />
                </div>
                <img
                    src={song.images?.coverart}
                    alt="song_img"
                    className="rounded-lg"
                />
            </div>
            <div className="mt-4 flex flex-col">
                <p className="font-sora font-semibold text-lg text-white truncate">
                    <Link to={`/songs/${song?.key}`}>{song.title}</Link>
                </p>
                <p className="font-sora text-md text-gray-300 truncate mt-1">
                    <Link
                        to={
                            song.artists
                                ? `/artists/${song?.artists[0]?.adamid}`
                                : "/top-artists"
                        }
                    >
                        {song.subtitle}
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SongCard;
