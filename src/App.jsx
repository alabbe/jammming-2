import React, { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import Playlist from "./components/Playlist";
import Spotify from "./util/Spotify";
import Login from "./components/Login";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [playListName, setPlaylistName] = useState("");
  const [spotifyAccessToken, setSpotifyAccessToken] = useState(null);
  const [expirationTime, setExpirationTime] = useState(null);

  useEffect(() => {
    const token = Spotify.getAccessTokenFromCurrentPath();
    if (token) {
      setSpotifyAccessToken(token);
      setExpirationTime(
        Date.now() + Spotify.getExpirationTimeFromCurrentPath()
      );
    }
  }, []);

  useEffect(() => {
    if (searchQuery && spotifyAccessToken) {
      console.log("search query: ", searchQuery);
      let jsonTracks = Spotify.search(searchQuery, spotifyAccessToken);
      let searchResults;
      jsonTracks.then((json) => {
        if (json.tracks) {
          searchResults = json.tracks.items.map((track) => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri,
          }));
          setResults([...searchResults]);
        } else {
          setResults([]);
        }
      });
    }
  }, [searchQuery, spotifyAccessToken]);

  const isTimeout = () => {
    const currentTime = Date.now();
    if (expirationTime && expirationTime <= currentTime) {
      console.log("Timed out!");
      setSpotifyAccessToken(null);
      setExpirationTime(null);
      return true;
    } else {
      return false;
    }
  };

  const handleOnSubmitSearch = async (event) => {
    event.preventDefault();
    setSearchQuery(document.getElementById("search").value);
  };

  const handleOnClickAdd = (event) => {
    let track = results.find((item) => item.id === event.target.value);
    const updatedResults = results.filter((item) => item.id !== track.id);

    setPlaylist((prev) => {
      let searchArray = prev.filter((item) => item.id === track.id);
      if (searchArray.length === 0) {
        return [...prev, track];
      }
      return prev;
    });

    setResults(updatedResults);
  };

  const handleOnClickRemove = (event) => {
    let track = playlist.find((item) => item.id === event.target.value);
    setPlaylist((prev) => prev.filter((item) => item.id !== track.id));

    setResults((prev) => {
      let searchArray = prev.filter((item) => item.id === track.id);
      if (searchArray.length === 0) {
        return [...prev, track];
      }
      return prev;
    });
  };

  const handleOnChangePlaylistName = (event) => {
    setPlaylistName(event.target.value);
  };

  const handleAuthorizeSpotify = () => {
    Spotify.connectToSpotify();
  };

  const getTracksURI = () => {
    let uris = [];
    if (playlist) {
      playlist.forEach((item) => uris.push(item.uri));
    }
    return uris;
  };

  const handleOnSavePlaylist = async () => {
    if (playListName && !isTimeout()) {
      let response = Spotify.getUserId(spotifyAccessToken);
      response
        .then((json) => {
          if (json.id) {
            return Spotify.createPlaylist(
              playListName,
              json.id,
              spotifyAccessToken
            );
          }
        })
        .then((json) => {
          if (json.id) {
            let tracksUris = getTracksURI();
            if (tracksUris.length > 0) {
              return Spotify.savePlaylist(
                json.id,
                tracksUris,
                spotifyAccessToken
              );
            }
          }
        });
    }
  };

  return (
    <div className="h-screen">
      <div id="header" className="grid sm:grid-cols-12 grid-cols-6 py-6 bg-pink items-center">
        <div className="sm:col-span-2 col-span-1"></div>
        <div className="sm:col-span-8 col-span-4 sm:text-3xl text-xl font-bold text-center">
          <h1 className="sm:text-navy text-white">Jammming</h1>
        </div>
        <div className="sm:col-span-2 col-span-1">
          <Login
            isExpired={expirationTime}
            isAuthorized={spotifyAccessToken}
            onClick={handleAuthorizeSpotify}
          />
        </div>
      </div>
      <div id="hero" className="h-60 bg-yellow grid sm:grid-cols-12 grid-cols-6 place-content-center">
        <div className="col-span-1 sm:col-span-2"></div>
        <div className="col-span-4 sm:col-span-8">
          <SearchBar onSubmit={handleOnSubmitSearch} />
        </div>
        <div className="col-span-1 sm:col-span-2"></div>
      </div>
      <div id="results" className="grid grid-cols-4 sm:grid-cols-12 sm:h-full gap-3 py-8 px-2">
        <div className="col-span-1 sm:col-span-2"></div>
        <div className="col-span-4 sm:col-span-4 bg-white">
          <SearchResults
            results={results}
            onAdd={handleOnClickAdd}
            origin="tracklist"
          />
        </div>
        <div className="col-span-4 sm:col-span-4 bg-white">
          <Playlist
            playlist={playlist}
            onRemove={handleOnClickRemove}
            onChange={handleOnChangePlaylistName}
            onSave={handleOnSavePlaylist}
            origin="playlist"
            name={playListName}
          />
        </div>
        <div className="col-span-1 sm:col-span-2"></div>
      </div>
    </div>
  );
}

export default App;
