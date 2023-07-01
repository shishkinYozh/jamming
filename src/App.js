import React, { useState } from "react";
import Playlist from "./components/Playlist/Playlist";
import Search from "./components/Search/Search";
import SearchResult from "./components/SearchResult/SearchResult";
import styles from "./App.module.css";
import { spotifySearch } from "./utils/spotifyFetch";


function App() {
    /* 
    states for the app
    such as playlist name, list of tracks, state for playlist tracks
    */

    const [tracks, setTracks] = useState([]);                   // list of tracks in a results (setter is using in parseSearchResponse)
    const [playlistTracks, setPlaylistTracks] = useState([]);   // list of tracks in a playlist (setter is using in delTrack and addTrack)
    const [searchValue, setSearchValue] = useState('');         // search value (setter is using in handleSetSearchValue handler)
    const [playlistName, setPlaylistName] = useState('');       // playlist name (setter is using in handlePlaylistName handler)
    const [token, setToken] = useState({});                 // token object with .access_token, .token_type, .expires_in fields


    /*
    methods and handlers for components
    such as adding tracks to the playlist, delete it from playlist
    */

    // Parse resaponse from spotify and set song to the state
    const parseSearchResponse = (songs) => {
        const songArray = songs.tracks.items.map(track => {
            return {
                title: track.name,
                artist: track.artists.map(artist => artist.name).join(" feat "),
                album: track.album.name,
                id: track.id
            }
        }).filter(track => {
            return playlistTracks.every(plTrack => plTrack.id !== track.id);
        })
        setTracks(songArray);
    };
    // Input Handlers
    const handlePlaylistName = (event) => {
        setPlaylistName(event.target.value);
    };
    const handleSearchValue = (event) => {       
        setSearchValue(event.target.value);
        return searchValue;
    };
    // Update token at spotify requests methods
    const updateToken = (data) => {
        
        setToken({
            access_token: data.access_token,
            token_type: data.token_type,
            expires_in: data.expires_in + Math.floor(Date.now()/1000)
        })
    };
    // Methods for track to add/delete at playlist
    const delTrack = (event) => {       
        if(playlistTracks.every(track => track.id !== event.target.id)){
            return
        }
        setPlaylistTracks(prev => [...prev.filter(track => track.id !== event.target.id)]);
    };
    const addTrack = (event) => {       
        if(playlistTracks.some(track => track.id === event.target.id)){
            return
        }
        setPlaylistTracks(prev => [tracks.filter(track => track.id === event.target.id)[0], ...prev]);
    };
    // Method to launch search
    const searchTrack = () => {
        if(searchValue) {
            spotifySearch(searchValue, parseSearchResponse, token, updateToken);
        } else {
        }
    };


    /*
    return the structure for index.js
    */

    return (
        <>
        <Search value={searchValue} setValue={handleSearchValue} searchTrack={searchTrack}  />
        <div className={styles.container}>
            <SearchResult tracks={tracks} handleTrack={addTrack} />
            <Playlist value={playlistName} setValue={handlePlaylistName} tracks={playlistTracks} handleTrack={delTrack} />
        </div>
        </>
    )
}

export default App;