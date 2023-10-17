import React from "react";

function SearchBar(props) {
  return (
    
    <form onSubmit={props.onSubmit} className="flex flex-col items-center sm:grid sm:grid-cols-4 sm:place-self-center gap-2">
        <div className="sm:col-span-4 text-center">
          <label htmlFor="search" className="text-base sm:text-lg">Search for a song, an artist... on spotify</label>
        </div>
        <div className="sm:col-span-3 bg-green-400">
          <input type="text" id="search" onChange={props.onChange} className="w-full rounded h-8"></input>
        </div>
        <div className="sm:place-self-end">
        <button type="submit" className="bg-orange h-8 px-7 text-base sm:text-lg rounded hover:bg-sky-300 active:bg-violet-400">Search</button>
        </div>
    </form>
  );
}

export default SearchBar;