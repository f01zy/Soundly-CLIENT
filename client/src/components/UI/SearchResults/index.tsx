"use client"

import styles from "@/components/UI/SearchResults/styles.module.scss"
import CardRow from "../CardRow";
import { useTypedSelector } from "@/hooks/selector.hook";

const SearchResults = () => {
  const { result: { music: array } } = useTypedSelector(selector => selector.searchSlice)

  return <div className={`${styles.results} ${array.length > 0 ? styles.open : styles.hidden}`}>
    {array.map(music => <CardRow {...music} />)}
  </div>
}

export default SearchResults;