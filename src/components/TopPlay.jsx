import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";

import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";

import "swiper/css";
import "swiper/css/free-mode";

const TopChartCard = ({
    song,
    i,
    isPlaying,
    activeSong,
    handlePauseClick,
    handlePlayClick,
}) => (
    <div
        className="w-full flex flex-row items-center hover:bg-[#4c426e]
  py-1 px-4 rounded-lg cursor-pointer mb-1"
    >
        <h3 className="font-sora font-bold text-xs text-white mr-3">
            {i + 1}.
        </h3>
        <div className="flex-1 flex flex-row justify-between items-center">
            <img
                className="w-14 h-14 rounded-lg"
                src={song?.images?.coverart}
                alt={song?.title}
            />
            <div className="flex-1 flex flex-col justify-center mx-3 ">
                <Link to={`/songs/${song?.key}`}>
                    <p className="font-sora font-semibold text-white">
                        {song?.title}
                    </p>
                </Link>
                <Link to={`/artists/${song?.artists[0].adamid}`}>
                    <p className="text-sm font-sora text-gray-300 mt-1">
                        {song?.subtitle}
                    </p>
                </Link>
            </div>
        </div>
        <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
        />
    </div>
);

const TopPlay = () => {
    const dispatch = useDispatch();
    const { activeSong, isPlaying } = useSelector((state) => state.player);
    const { data } = useGetTopChartsQuery();
    const divRef = useRef(null);

    useEffect(() => {
        divRef.current.scrollIntoView({ behavior: "smooth" });
    });
    const topPlays = data?.slice(0, 5);

    const handlePauseClick = () => {
        dispatch(playPause(false));
    };

    const handlePlayClick = (song, i) => {
        dispatch(setActiveSong({ song, data, i }));
        dispatch(playPause(true));
    };

    return (
        <div
            ref={divRef}
            className="xl:ml-6 ml-0 xl:mb-0 mb-2 flex-1 xl:max-w-[400px] max-w-full flex"
        >
            <div className="w-full flex flex-col">
                <div className="flex flex-row justify-between items-center">
                    <h2 className="text-white font-bold font-sora text-lg">
                        Mais ouvidas
                    </h2>
                    <Link to="/top-charts">
                        <p className="text-gray-300 text-xs cursor-pointer">
                            Ver mais
                        </p>
                    </Link>
                </div>

                <div className="mt-4 flex flex-col gap-1">
                    {topPlays?.map((song, i) => (
                        <TopChartCard
                            key={song.key}
                            song={song}
                            i={i}
                            isPlaying={isPlaying}
                            activeSong={activeSong}
                            handlePauseClick={handlePauseClick}
                            handlePlayClick={() => handlePlayClick(song, i)}
                        />
                    ))}
                </div>
                <div className="w-full flex flex-col mt-4">
                    <div className="flex flex-row justify-between items-center">
                        <h2 className="text-white font-bold font-sora  text-lg">
                            Top Artistas
                        </h2>
                        <Link to="/top-artists">
                            <p className="text-gray-300 text-xs cursor-pointer">
                                Ver mais
                            </p>
                        </Link>
                    </div>

                    <Swiper
                        slidesPerView="auto"
                        spaceBetween={10}
                        freeMode
                        centeredSlides
                        centeredSlidesBounds
                        modules={[FreeMode]}
                        className="mt-4"
                    >
                        {topPlays?.map((song, i) => (
                            <SwiperSlide
                                key={song?.key}
                                style={{ width: "20%", height: "auto" }}
                                className="shadow-ld rounded-full animate-slideright"
                            >
                                <Link
                                    to={`/artists/${song?.artists[0].adamid}`}
                                >
                                    <img
                                        src={song?.images.background}
                                        alt="name"
                                        className="rounded-full w-full object-cover"
                                    />
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default TopPlay;
