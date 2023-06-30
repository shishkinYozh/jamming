
const spotifyToken = async (parseTokenRequest) => {
    const clientId = process.env.REACT_APP_SPOTIFY_ID;
    const clientSecret = process.env.REACT_APP_SPOTIFY_SECRET;
    const tokenUrl = "https://accounts.spotify.com/api/token";
    const grandType = "client_credentials";
    const bodyEndPoint = `grant_type=${grandType}&client_id=${clientId}&client_secret=${clientSecret}`;

    try {
        const response = await fetch(tokenUrl, {
            method: 'POST',
            headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
            body: bodyEndPoint
        });
        if(response.ok) {
            const jsonResponse = await response.json();
            parseTokenRequest(jsonResponse);
        }
    } catch(e) {
        console.log(e)
    }
}

const spotifySearch = async (token, tokenType, searchTrack, setTracks) => {
    const url = `https://api.spotify.com/v1/search?q=${searchTrack}&type=track&limit=10`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            Authorization : `${tokenType} ${token}`
        },
    })
    try {
        if(response.ok) {
            const result = await response.json();
            const songArray = result.tracks.items.map(track => {
                return {
                    title: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    id: track.id
                }
            });
            setTracks(songArray);
        }
    } catch(e) {
        console.log(e);
    }
}

export { spotifyToken, spotifySearch };