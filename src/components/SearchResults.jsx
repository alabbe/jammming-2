import React from "react";
import Tracklist from "./Tracklist";

function SearchResults(props) {

    let content = "";
    if (props.results && props.results.length > 0) {
        content = <Tracklist results={props.results} onClick={props.onAdd} origin={props.origin} />;
    } else {
        content = <span className="italic text-sm">No results to display for now. Launch a new search!</span>;
    }

    return (
        <>
            <div className="sm:h-28 m-1">
                <h2>Search results</h2>
                <p className="italic text-xs opacity-40">Search a song by keyword, then add it to your custom playlist and enjoy on Spotify!</p>
            </div>
            <div className="m-1">
                {content}
            </div>
        </>
    );
}

export default SearchResults;