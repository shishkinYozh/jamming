import TrackList from "../TrackList/TrackList";

function Playlist(props) {
    const {tracks, handleTrack, plName, setPlName} = props;

    return (
        <div>
            <input type="text" value={plName} onChange={setPlName}/>
                <TrackList tracks={tracks} handleTrack={handleTrack} deletable/>
            <button>Save Playlist</button>
        </div>
    )
}

export default Playlist;