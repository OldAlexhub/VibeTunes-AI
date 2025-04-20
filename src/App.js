import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [text, setText] = useState("");
  const [emotion, setEmotion] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [clickedSongText, setClickedSongText] = useState("");
  const [showCookingMessage, setShowCookingMessage] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setShowCookingMessage(true);
    setResults([]);
    setClickedSongText("");

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_PYTHON_CODE}/hit_me`,
        { text: text, emotion: emotion }
      );
      setResults(response.data);
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again!");
    } finally {
      setLoading(false);
      setShowCookingMessage(false);
    }
  };

  const handleSongClick = (item) => {
    setClickedSongText(item.text);
  };

  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      {/* Header */}
      <header className="py-5 bg-primary text-white text-center shadow">
        <div className="container">
          <h1 className="display-4 fw-bold">🎵 AI Playlist Generator</h1>
          <p className="lead mt-3">
            Ever wanted a playlist that <em>feels</em> exactly like your mood or
            story? This AI-powered tool searches through{" "}
            <strong>over 90,000 songs</strong> and handpicks the{" "}
            <strong>top 20 tracks</strong> that match your emotions and vibe. No
            more random playlists — just pure emotional connection to music.
            Simply describe your feeling, and let the magic happen.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow-1">
        <div className="container my-5">
          {/* Form */}
          <form onSubmit={handleSubmit} className="card shadow p-4 border-0">
            <h2 className="mb-4 text-center text-primary fw-semibold">
              Describe Your Mood
            </h2>

            <div className="mb-3">
              <label htmlFor="emotion" className="form-label fw-semibold">
                Emotion
              </label>
              <input
                type="text"
                className="form-control form-control-lg"
                id="emotion"
                placeholder="e.g., joy, sadness, excitement..."
                value={emotion}
                onChange={(e) => setEmotion(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="text" className="form-label fw-semibold">
                Describe the Story or Vibe
              </label>
              <textarea
                className="form-control form-control-lg"
                id="text"
                rows="4"
                placeholder="e.g., A melody woven from the lessons of wanderers and wise men...."
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary btn-lg shadow">
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Cooking your playlist...
                  </>
                ) : (
                  "Get Recommendations"
                )}
              </button>
            </div>
          </form>

          {/* Funny Message */}
          {showCookingMessage && (
            <div className="text-center my-4">
              <div className="alert alert-info shadow-sm" role="alert">
                🍳 We are cooking up your perfect playlist... Hold tight!
              </div>
            </div>
          )}

          {/* Playlist Results */}
          {results.length > 0 && (
            <div className="mt-5">
              <h2 className="text-center mb-4 text-success fw-bold">
                🎶 Your AI-Generated Playlist
              </h2>
              <div className="list-group shadow-sm">
                {results.map((item, index) => (
                  <div
                    className="list-group-item list-group-item-action d-flex align-items-center"
                    key={index}
                    onClick={() => handleSongClick(item)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="flex-shrink-0">
                      <span className="badge rounded-pill bg-primary me-3">
                        {index + 1}
                      </span>
                    </div>
                    <div className="flex-grow-1">
                      <h5 className="mb-1 fw-bold">{item.song}</h5>
                      <small className="text-muted">
                        {item["Artist(s)"]} • {item.Genre} • {item.Length}
                      </small>
                      <p className="mb-0 text-muted">
                        <small>
                          <strong>Album:</strong> {item.Album} |{" "}
                          <strong>Released:</strong> {item.released} yrs ago
                        </small>
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Clicked Song Text */}
              {clickedSongText && (
                <div className="card shadow p-4 mt-4">
                  <h4 className="fw-bold text-primary mb-3">🎤 Song Preview</h4>
                  <p className="lead">{clickedSongText}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-white text-center py-3 mt-auto shadow-sm">
        <small>
          © {new Date().getFullYear()} AI Playlist Generator | Crafted by
          Mohamed Gad
        </small>
      </footer>
    </div>
  );
}

export default App;
