const Search = ({searchTrack, value, setValue}) => {
    return (
        <>
            <input type="text" value={value} onChange={setValue} />
            <input type="button" value="Search" onClick={searchTrack}></input>
        </>
    )
}

export default Search;