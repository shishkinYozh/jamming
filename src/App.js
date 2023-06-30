import React, { useEffect, useState } from "react";
import Playlist from "./components/Playlist/Playlist";
import TrackList from "./components/TrackList/TrackList";
import styles from "./App.module.css";
import {spotifyToken, spotifySearch} from "./utils/spotifyFetch";


function App() {
    /* 
    states for the app
    such as playlist name, list of tracks, state for playlist tracks
    */

    const [plName, setPlName] = useState('');
    const [tracks, setTracks] = useState([]);
    const [plTracks, setPlTracks] = useState([]);
    const [token, setToken] = useState('');
    const [tokenType, setTokenType] = useState('')
    const [tokenExpireTime, setTokenExpireTime] = useState(0);


    /*
    methods and handlers for components
    such as adding tracks to the playlist, delete it from playlist
    */

    const delTrack = (event) => {
        if(plTracks.every(track => track.id !== event.target.id)){
            return
        }
        setPlTracks(prev => [...prev.filter(track => track.id !== event.target.id)]);
    };

    const addTrack = (event) => {
        if(plTracks.some(track => track.id === event.target.id)){
            return
        }
        setPlTracks(prev => [tracks.filter(track => track.id === event.target.id)[0], ...prev]);
    };

    const handlePlName = ({ value }) => {
        setPlName(value);
    };

    const isTokenExpired = () => {
        const currentTime = Math.floor(Date.now()/1000);
        return currentTime > tokenExpireTime ? true : false;
    };


    useEffect(() => {
        if(isTokenExpired()) {
            spotifyToken(setToken,setTokenExpireTime,setTokenType)
        }
        setTimeout(() => {
            spotifySearch(token,tokenType,'enya',setTracks)
        },0);
        
    },[]);


    /*
    return the structure for index.js
    */

    return (
        <div className={styles.container}>
            <TrackList tracks={tracks} handleTrack={addTrack}/>
            <Playlist 
                tracks={plTracks} 
                handleTrack={delTrack} 
                plName={plName} 
                setPlName={handlePlName} 
            />
        </div>
    )
}

export default App;