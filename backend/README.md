# 🤖 Shivanshu's AI Assistant - RAG Chatbot

A witty, sarcastic, and genuinely helpful AI assistant trained on Shivanshu Mishra's portfolio. Built using RAG (Retrieval-Augmented Generation) with Groq's Llama 3.1 70B model.

## ✨ Features

- 🎯 **Smart Context Retrieval**: Uses RAG to fetch relevant information about Shivanshu
- 😄 **Personality**: Funny, sarcastic, but always helpful
- 🌐 **General Knowledge**: Can answer both personal and general AI/ML questions
- ⚡ **Fast**: Powered by Groq's lightning-fast inference
- 💰 **Free**: Uses Groq's generous free tier
- 🎨 **Beautiful UI**: Built with Streamlit

## 🚀 Quick Start

### 1. Clone or Download

```bash
cd "C:\Users\shiva\OneDrive\Desktop\Baba LLM"
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Get Your Free Groq API Key

1. Go to [https://console.groq.com/keys](https://console.groq.com/keys)
2. Sign up for a free account
3. Create a new API key
4. Copy the key

### 4. Set Up Environment Variables

Create a `.env` file in the project root:

```bash
# Copy the example file
copy .env.example .env
```

Then edit `.env` and add your API key:

```
GROQ_API_KEY=gsk_your_actual_api_key_here
```

### 5. Run the App

```bash
streamlit run app.py
```

The app will open in your browser at `http://localhost:8501`

## 📁 Project Structure

```
Baba LLM/
├── app.py                  # Main Streamlit application
├── rag_engine.py          # Core RAG logic (embedding, retrieval, LLM)
├── requirements.txt       # Python dependencies
├── .env                   # Your API keys (DO NOT commit this!)
├── .env.example          # Template for .env file
├── README.md             # This file
└── dataset/              # Knowledge base
    ├── about.md          # Personal info & education
    ├── skills.md         # Technical skills
    ├── projects.md       # Project details
    ├── experience.md     # Internship experience
    ├── interests_and_goals.md  # Career goals & interests
    └── faq.md            # Quick Q&A
```

## 🎯 How It Works

### RAG Architecture

1. **Document Loading**: Loads all markdown files from `dataset/` folder
2. **Embedding Creation**: Uses `sentence-transformers` to create vector embeddings
3. **Query Processing**: When you ask a question:
   - Your question is embedded
   - Top 2 most relevant documents are retrieved using cosine similarity
   - Context is injected into the prompt
4. **LLM Response**: Groq's Llama 3.1 70B generates a response with personality

### System Prompt

The AI has a carefully crafted personality defined in the system prompt:
- Witty and sarcastic but never mean
- Helpful despite the humor
- Uses tech humor and memes naturally
- Conversational and engaging

## 💬 Example Questions

**About Shivanshu:**
- "What's Shivanshu's background?"
- "Tell me about the CheckSmart project"
- "What internships has he done?"
- "What are his technical skills?"
- "Why did he choose AI?"

**General AI/ML:**
- "What is machine learning?"
- "Explain Computer Vision"
- "What is RAG?"
- "How does PyTorch work?"

## 🛠️ Customization

### Adjust Personality

Edit the `system_prompt` in `rag_engine.py` (line 89) to change the AI's personality.

### Change LLM Model

In `rag_engine.py`, line 107, you can change:
- `llama-3.1-70b-versatile` (default, best quality)
- `llama-3.1-8b-instant` (faster, good quality)
- `mixtral-8x7b-32768` (alternative)

### Adjust Temperature

In `rag_engine.py`, line 113:
- Higher temperature (0.8-1.0) = More creative/funny
- Lower temperature (0.3-0.5) = More factual/consistent

### Add More Context

Simply add more markdown files to the `dataset/` folder. The RAG engine will automatically load them!

## 🔧 Troubleshooting

### "GROQ_API_KEY not found"
- Make sure you created a `.env` file
- Check that it contains `GROQ_API_KEY=your_key_here`
- No spaces around the `=` sign

### "Connection Error"
- Check your internet connection
- Verify your API key is valid
- Make sure you haven't exceeded Groq's rate limits

### Slow First Load
- The embedding model downloads on first run (~80MB)
- Subsequent runs will be much faster

### Import Errors
- Make sure all dependencies are installed: `pip install -r requirements.txt`
- Use Python 3.8 or higher

## 📊 Performance

- **First Load**: ~10-15 seconds (downloading embedding model)
- **Subsequent Loads**: ~2-3 seconds
- **Query Response**: ~1-2 seconds (thanks to Groq's fast inference!)
- **Memory Usage**: ~500MB (embedding model)

## 🎨 Deployment Options

### Streamlit Cloud (Free)
1. Push to GitHub
2. Connect to Streamlit Cloud
3. Add `GROQ_API_KEY` as a secret
4. Deploy!

### Local Network
```bash
streamlit run app.py --server.address 0.0.0.0
```
Access from other devices on your network at `http://your-ip:8501`

## 🔒 Security Notes

- **NEVER** commit your `.env` file to GitHub
- `.env` is already in `.gitignore`
- Keep your API keys private
- Groq's free tier is rate-limited (protect against abuse)

## 📝 License

This project is for portfolio purposes. Feel free to use it as inspiration for your own RAG chatbot!

## 🙏 Credits

- **Groq**: Lightning-fast LLM inference
- **Sentence Transformers**: Embedding model
- **Streamlit**: Beautiful UI framework
- **Shivanshu Mishra**: The human behind this AI 😎

## 🐛 Issues or Questions?

The AI is still learning (aren't we all?). If something breaks, check:
1. API key is correct
2. Internet connection is stable
3. Dataset files are present
4. Dependencies are installed

---

**Built with ❤️ and a lot of ☕ by Shivanshu Mishra**
