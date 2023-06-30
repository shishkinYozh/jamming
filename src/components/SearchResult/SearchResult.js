import TrackList from "../TrackList/TrackList";

function SearchResult(props) {
    const {tracks, handleTrack} = props;

    return (
        <div>
            <h2>Results</h2>
            <TrackList tracks={tracks} handleTrack={handleTrack}/>
        </div>
    )
}

export default SearchResult;