import React from 'react'           
import { GetStartedBtn } from '../components/Buttons'

function Home() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
        <h1>Welcom to task performing application</h1>
      <div className="mt-6">
        <GetStartedBtn onClick={() => alert("Welcome to your Task App! 🚀")} />
      </div>

      <h1 className="mt-6 text-2xl font-bold">This is Home Page</h1>
    </div>
  )
}

export default Home
