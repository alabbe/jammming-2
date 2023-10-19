import React from "react";
import Tracklist from "./Tracklist";

function Playlist(props) {

  let playlist = "";
  // console.log("rendering Playlist", props);
  if (props.playlist.length > 0) {
    playlist = <Tracklist results={props.playlist} onClick={props.onRemove} origin={props.origin} />;
  } else {
    playlist = <span className="italic text-sm">Add a song to your playlist.</span>;
  }

  return (
    <>
      <div className="sm:h-28 m-1 text-center">
        <h2>Create your own playlist</h2>
        <div className="">
          <input type="Text" value={props.name} onChange={props.onChange} placeholder="Enter your playlist name" className="text-xs rounded h-8 w-full border-2 border-pink"></input>
          <button onClick={props.onSave} className="bg-orange h-8 px-5 text-sm rounded hover:bg-sky-300 active:bg-violet-400 my-2">Save to Spotify</button>
        </div>
      </div>
      <div className="m-1">
        {playlist}
      </div>
    </>
  );
}

export default Playlist;