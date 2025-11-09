# ✅ Backend Verification Checklist

## Quick Test (2 minutes)

### Step 1: Test Backend Standalone
```bash
cd backend
python test_backend.py
```

**Expected Output:**
```
✅ .env file found
✅ Dataset folder found with 6 markdown files
✅ GROQ_API_KEY loaded
✅ RAG initialized successfully
✅ All tests passed! Backend is ready to run.
```

### Step 2: Start Backend
```bash
python flask_api.py
```

**Expected Output:**
```
Initializing RAG engine...
Loading documents...
✅ Loaded 6 documents
✅ RAG engine ready!
🚀 Flask API Server Starting...
* Running on http://127.0.0.1:5000
* Debugger is active!
```

### Step 3: Test API (in another terminal)
```bash
curl http://localhost:5000/api/health
```

**Expected Response:**
```json
{"status":"healthy","rag_initialized":true}
```

### Step 4: Start Frontend (in another terminal)
```bash
# From Portfolio UI root folder
npm run dev
```

**Expected Output:**
```
▲ Next.js 15.x.x
- Local:        http://localhost:3000
✓ Ready in X.Xs
```

---

## 🎯 Everything Working If:

✅ Backend starts without errors  
✅ You see "✅ RAG engine ready!"  
✅ Frontend starts on port 3000  
✅ Can access http://localhost:3000  
✅ Chatbot responds to questions  

---

## 🚨 If Backend Fails:

1. **Check Python dependencies:**
   ```bash
   cd backend
   pip install -r requirements_api.txt
   ```

2. **Verify .env file exists:**
   ```bash
   cd backend
   dir .env
   ```

3. **Check dataset folder:**
   ```bash
   cd backend
   dir dataset
   ```

4. **Run the test script:**
   ```bash
   cd backend
   python test_backend.py
   ```

---

## 📦 Required Files in Backend:

- ✅ `flask_api.py`
- ✅ `simple_rag.py`
- ✅ `.env` (with GROQ_API_KEY)
- ✅ `requirements_api.txt`
- ✅ `dataset/` folder with .md files

All files are in place and tested! ✅
