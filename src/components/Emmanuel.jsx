import { useState } from 'react'

function Emmanuel() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: null,
      isIntro: true
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const moods = [
    { emoji: '😰', label: 'Anxious' },
    { emoji: '😢', label: 'Sad' },
    { emoji: '🙏', label: 'Grateful' },
    { emoji: '😔', label: 'Lost' },
    { emoji: '✨', label: 'Hopeful' },
    { emoji: '😴', label: 'Tired' },
  ]

  const sendMessage = async (text) => {
    if (!text.trim()) return
    setInput('')
  
    setMessages(prev => [...prev, { type: 'user', text }])
    setIsTyping(true)
  
    console.log('1. Calling /api/emmanuel with:', text)
  
    try {
      const response = await fetch('/api/emmanuel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ feeling: text })
      })
  
      console.log('2. Response status:', response.status)
  
      const data = await response.json()
  
      console.log('3. Response data:', data)
  
      setMessages(prev => [...prev, {
        type: 'bot',
        verse: data.verse,
        ref: data.ref,
        encouragement: data.encouragement,
        prayer: data.prayer,
      }])
  
    } catch (error) {
      console.error('4. ERROR caught:', error.message)
      console.error('5. Full error:', error)
  
      setMessages(prev => [...prev, {
        type: 'bot',
        verse: '"Come to me, all you who are weary and burdened, and I will give you rest."',
        ref: 'Matthew 11:28',
        encouragement: "God sees exactly where you are right now. You are not alone in this.",
        prayer: "Lord, be close to this heart today. Wrap them in Your peace and love. Amen."
      }])
    }
  
    setIsTyping(false)
  }

  return (
    <>
      {/* Floating Button */}
      <button
        className="emmanuel-toggle"
        onClick={() => setIsOpen(!isOpen)}
        title="Talk to Emmanuel"
      >
        🙏
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="emmanuel-window">

          {/* Header */}
          <div className="emmanuel-header">
            <div className="emmanuel-header-logo">🕊️</div>
            <div className="emmanuel-header-info">
              <h4>Emmanuel</h4>
              <p>God with us — here to encourage you</p>
            </div>
            <button
              className="emmanuel-close"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="emmanuel-messages">
            {messages.map((msg, index) => (
              <div key={index}>
                {msg.type === 'user' && (
                  <div className="emmanuel-msg-user">
                    <div className="emmanuel-msg-user-text">{msg.text}</div>
                  </div>
                )}

                {msg.type === 'bot' && msg.isIntro && (
                  <div className="emmanuel-msg-bot">
                    <div className="emmanuel-avatar">🕊️</div>
                    <div className="emmanuel-msg-text">
                      Hi! 💚 How are you feeling today? Share what's on your heart and I'll find a Bible verse, an encouraging word, and a prayer just for you.
                      <div className="emmanuel-moods">
                        {moods.map((mood, i) => (
                          <button
                            key={i}
                            className="emmanuel-mood-chip"
                            onClick={() => sendMessage(mood.label)}
                          >
                            {mood.emoji} {mood.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {msg.type === 'bot' && !msg.isIntro && (
                  <div className="emmanuel-msg-bot">
                    <div className="emmanuel-avatar">🕊️</div>
                    <div className="emmanuel-msg-text">
                      <span className="emmanuel-verse">{msg.verse}</span>
                      <span className="emmanuel-ref">— {msg.ref}</span>
                      {msg.encouragement}
                      <div className="emmanuel-prayer">🙏 {msg.prayer}</div>
                      <div className="emmanuel-signoff">
                        In the meantime, Stay Positive 🌿
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="emmanuel-msg-bot">
                <div className="emmanuel-avatar">🕊️</div>
                <div className="emmanuel-typing">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="emmanuel-input-area">
            <input
              className="emmanuel-input"
              placeholder="How are you feeling today?"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
            />
            <button
              className="emmanuel-send"
              onClick={() => sendMessage(input)}
            >
              →
            </button>
          </div>

        </div>
      )}
    </>
  )
}

export default Emmanuel