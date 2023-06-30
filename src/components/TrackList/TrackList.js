import Track from '../Track/Track';

function TrackList(props) {
    const { tracks, handleTrack, deletable } = props;
    return (
        <div>
        {tracks.map(({title, artist, album, id}) => {
            return (
                <div key={id}>
                    <Track title={title} artist={artist} album={album} />
                    <button id={id} onClick={handleTrack}> {deletable ? " - " : " + " } </button>
                </div>
            )
        })}
        </div>
    )
}

export default TrackList;