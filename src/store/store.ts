import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userSlice from './user/user.slice'
import siteSlice from './site/site.slice'
import alertSlice from './alert/alert.slice'
import musicSlice from './music/music.slice'
import searchSlice from './search/search.slice'
import playlistSlice from './playlist/playlist.slice'

const reducers = combineReducers({ userSlice, siteSlice, alertSlice, musicSlice, searchSlice, playlistSlice })

export const store = configureStore({
  reducer: reducers
})

export type RootState = ReturnType<typeof store["getState"]>;
export type AppDispatch = typeof store.dispatch;