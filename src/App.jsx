import { useState } from 'react'
import ParentHomePage from './component/Home/ParentHomePage'
import AIAssistantPage from './component/AI/AIAssistantPage'
import Navbar from './Navbar.jsx'

function App() {
  return (
    <>
      <Navbar />
      <ParentHomePage />
      <AIAssistantPage />
    </>
  )
}

export default App
