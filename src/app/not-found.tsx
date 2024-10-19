"use client"

import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter()

  return <main className="w-full h-full flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-xl">There was a problem</h1>
      <p className="mt-2 text-base">Go <span className="!text-blue-500" onClick={() => router.back()}>back</span> to the previous page</p>
    </div>
  </main>
}

export default NotFound;