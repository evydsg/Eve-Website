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
import F1learning from './components/F1learning.jsx'  // lowercase l

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

function F1Page() {
  return (
    <div>
      <Navbar/>
      <F1learning/>  {/* matches the import exactly */}
    </div>
  )
}

// ✅ Only ONE App function with ALL routes
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/swe" element={<SwePage/>}/>
        <Route path="/f1" element={<F1Page/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App