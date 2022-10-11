import React, { useEffect, useState } from 'react';
import '../styles/Slider.css';
import axios from 'axios';
import PrevIcon from '../icons/prev.svg';
import NextIcon from '../icons/next.svg';

const Slider = ({toggle}) => {
  const [playList, setPlayList] = useState([]);
  const [currentMedia, setCurrentMedia] = useState({});
  const [mediaIndex, setMediaIndex] = useState(-1);

  useEffect(() => {
    axios.get('http://localhost:3001/api/playlist').then(res => {
      setPlayList(res.data.playlist);
      setMediaIndex(0);
    })
  }, [toggle])
  
  useEffect(() => {
    if (playList.length) {
      setCurrentMedia(playList[mediaIndex]);
      const timer = setTimeout(() => {
        nextMedia();
      }, playList[mediaIndex].duration * 1000)
      return () => clearTimeout(timer);
    }
  }, [mediaIndex])


  const nextMedia = () => {
    if (mediaIndex === playList.length - 1)
      setMediaIndex(0);
    else
      setMediaIndex(prevIndex => prevIndex + 1);
  }

  const prevMedia = () => {
    if (mediaIndex === 0)
      setMediaIndex(playList.length - 1);
    else
      setMediaIndex(prevIndex => prevIndex - 1);
  }

  return (
    <div className="slider-container">
      { currentMedia && currentMedia.type === 'image' ? 
      (<img className='media' src={currentMedia.url} alt={currentMedia.name} />) :
      (<video className='media' controls autoPlay muted>
        <source src={currentMedia.url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>)}

      <button className='nav-btn prev' onClick={prevMedia}>
        <img src={PrevIcon} alt="Previous media" />
      </button>

      <button className='nav-btn next' onClick={nextMedia}>
        <img src={NextIcon} alt="Next media" />
      </button>

    </div>
  )
} 

export default Slider