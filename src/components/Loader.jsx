import { useEffect, useState } from 'react'

function Loader() {
  const [fadeOut, setFadeOut] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    // Start fading out after 2 seconds
    const fadeTimer = setTimeout(() => {
      setFadeOut(true)
    }, 2000)

    // Fully hide after fade completes (1 second fade)
    const hideTimer = setTimeout(() => {
      setHidden(true)
    }, 3000)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  if (hidden) return null

  return (
    <div className={`loader ${fadeOut ? 'loader--fade' : ''}`}>
      <div className="loader-content">
        <h1 className="loader-initials">
          EG<span className="loader-dot">.</span>
        </h1>
        <span>staypositive</span>
        <div className="loader-bar">
          <div className="loader-bar-fill"></div>
        </div>
      </div>
    </div>
  )
}

export default Loader;