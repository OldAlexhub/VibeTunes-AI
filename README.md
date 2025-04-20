# 🎵 VibeTunes AI - React Frontend

Welcome to **VibeTunes AI** — an AI-powered playlist generator that creates personalized playlists based on your feelings, stories, and vibes.

Built with **React.js** + **Bootstrap 5**, this frontend connects to an AI Flask backend that searches through **over 90,000 songs** using **transformer embeddings** and **cosine similarity**, delivering the top 20 tracks that match your emotional input.

---

## 🛠️ Tech Stack

- **React.js** (Frontend)
- **Axios** (HTTP Client)
- **Bootstrap 5** (Responsive UI)
- **Flask** (Backend, separate repo)
- **Sentence Transformers** (AI Embedding Model)

---

## 🎯 Key Features

- 🎤 Submit your **emotion** and **story vibe** through an elegant form
- 🎶 AI finds the **best 20 matching songs** from a curated dataset of 90k+ tracks
- ⚡ Instant loading with a fun "Cooking your playlist..." message
- 🎧 **Clickable song titles** reveal a snippet of the lyrics or description
- 📱 Fully **mobile-responsive** with modern **Bootstrap** design
- 💬 Error handling and smooth UX interactions

---

## 📦 Getting Started

Follow these steps to run VibeTunes AI frontend locally:

### 1. Clone the repository

```bash
git clone https://github.com/OldAlexhub/VibeTunes-AI.git
cd VibeTunes-AI
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup Environment Variables

```bash
REACT_APP_PYTHON_CODE=http://localhost:5000
```

### 4. Start the React App

```bash
npm start
```

---

## 🌐 Backend Setup (Required)

**You need to have the Flask backend running separately.**

**_It handles:_**

- **_Embedding_** text and emotions
- **_Performing_** cosine similarity search
- Sending playlist recommendations

---

## 📋 Example API Request from Frontend

```bash
POST /hit_me
{
  "text": "A melody woven from the lessons of wanderers and wise men.",
  "emotion": "joy"
}
```

### Backend responds with a list of matching songs, each containing:

- Artist
- Song Title
- Genre
- Album
- Release info
- Snippet (text)

---

## ✨ Future Improvements

- 🎤 Voice input ("Speak your emotion")

- 🧠 Feedback learning (Like / Skip training the AI)

- 📜 Story-driven playlist journeys (Start ➔ Middle ➔ End)

- 📱 PWA (Progressive Web App) support

---

## 📜 License

This project is licensed under the MIT License.

---

## 🤝 Acknowledgments

### Special thanks to:

- Hugging Face Sentence Transformers
- Open Source Communities
- Bootstrap Creators

---

## 👨‍💻 Developed by

**Mohamed Gad**
Founder of **_OldAlexHub_**
Follow for more AI-driven innovation! 🚀
