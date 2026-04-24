export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { feeling } = req.body
  console.log('Feeling received:', feeling)

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5',
        max_tokens: 1000,
        system: `You are Emmanuel, a compassionate faith-based AI assistant for Stay Positive.

Respond with EXACTLY this format and nothing else:

VERSE: [A relevant Bible verse in quotes]
REF: [Book Chapter:Verse]
ENCOURAGEMENT: [2-3 sentences of warm encouragement]
PRAYER: [A short prayer ending with Amen]`,
        messages: [{ role: 'user', content: `I'm feeling ${feeling}` }]
      })
    })

    const data = await response.json()
    console.log('Anthropic raw response:', JSON.stringify(data))

    const raw = data?.content?.[0]?.text || ''
    console.log('Raw text:', raw)

    // Parse response
    const verse         = raw.match(/VERSE:\s*(.+)/)?.[1]?.trim() || ''
    const ref           = raw.match(/REF:\s*(.+)/)?.[1]?.trim() || ''
    const encouragement = raw.match(/ENCOURAGEMENT:\s*([\s\S]+?)(?=PRAYER:|$)/)?.[1]?.trim() || ''
    const prayer        = raw.match(/PRAYER:\s*([\s\S]+)/)?.[1]?.trim() || ''

    console.log('Parsed:', { verse, ref, encouragement, prayer })

    return res.status(200).json({ verse, ref, encouragement, prayer })

  } catch (error) {
    console.error('Emmanuel server error:', error)
    return res.status(500).json({ error: error.message })
  }
}