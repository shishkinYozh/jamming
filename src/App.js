import React, { useEffect, useState } from "react";
import Playlist from "./components/Playlist/Playlist";
import Search from "./components/Search/Search";
import SearchResult from "./components/SearchResult/SearchResult";
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
    const [searchValue, setSearchValue] = useState('');


    /*
    methods and handlers for components
    such as adding tracks to the playlist, delete it from playlist
    */

    // Playlist name handler
    const handlePlName = (event) => {
        setPlName(event.target.value);
    };

    // Delete track from playlist
    const delTrack = (event) => {       
        if(plTracks.every(track => track.id !== event.target.id)){
            return
        }
        setPlTracks(prev => [...prev.filter(track => track.id !== event.target.id)]);
    };

    // Add track to playlist
    const addTrack = (event) => {       
        if(plTracks.some(track => track.id === event.target.id)){
            return
        }
        setPlTracks(prev => [tracks.filter(track => track.id === event.target.id)[0], ...prev]);
    };

    // Parse requested token from spotify
    const parseTokenRequest = (token) => {
        const currentSecs = Math.floor(Date.now()/1000);
        const response = token
        setToken(token.access_token);
        setTokenType(token.token_type);
        setTokenExpireTime(currentSecs + token.expires_in);
    };

    // Search value handler
    const handleSetSearchValue = (event) => {       
        setSearchValue(event.target.value);
    };

    // Check expiration date of token
    const isTokenExpired = () => {      
        const currentTime = Math.floor(Date.now()/1000);
        return currentTime > tokenExpireTime ? true : false;
    };

    // Request for a token and track
    const searchTrack = () => {       
        if(isTokenExpired && !token) {
            spotifyToken(parseTokenRequest);
        } else {
            spotifySearch(token,tokenType,searchValue,setTracks)
        }
    };


    /*
    Hook for request for a song when token is updated.
    ---------------- it's a wrong hook -----------------
    - we shouldn't make request without request button -
    ------- I'll sort out how to solve this later -------
    */

    useEffect(() => {
        if(token) {
            spotifySearch(token,tokenType,searchValue,setTracks)
        }
    },[token]);



    /*
    return the structure for index.js
    */

    return (
        <>
        <Search handleSearch={searchTrack} searchValue={searchValue} setValue={handleSetSearchValue} />
        <div className={styles.container}>
            <SearchResult tracks={tracks} handleTrack={addTrack}/>
            <Playlist 
                tracks={plTracks} 
                handleTrack={delTrack} 
                plName={plName} 
                setPlName={handlePlName} 
            />
        </div>
        </>
    )
}

export default App;