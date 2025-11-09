import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Call your Python backend (Flask API).
    // In production, set the BACKEND_URL environment variable in Vercel to your backend's base URL
    // (for example: https://my-backend.example.com). Locally it will fall back to http://localhost:5000
    const backendBase = process.env.BACKEND_URL || 'http://localhost:5000'
    const response = await fetch(`${backendBase.replace(/\/$/, '')}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question: message }),
    })

    if (!response.ok) {
      throw new Error(`Backend responded with ${response.status}`)
    }

    const data = await response.json()

    return NextResponse.json({
      message: data.answer,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Failed to get response from AI assistant' },
      { status: 500 }
    )
  }
}
