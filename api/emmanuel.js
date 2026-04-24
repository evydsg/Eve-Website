export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' })
    }
  
    const { feeling } = req.body
  
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: `You are Emmanuel, a compassionate faith-based AI assistant for Eve's Portfolio. 
  
  When someone shares how they feel, always respond with EXACTLY this format and nothing else:
  
  VERSE: [A relevant Bible verse in quotes]
  REF: [Book Chapter:Verse]
  ENCOURAGEMENT: [2-3 sentences of warm, genuine encouragement]
  PRAYER: [A short heartfelt prayer of 2-3 sentences ending with Amen]
  
  Keep your tone warm, gentle, and faith-filled.`,
          messages: [{ role: 'user', content: `I'm feeling ${feeling}` }]
        })
      })
  
      const data = await response.json()
      const raw = data.content[0].text
  
      // Parse the response
      const verse         = raw.match(/VERSE:\s*(.+)/)?.[1]?.trim() || ''
      const ref           = raw.match(/REF:\s*(.+)/)?.[1]?.trim() || ''
      const encouragement = raw.match(/ENCOURAGEMENT:\s*([\s\S]+?)(?=PRAYER:|$)/)?.[1]?.trim() || ''
      const prayer        = raw.match(/PRAYER:\s*([\s\S]+)/)?.[1]?.trim() || ''
  
      return res.status(200).json({ verse, ref, encouragement, prayer })
  
    } catch (error) {
      console.error('Emmanuel error:', error)
      return res.status(500).json({ error: 'Something went wrong' })
    }
  }