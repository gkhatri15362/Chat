export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer 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',
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://dusky-80.vercel.app',
        'X-Title': 'ChatGPT Clone'
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o',
        messages: [
          { role: 'user', content: message }
        ]
      })
    });

    const data = await response.json();

    if (data.error) {
      console.error('OpenRouter Error:', data.error);
      return res.status(500).json({ reply: `AI Error: ${data.error.message}` });
    }

    const reply = data.choices?.[0]?.message?.content || "No response from AI";
    res.status(200).json({ reply });
  } catch (err) {
    console.error('Fetch Failed:', err);
    res.status(500).json({ reply: "Server Error. Please try again." });
  }
}