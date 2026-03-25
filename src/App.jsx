import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Work from './components/Work.jsx'
import Videos from './components/Videos.jsx'
import Pinterest from './components/Pinterest.jsx'
import Contact from './components/Contact.jsx'

function App(){
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

export default App
