import React from "react";
import Track from "./Track";

function Tracklist(props) {

  const results = props.results.map(song => <Track track={song} onClick={props.onClick} key={song.id} origin={props.origin} />);

  return (
    <div className="">
        {results}
    </div>
  );
}

export default Tracklist;