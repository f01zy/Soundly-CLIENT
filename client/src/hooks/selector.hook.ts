"use client"

import { RootState } from "@/store/store"
import { TypedUseSelectorHook, useSelector } from "react-redux"

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
export type useTypedSelectorType = typeof useTypedSelector