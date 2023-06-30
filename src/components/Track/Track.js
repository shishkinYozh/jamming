import styles from "./Track.module.css";

function Track(props) {
    const title = props.title ? props.title : "Song Name";
    const artist = props.artist ? props.artist : "Artist or Singer";
    const album = props.album ? props.album : "Album";
    const id = props.id ? props.id : Math.floor(Math.random()*1000);
    return (
        <div className={styles.track} key={id}>
            <div className={styles.title}>{title}</div>
            <span className={styles.artist}>{artist} | {album}</span>
        </div>
    )
}

export default Track;