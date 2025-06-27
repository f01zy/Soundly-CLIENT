"use client"

import { IconType } from "react-icons/lib"
import { FaItunesNote } from "react-icons/fa6";
import { IoMdAlbums } from "react-icons/io";
import { IoHome } from "react-icons/io5";
import { MdArtTrack } from "react-icons/md";

export const browseMusic: [IconType, string, string][] = [
  [IoHome, "Home", "/"],
  [IoMdAlbums, "Albums", "/albums"],
  [MdArtTrack, "Tracks", '/tracks'],
  [FaItunesNote, "Genres", "/genres"]
]

export const libraryLinks: [string, string][] = [
  ["/library/recent", "Recent Played"],
  ["/library/favorite", "Favorite Tracks"],
  ["/library/charts", "Charts"],
  ["/library/radio", "Radio"]
]

type MODE = "production" | "development"

export const MODE: MODE = "development"
export const MODE_URLS = {
  production: "",
  development: "localhost:5000"
}
export const SERVER_URL = "http://" + MODE_URLS[MODE]
