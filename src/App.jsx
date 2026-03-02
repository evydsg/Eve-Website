import { Analytics } from "@vercel/analytics/react";
import Navbar from './components/Navbar'
import Hero from './components/Hero'

function App(){
  return (
    <div>
      <Navbar/>
      <Hero/>
      <Analytics />
    </div>
  )
}

export default App
