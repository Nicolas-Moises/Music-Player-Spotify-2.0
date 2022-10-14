import { useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';

import { useGetSongsBySearchQuery } from '../redux/services/shazamCore';
import { Error, Loader, SongCard } from '../components';

const Search = () => {
  const { searchTerm }  = useParams();

    const { activeSong, isPlaying } = useSelector((state) => state.player);

    const { data, isFetching, error} = useGetSongsBySearchQuery(searchTerm);
    const songs = data?.tracks?.hits?.map((song) => song.track);


    if(isFetching) return <Loader title="Carregando as músicas mais ouvidas" />
  
    if(error) return <Error />

    return (
        <div className='flex flex-col'>
            <h2 className='font-bold text-2xl text-white text-left mt-4 mb-10'>
              Resultados para {searchTerm}
            </h2>

            <div className='flex flex-wrap sm:justify-start justify-center gap-6'>
              {songs?.map((song, i) => (
                <SongCard 
                  key={song.key}
                  song={song}
                  isPlaying={isPlaying}
                  activeSong={activeSong}
                  data={data}
                  i={i}
                />
              ))}
            </div>
        </div>
    )
}
export default Search;