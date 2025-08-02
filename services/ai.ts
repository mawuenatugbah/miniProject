// services/ai.ts

export async function askQuestion({ question }: { question: string }) {
  const apiKey = 'AIzaSyCDbAY8kyklBJSqdug3wLq95ytgy1k7tak'; // Replace this with your actual Gemini API key

  const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const body = {
    contents: [
      {
        role: 'user',
        parts: [{ text: question }],
      },
    ],
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (!res.ok) {
    console.error('Gemini API error:', data);
    throw new Error(data.error?.message || 'Failed to get response from Gemini');
  }

  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  return text || 'No response';
}
