const clientId = "7ab319f2b04c4882ade7c4a4ef56322b";
const redirectUri = "http://localhost:5173/callback";
const authorizeEndpoint = "https://accounts.spotify.com/authorize";
const searchEndpoint = "https://api.spotify.com/v1/search";
const getProfileEndpoint = "https://api.spotify.com/v1/me";
const createPlaylistEndpoint = "https://api.spotify.com/v1/users";
const addTracksEndpoints = "https://api.spotify.com/v1/playlists";

const Spotify = {
  connectToSpotify() {
    let url = `${authorizeEndpoint}?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=playlist-modify-public`;
    window.location = url;
  },

  getAccessTokenFromCurrentPath() {
    let accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);

    if (accessTokenMatch) {
      return accessTokenMatch[1];
    }
  },

  getExpirationTimeFromCurrentPath() {
    let expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (expiresInMatch) {
      let expiresIn = Number(expiresInMatch[1]) * 1000;
      return expiresIn;
    }
  },

  async getUserId(token) {
    try {
      const response = await fetch(getProfileEndpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      const json = await response.json();
      return json;
    } catch (e) {
      console.log("Unable to get user profile: ", e);
    }
  },

  async search(query, token) {
    let queryString = `?q=${query}`;
    let searchType = "track";
    let url = `${searchEndpoint}${queryString}&type=${searchType}&market=FR`;

    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const json = await response.json();
        return json;
      } else {
        const body = await response.text();
        throw new Error(`Erreur HTTP : ${response.status} / ${body}`);
      }
    } catch (e) {
      console.log("Unable to find results: ", e);
    }
  },

  async createPlaylist(playlistName, userID, token) {
    let queryString = `${createPlaylistEndpoint}/${userID}/playlists`;
    let description = "Playlist created from Jammming app";
    try {
      const response = await fetch(queryString, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: playlistName, description: description }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      const json = await response.json();
      return json;
    } catch (e) {
      console.log("Unable to create the playlist: ", e);
    }
  },

  async savePlaylist(playlistID, uris, token) {
    let queryString = `${addTracksEndpoints}/${playlistID}/tracks`;
    try {
      const response = await fetch(queryString, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uris }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      const json = await response.json();
      return json;
    } catch (e) {
      console.log("Unable to add tracks to the playlist: ", e);
    }
  },
};

export default Spotify;
