import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Work from './components/Work.jsx'
import Pinterest from './components/Pinterest.jsx'
import Contact from './components/Contact.jsx'
import SWE from './components/SWE.jsx'
import F1learning from './components/F1learning.jsx'  // lowercase l
import Staypositive from './components/Staypositive.jsx'
import Loader from './components/Loader'
import Mascot from './components/Mascot.jsx'
import Emmanuel from './components/Emmanuel'
// Lazy-loaded so Firebase only downloads when /todo is visited
const Todo = lazy(() => import('./components/Todo.jsx'))
 

function Home() {
  return (
    <div>
      <Loader />
      <Navbar/>
      <Hero/>
      <About/>
      <Work/>
      <Staypositive/>
      <Skills/>
      <Pinterest/>
      <Contact/>
      <Mascot />
      <Emmanuel/>

       {/* Floating Apple Music Button */}
      
       <a
        href="https://music.apple.com/profile/eveguenda"
        target="_blank"
        rel="noreferrer"
        className="music-float"
        title="My Apple Music"
      >
          🎵
      </a>
    
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
        <Route path="/todo" element={<Suspense fallback={null}><Todo/></Suspense>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App