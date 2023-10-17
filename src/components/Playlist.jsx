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
      <div className="h-20 m-1">
        <h2>Create your own playlist</h2>
        <div className="">
          <input type="Text" value={props.name} onChange={props.onChange} placeholder="Enter your playlist name" className="text-xs rounded h-6 w-full"></input>
          <button onClick={props.onSave} className="bg-red-100 h-6 px-2 text-xs rounded hover:bg-sky-300 active:bg-violet-400">Save to Spotify</button>
        </div>
      </div>
      <div className="m-1">
        {playlist}
      </div>
    </>
  );
}

export default Playlist;