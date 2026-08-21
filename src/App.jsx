import { useState } from 'react'
import ParentMyApplicationPage from './component/MyApplication/ParentMyApplicationPage'
import AIAssistantPage from './component/AI/AIAssistantPage'
import Navbar from './Navbar.jsx'
import LandingPage from './component/Home/LandingPage.jsx'
import { BrowserRouter,Routes,Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={ <LandingPage /> } />  
        <Route path='/myapplications' element={ <ParentMyApplicationPage /> } />  
        <Route path='/ai-assistant' element={ <AIAssistantPage /> } />  
      </Routes>
    </BrowserRouter>
  )
}

export default App
