// chat/api/chat.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'No message provided' });
  }

  try {
    const apiRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer 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',
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://dusky-80.vercel.app',
        'X-Title': 'Chat AI Bot',
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o',
        messages: [{ role: 'user', content: message }],
      }),
    });

    const data = await apiRes.json();
    const reply = data?.choices?.[0]?.message?.content || 'No response from AI.';
    res.status(200).json({ response: reply });
  } catch (err) {
    res.status(500).json({ error: 'API Error: ' + err.message });
  }
}
