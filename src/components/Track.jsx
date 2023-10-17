import React from "react";

function Track(props) {

  let button = "";
  if (props.origin === "tracklist") {
    button="add";
  } else {
    button = "remove"
  }

  return (
    <div className="grid grids-col-1 grids-row-2 my-2 text-sm sm:text-base p-1 bg-pink">
      <div className="place-self-end">
        <button onClick={props.onClick} value={props.track.id} className="bg-yellow h-6 px-3 text-xs rounded hover:bg-sky-300 active:bg-violet-400">
          {button}
        </button>

      </div>
      <div className="place-self-start">
        <div><span className="font-light">Song's name:</span> {props.track.name}</div>
        <div><span className="font-light">Artist:</span> {props.track.artist}</div>
        <div><span className="font-light">Album:</span> {props.track.album}</div>
      </div>
    </div>
  );
}

export default Track;