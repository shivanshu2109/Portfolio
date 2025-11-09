# 🔗 Portfolio Chatbot Integration Guide

This guide explains how to connect your Python RAG chatbot to your Next.js portfolio.

## Architecture

```
Next.js Frontend (Port 3000)
    ↓
Next.js API Route (/api/chat)
    ↓
Flask Backend (Port 5000)
    ↓
Python RAG Engine (simple_rag.py)
    ↓
Groq API (Llama 3.3 70B)
```

## Setup Steps

### 1. Install Flask Dependencies

```bash
cd "C:\Users\shiva\OneDrive\Desktop\Baba LLM"
pip install -r requirements_api.txt
```

### 2. Start the Flask Backend (Terminal 1)

```bash
python flask_api.py
```

You should see:
```
🚀 Flask API Server Starting...
API will be available at: http://localhost:5000
```

### 3. Start the Next.js Frontend (Terminal 2)

```bash
cd "Protfolio UI"
npm run dev
```

Or if you prefer pnpm:
```bash
cd "Protfolio UI"
pnpm dev
```

Your portfolio will be at: `http://localhost:3000`

### 4. Test the Integration

1. Open your portfolio at `http://localhost:3000`
2. Click the chat widget in the bottom-right corner
3. Ask questions like:
   - "What's Shivanshu's background?"
   - "Tell me about CheckSmart"
   - "What are his skills?"
   - "What is machine learning?"

## File Structure

```
Baba LLM/
├── flask_api.py              # Flask backend API
├── simple_rag.py             # RAG engine
├── .env                      # Your GROQ_API_KEY
├── requirements_api.txt      # Flask dependencies
│
└── Protfolio UI/
    ├── app/
    │   └── api/
    │       └── chat/
    │           └── route.ts  # Next.js API route
    └── components/
        └── chatbot-widget.tsx # Updated chat widget
```

## How It Works

1. **User sends message** in the chat widget
2. **Frontend calls** `/api/chat` (Next.js API route)
3. **Next.js API calls** `http://localhost:5000/api/chat` (Flask backend)
4. **Flask backend** uses `SimpleRAG` to:
   - Retrieve relevant context from your dataset
   - Send to Groq API with personality prompt
5. **Response flows back** through the chain
6. **User sees** witty, helpful response in chat widget

## Testing the Backend Separately

Test the Flask API directly:

```bash
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d "{\"question\": \"What's Shivanshu's background?\"}"
```

Or visit the health check:
```bash
curl http://localhost:5000/api/health
```

## Troubleshooting

### Backend not responding
- Make sure `flask_api.py` is running
- Check if port 5000 is available
- Verify `.env` has your GROQ_API_KEY

### Frontend can't connect to backend
- Ensure Flask is running on port 5000
- Check CORS is enabled (already configured)
- Look for errors in browser console (F12)

### API errors
- Check `flask_api.py` terminal for error messages
- Verify your Groq API key is valid
- Test with `python test_api.py`

## Production Deployment

### Option 1: Deploy Flask separately
- Deploy Flask API to Heroku, Railway, or Render
- Update the API URL in `Protfolio UI/app/api/chat/route.ts`

### Option 2: Serverless function
- Convert Flask API to Vercel serverless function
- Deploy everything on Vercel

### Environment Variables

For production, set these environment variables:
- `GROQ_API_KEY` - Your Groq API key
- `FLASK_ENV=production` - For Flask

## Features

✅ Real-time chat interface  
✅ Witty, sarcastic AI personality  
✅ Context-aware responses about Shivanshu  
✅ General AI/ML knowledge  
✅ Beautiful UI with animations  
✅ Auto-scroll to latest message  
✅ Loading indicators  
✅ Error handling  

---

**Built with ❤️ for Shivanshu's Portfolio**
