import React from "react";

function SearchBar(props) {
  return (
    
    <form onSubmit={props.onSubmit} className="grid grid-cols-4 h-fit place-self-center gap-2 bg-slate-500">
        <div className="col-span-4">
          <label htmlFor="search">Search a song on spotify</label>
        </div>
        <div className="col-span-3 bg-green-400">
          <input type="text" id="search" onChange={props.onChange} className="w-full rounded h-8 "></input>
        </div>
        <div className="place-self-end">
        <button type="submit" className="bg-red-500 h-8 px-7 text-sm rounded hover:bg-sky-300 active:bg-violet-400">Search</button>
        </div>
    </form>
  );
}

export default SearchBar;