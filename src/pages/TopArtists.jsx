
import { useGetTopChartsQuery } from '../redux/services/shazamCore';
import { ArtistCard, Loader, Error } from '../components';

const TopArtists = () => {
    const { data, isFetching, error} = useGetTopChartsQuery();


    if(isFetching) return <Loader title="Carregando os artistas mais procurados" />
  
    if(error) return <Error />

    return (
        <div className='flex flex-col'>
            <h2 className='font-bold text-2xl text-white text-left mt-4 mb-10'>
              Top Artistas
            </h2>

            <div className='flex flex-wrap sm:justify-start justify-center gap-6'>
              {data?.map((track) => (
                <ArtistCard 
                  key={track.key}
                  track={track}
                />
              ))}
            </div>
        </div>
    )
}
export default TopArtists;