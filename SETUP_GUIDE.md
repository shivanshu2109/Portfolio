# Portfolio Setup Guide

## ✅ Quick Setup (First Time Only)

### 1. Install Frontend Dependencies
```bash
npm install
```

### 2. Install Backend Dependencies
```bash
cd backend
pip install -r requirements_api.txt
cd ..
```

### 3. Configure API Key
Your backend is already configured with the Groq API key in `backend/.env`

---

## 🚀 Running the Application

### Method 1: Automatic Startup (Recommended)
```powershell
./start_portfolio.ps1
```
This will open two terminal windows:
- **Window 1:** Backend (Flask API on port 5000)
- **Window 2:** Frontend (Next.js on port 3000)

### Method 2: Manual Startup

**Terminal 1 - Start Backend:**
```bash
cd backend
python flask_api.py
```
Wait until you see "✅ RAG engine ready!" and "Debugger is active!"

**Terminal 2 - Start Frontend:**
```bash
npm run dev
```

---

## 🔍 Verify Everything Works

### 1. Check Backend Health
Open in browser: http://localhost:5000/api/health

Should see:
```json
{
  "status": "healthy",
  "rag_initialized": true
}
```

### 2. Check Frontend
Open in browser: http://localhost:3000

### 3. Test the Chatbot
- Go to http://localhost:3000
- Find the chatbot interface
- Ask a question like "Who is Shivanshu?"
- You should get a response from the AI

---

## ⚠️ Troubleshooting

### Backend won't start?
1. Make sure you're in the correct directory
2. Check if Python is installed: `python --version`
3. Install dependencies: `cd backend && pip install -r requirements_api.txt`
4. Check if `.env` file exists in `backend/` folder

### Frontend won't start?
1. Make sure Node.js is installed: `node --version`
2. Install dependencies: `npm install`
3. Check if port 3000 is available

### Chatbot not responding?
1. Make sure backend is running (check http://localhost:5000/api/health)
2. Check browser console for errors (F12)
3. Verify backend terminal shows "✅ RAG engine ready!"

---

## 📁 Project Structure
```
Protfolio UI/
├── backend/              ← Python Flask backend
│   ├── flask_api.py     ← Main API server
│   ├── simple_rag.py    ← AI engine
│   ├── dataset/         ← Knowledge base
│   ├── .env             ← API keys
│   └── requirements_api.txt
├── app/                 ← Next.js pages
├── components/          ← React components
└── start_portfolio.ps1  ← Easy startup script
```

---

## 🌐 URLs
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **Health Check:** http://localhost:5000/api/health
- **Chat Endpoint:** http://localhost:5000/api/chat (POST)
