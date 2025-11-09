# 🔑 How to Get Your FREE API Key

You need ONE of these (both are completely free!):

---

## Option 1: Groq (Recommended ⭐)

**Why Groq?**
- ⚡ Super fast (fastest inference)
- 💰 Completely free
- 🎯 No credit card needed
- 📊 14,400 requests/day (very generous!)

**Steps:**

1. **Go to Groq Console**
   - Visit: https://console.groq.com

2. **Sign Up**
   - Click "Sign Up"
   - Use your email (Google/GitHub login also works)
   - No credit card required!

3. **Create API Key**
   - After login, go to "API Keys" in the sidebar
   - Click "Create API Key"
   - Give it a name (e.g., "Portfolio Chatbot")
   - Copy the key (starts with `gsk_...`)

4. **Add to .env file**
   ```
   GROQ_API_KEY=gsk_your_actual_key_here
   ```

**That's it! Takes 2 minutes.**

---

## Option 2: Google Gemini

**Why Gemini?**
- 🆓 Completely free
- 🌐 Google's latest AI
- 📊 1500 requests/day (good for portfolio)
- 🔧 Easy to get

**Steps:**

1. **Go to Google AI Studio**
   - Visit: https://aistudio.google.com/app/apikey

2. **Sign In**
   - Use your Google account
   - No credit card needed!

3. **Create API Key**
   - Click "Get API Key"
   - Click "Create API Key"
   - Copy the key

4. **Add to .env file**
   ```
   GEMINI_API_KEY=your_gemini_key_here
   ```

**Done! Also takes 2 minutes.**

---

## Which Should You Choose?

| Feature | Groq | Gemini |
|---------|------|--------|
| Speed | ⚡⚡⚡ Super Fast | ⚡⚡ Fast |
| Free Tier | 14,400 req/day | 1,500 req/day |
| Signup | Email only | Google account |
| Best For | Portfolio sites | Also great! |

**Recommendation:** Start with **Groq** (faster and more generous limits), but both work great!

---

## After You Get the Key

1. **Copy `.env.example` to `.env`:**
   ```bash
   copy .env.example .env
   ```

2. **Edit `.env` and paste your key:**
   ```
   # If using Groq:
   GROQ_API_KEY=gsk_your_actual_key_here
   
   # OR if using Gemini:
   GEMINI_API_KEY=your_gemini_key_here
   ```

3. **Run the app:**
   ```bash
   streamlit run app.py
   ```

---

## Troubleshooting

### "API Key not found"
- Make sure `.env` file exists (not `.env.example`)
- Check there are no spaces around the `=` sign
- Key should be directly after `=`

### "Invalid API Key"
- Double-check you copied the full key
- Groq keys start with `gsk_`
- Try regenerating the key

### "Rate limit exceeded"
- You've hit the free tier limit
- Groq: 14,400 requests/day
- Gemini: 1,500 requests/day
- Wait 24 hours or use the other provider

---

**Both are 100% free and take 2 minutes to set up. No credit card ever required! 🎉**
