import React from "react";

function SearchBar(props) {
  return (
    
    <form onSubmit={props.onSubmit} className="text-center">
        <div className="">
          <label htmlFor="search" className="text-base sm:text-lg">Search for a song, an artist... on spotify</label>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 py-6">
          <input type="text" id="search" onChange={props.onChange} className="sm:flex-auto rounded h-8"></input>
        <button type="submit" className="bg-orange h-8 px-7 text-base sm:text-lg rounded hover:bg-sky-300 active:bg-violet-400">Search</button>
        </div>
    </form>
  );
}

export default SearchBar;