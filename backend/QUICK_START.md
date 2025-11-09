# 🚀 Quick Start Guide

## Easiest Way (One Click!)

Just double-click this file:
```
start_portfolio.ps1
```

This will automatically:
1. ✅ Start Flask backend (Port 5000)
2. ✅ Start Next.js frontend (Port 3000)
3. ✅ Open both in separate windows

Then open your browser to: **http://localhost:3000**

---

## Manual Way (Two Terminals)

### Terminal 1 - Backend
```bash
cd "C:\Users\shiva\OneDrive\Desktop\Baba LLM"
python flask_api.py
```

### Terminal 2 - Frontend
```bash
cd "C:\Users\shiva\OneDrive\Desktop\Baba LLM\Protfolio UI"
npm run dev
```

---

## Test the Chatbot

1. Open **http://localhost:3000**
2. Click the **chat bubble** in the bottom-right corner
3. Try these questions:
   - "What's your name?"
   - "Tell me about CheckSmart"
   - "What are your skills?"
   - "What is machine learning?"

---

## Troubleshooting

### "Port 5000 is already in use"
Close any other programs using port 5000, or change the port in `flask_api.py`

### "Cannot connect to backend"
Make sure Flask (Terminal 1) is running and you see:
```
✅ RAG engine ready!
🚀 Flask API Server Starting...
```

### Chat shows error message
Check that your `.env` file has the `GROQ_API_KEY`

---

## What You Built 🎉

✅ Full-stack AI chatbot  
✅ Python RAG backend with Groq  
✅ Next.js React frontend  
✅ Witty, sarcastic personality  
✅ Context-aware about you  
✅ Beautiful animated UI  

**Congratulations! Your portfolio now has an AI assistant!** 🤖
