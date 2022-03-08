
const LOAD_PLAYLIST = 'playlists/loadPlaylist';
const LOAD_PLAYLISTS = 'playlists/loadPlaylists';


// ---------------------------------------

export const loadPlaylist = (playlist) => {
    return {
        type: LOAD_PLAYLIST,
        playlist,
    }
}


export const loadPlaylists = (playlists) => {
    return {
        type: LOAD_PLAYLISTS,
        playlists,
    }
}


// ---------------------------------------

export const getPlaylist = (playlistId) => async(dispatch) => {
    const response = await fetch(`/api/playlists/${playlistId}`)

    if (response.ok) {
        const data = await response.json();
        dispatch(loadPlaylist(data))
    }
    return response;
}

export const getPlaylists = () => async(dispatch) => {
    const response = await fetch('/api/playlists')

    if (response.ok) {
        const data = await response.json();
        dispatch(loadPlaylists(data.playlists))
    }
    return response;
}

export const createPlaylist = (name, mood_id, user_id) => async(dispatch) => {
    const response = await fetch('/api/playlists/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name,
            mood_id,
            user_id
        })
    })

    if(response.ok) {
        const data = await response.json();
        dispatch(loadPlaylist(data.playlists))
        return data.playlists
    }
}

// ---------------------------------------
const initialState = { playlists: {} };
const playlistReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_PLAYLIST: {
            const playlists = { ...state.playlists, [action.playlist]: action.playlist}
            return {...state, playlists}
        }
        case LOAD_PLAYLISTS: {
            const playlists = {}
            action.playlists.forEach(playlist => {playlists[playlist.name] = playlist})
            return {...state, playlists}
        }
        default:
            return state
    }
}

export default playlistReducer;
