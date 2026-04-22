import { useEffect } from 'react'

function Mascot() {

  useEffect(() => {
    const mascot = document.getElementById('mascot')

    const handleScroll = () => {
      const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight)
      const topPercent = 15 + scrollPercent * 70
      mascot.style.top = topPercent + '%'
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="mascot" id="mascot">
      <div className="mascot-character">
        <img
          src="/sp-logo.svg"
          alt="Stay Positive mascot"
          className="mascot-img"
        />
      </div>
      <div className="mascot-shadow"></div>
      <div className="mascot-bubble">Stay Positive! 🌿</div>
    </div>
  )
}

export default Mascot