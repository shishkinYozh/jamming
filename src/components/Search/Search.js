const Search = ({searchValue, handleSearch, setValue}) => {
    return (
        <>
            <input type="text" value={searchValue} onChange={setValue} />
            <input type="button" value="Search" onClick={handleSearch}></input>
        </>
    )
}

export default Search;