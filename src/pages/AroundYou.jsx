import { useEffect, useState } from 'react';

import axios from 'axios';

import { useSelector } from 'react-redux';

import { Error, Loader, SongCard } from '../components';

const AroundYou = () => {

    const [country, setcountry] = useState('');
    const [loading, setloading] = useState(true);
    const { activeSong, isPlaying } = useSelector((state) => state.player);

    useEffect(() => {
      first
    
      return () => {
        second
      }
    }, [country])
    

    return (
        <div>
            AroundYou
        </div>
    )
}
export default AroundYou;
