import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Work from './components/Work.jsx'
import Videos from './components/Videos.jsx'
import Pinterest from './components/Pinterest.jsx'
import Contact from './components/Contact.jsx'
import SWE from './components/SWE.jsx'

function Home() {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <About/>
      <Skills/>
      <Work/>
      <Videos/>
      <Pinterest/>
      <Contact/>
    </div>
  )
}

function SwePage() {
  return (
    <div>
      <Navbar/>
      <SWE/>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/swe" element={<SwePage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App