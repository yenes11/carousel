import React, { useState } from 'react';
import './form.css';
import axios from 'axios';
import drop from './icons/drop.svg';

const api = axios.create({
    baseURL: 'http://localhost:1955/api/',
})

export default function Form(props) {
    const [data, setData] = useState({
        name: '',
        url: '',
        duration: '',
        type: 'image'
    });

    // function getMedia() {
    //     api.get('/playlist').then(res => {
    //         console.log(res.data);
    //     })
    // }

    function handle(e) {
        const newData = { ...data };
        newData[e.target.id] = e.target.value;
        setData(newData);
    }

    function submit(e) {
        e.preventDefault();
        api.post('/add', {
            name: data.name,
            url: data.url,
            duration: parseInt(data.duration),
            type: data.type
        }).then(res => {
            
        })
    }


    function trigger() {
        props.parentCallback(!props.toggle);
    }

 

    return (
        <div className='container'>
            <form onSubmit={(e)=> submit(e)}>
                <label htmlFor='name'>Content Name</label>
                <input onChange={(e) => handle(e)} value={data.name} type='text' id='name'></input>

                <label htmlFor='url'>URL</label>
                <input onChange={(e) => handle(e)} value={data.url} type='text' id='url'></input>

                <label htmlFor='duration'>Duration (seconds)</label>
                <input onChange={(e) => handle(e)} value={data.duration} type='text' id='duration'></input>

                <label htmlFor='type'>Media Type</label>
                <select id='type' onChange={(e) => handle(e)} value={data.type}>
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                </select>
                <input className='add-btn' onClick={trigger} type='submit' value='Add'></input>
            </form>
            <button className='pull-btn'><img src={drop} alt='drop' /></button>
        </div>
    )
}
