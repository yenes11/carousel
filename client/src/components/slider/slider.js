import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './slider.css'
import Form from '../form/form';
import leftArrow from './icons/left-arrow.svg';
import rightArrow from './icons/right-arrow.svg';

var counter = 0;
const api = axios.create({
    baseURL: 'http://localhost:1955/api/',
})


export default function Slider() {
    const [backendData, setBackendData] = useState([{}]);
    const [currentMedia, setCurrentMedia] = useState([{}]);
    const [slideIndex, setSlideIndex] = useState(0);
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        api.get('/playlist').then(
            res => {
                setBackendData(res.data);
                setCurrentMedia(res.data.data[slideIndex]);
                console.log(toggle);
                console.log(res.data);
            }
        );
    }, [toggle])

    function handleCallback(bool) {
        setTimeout(() => {
            setToggle(bool);
        }, 1);
    }

    function loop(duration) {
        var len = backendData.data.length - 1;
        setTimeout(() => {
            if (counter  !== len) {
                setSlideIndex(prevSlideIndex => prevSlideIndex + 1);
                counter++;
            }
            else {
                setSlideIndex(0);
                counter = 0;
            }
            loop(backendData.data[counter].duration * 1000);
        }, duration)
    }

    useEffect(() => {
        if (typeof backendData.data !== 'undefined') {
            loop(backendData.data[counter] * 1000);
        }
    }, [backendData.data])


    useEffect(() => {
        if (typeof backendData.data !== 'undefined') {
            setCurrentMedia(backendData.data[slideIndex])
        }
    }, [slideIndex])


    function moveNext() {
        if (slideIndex !== backendData.data.length - 1) {
            setSlideIndex(slideIndex + 1);
        }
        else {  
            setSlideIndex(0);
        }
    }

    function movePrev() {
        if (slideIndex !== 0) {
            setSlideIndex(slideIndex - 1);
        }
        else {
            setSlideIndex(backendData.data.length - 1)
        }
        if (typeof currentMedia !== 'undefined') {
            setCurrentMedia(backendData.data[slideIndex]);
        }
    }

    return (
        <div className='container-slider'>
            {(typeof currentMedia === 'undefined') ? (
                <p>loading</p>
            ) : (currentMedia.type === 'image') ? (
                <div>
                    <img src={currentMedia.url} alt='media' />
                </div>
            ) : (currentMedia.type === 'video') ? (
                <video width="100%" height="100%" autoPlay muted controls loop>
                    <source src={currentMedia.url} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            ) : (
                <p>asd</p>
            )
            }
            <button onClick={moveNext} className='btn-slide next'><img src={rightArrow} alt='next' /></button>
            <button onClick={movePrev} className='btn-slide prev'><img src={leftArrow} alt='prev' /></button>

            <Form parentCallback={(e) => handleCallback(e)} toggle={toggle} className='form' />
        </div>
    )
}
