import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge'; // for fast response

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required.' }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'OpenAI API key not set.' }, { status: 500 });
    }

    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are Gambino, a helpful assistant for sports and forex tips. Answer concisely and helpfully.' },
          { role: 'user', content: message },
        ],
        max_tokens: 512,
        temperature: 0.7,
      }),
    });

    if (!openaiRes.ok) {
      const error = await openaiRes.json();
      return NextResponse.json({ error: error.error?.message || 'OpenAI API error.' }, { status: 500 });
    }

    const data = await openaiRes.json();
    const aiMessage = data.choices?.[0]?.message?.content?.trim() || '';
    return NextResponse.json({ message: aiMessage });
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
} 