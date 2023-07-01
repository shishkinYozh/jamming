
const askToken = async (token, updateToken) => {
    const clientId = process.env.REACT_APP_SPOTIFY_ID;
    const clientSecret = process.env.REACT_APP_SPOTIFY_SECRET;
    const tokenUrl = "https://accounts.spotify.com/api/token";
    const grandType = "client_credentials";
    const bodyEndPoint = `grant_type=${grandType}&client_id=${clientId}&client_secret=${clientSecret}`;
    const currentTime = Math.floor(Date.now()/1000);
    const expireTime = token.expires_in ? token.expires_in : 0;
    console.log(expireTime + " and " + currentTime)
    if(expireTime < currentTime) {
        try {
            const response = await fetch(tokenUrl, {
                method: 'POST',
                headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
                body: bodyEndPoint
            })
            if(response.ok) {
                const jsonResponse = await response.json();
                await updateToken(jsonResponse);
                return jsonResponse
            }
        } catch(e) {
            console.log(e)
        }
    } else {
        return token
    }
}

const spotifySearch = async (searchValue, parseSearchResponse, token, updateToken) => {
    const url = `https://api.spotify.com/v1/search?q=${searchValue}&type=track&limit=10`;
    askToken(token, updateToken)
    .then(async(token) => {
        try {
            console.log(token.access_token)
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Authorization : `${token.token_type} ${token.access_token}`
                },
            });
            if(response.ok) {
                const result = await response.json();
                console.log(result);
                parseSearchResponse(result);
            }
        } catch(e) {
            console.log(e)
        }      
    })
}

const spotifySavePlaylist = () => {
    
}

export { spotifySearch };