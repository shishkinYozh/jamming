import TrackList from "../TrackList/TrackList";

function Playlist(props) {
    const {tracks, handleTrack, value, setValue} = props;

    return (
        <div>
            <input type="text" value={value} onChange={setValue}/>
                <TrackList tracks={tracks} handleTrack={handleTrack} deletable/>
            <button>Save Playlist</button>
        </div>
    )
}

export default Playlist;