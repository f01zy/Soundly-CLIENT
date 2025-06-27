"use client"

import { getAllMusic } from "@/utils/music/getAllMusic.utils";
import { random } from "@/utils/random.utils";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ShufflePage: NextPage = () => {
  const router = useRouter()

  useEffect(() => {
    getAllMusic()
      .then(res => router.push("/tracks/" + res[random(0, res.length - 1)]._id))
  }, [])

  return <div className="w-full h-full flex items-center justify-center"><h3 className="text-base">loading</h3></div>
}

export default ShufflePage;