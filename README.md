# Portfolio Website with AI Chatbot

This is a full-stack portfolio website with an integrated AI chatbot powered by RAG (Retrieval-Augmented Generation).

## Project Structure

```
Protfolio UI/
├── app/                    # Next.js frontend pages
├── components/             # React components
├── backend/               # Python Flask backend
│   ├── flask_api.py       # Main Flask API
│   ├── rag_engine.py      # RAG engine implementation
│   ├── dataset/           # Knowledge base for chatbot
│   ├── requirements.txt   # Python dependencies
│   └── ...
├── public/                # Static assets
├── start_portfolio.ps1    # Startup script for both servers
└── package.json           # Frontend dependencies
```

## ✅ Verification

Before starting, verify the backend is set up correctly:
```bash
cd backend
python test_backend.py
```

If all tests pass, you're ready to go! See `VERIFY.md` for detailed testing steps.

## Quick Start

### Prerequisites
- Node.js (v18 or higher)
- Python (v3.8 or higher)
- pip

### Installation

1. **Install Frontend Dependencies**
   ```bash
   npm install
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

3. **Configure Environment Variables**
   - Copy `backend/.env.example` to `backend/.env`
   - Add your API keys (Google Gemini, OpenAI, etc.)

### Running the Application

#### Option 1: Using the Startup Script (Windows)
```powershell
./start_portfolio.ps1
```
This will start both the backend (port 5000) and frontend (port 3000) automatically.

#### Option 2: Manual Start

**Terminal 1 - Backend:**
```bash
cd backend
python flask_api.py
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### Access the Application
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000

## Deployment

When deploying, ensure:
1. Both frontend and backend are deployed together
2. Environment variables are configured in your hosting platform
3. The frontend is configured to point to the correct backend URL
4. Python dependencies from `backend/requirements.txt` are installed

## Features
- Modern portfolio UI built with Next.js and React
- AI-powered chatbot with RAG capabilities
- Real-time chat interface
- Responsive design

## Technologies
- **Frontend:** Next.js, React, TypeScript, Tailwind CSS
- **Backend:** Python, Flask, Google Gemini API
- **AI:** RAG (Retrieval-Augmented Generation)
