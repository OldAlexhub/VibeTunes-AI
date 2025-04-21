import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [text, setText] = useState("");
  const [emotion, setEmotion] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [clickedIndex, setClickedIndex] = useState(null);
  const [showCookingMessage, setShowCookingMessage] = useState(false);
  const [backendMessage, setBackendMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setShowCookingMessage(true);
    setResults([]);
    setClickedIndex(null);
    setBackendMessage("");

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_PYTHON_CODE}/hit_me`,
        { text, emotion }
      );

      console.log("⚙️ Axios response:", response);

      // 1) Grab response.data
      let payload = response.data;

      // 2) If it's a string, sanitize and parse JSON
      if (typeof payload === "string") {
        // Replace any standalone NaN (e.g. "released":NaN) with null
        const sanitized = payload.replace(/\bNaN\b/g, "null");
        try {
          payload = JSON.parse(sanitized);
        } catch (err) {
          console.warn("Could not parse sanitized JSON:", err);
        }
      }

      // 3) Handle both raw-array and wrapped-object shapes
      if (Array.isArray(payload)) {
        setResults(payload);
      } else if (payload.status === "success" && Array.isArray(payload.data)) {
        setResults(payload.data);
      } else if (
        payload.status === "no_matches" ||
        payload.status === "error"
      ) {
        setBackendMessage(payload.message || "No matches found.");
      } else {
        setBackendMessage("Unexpected response format.");
        console.warn("Unexpected payload:", payload);
      }
    } catch (error) {
      console.error("⚠️ AxiosError:", error);

      if (error.response) {
        const { status, data } = error.response;
        if (status >= 500) {
          setBackendMessage("⚠️ Server error (500). Please try again later.");
        } else if (status >= 400) {
          let msg = "Problem with your request.";
          try {
            const json = typeof data === "string" ? JSON.parse(data) : data;
            msg = json.message || msg;
          } catch {}
          setBackendMessage(`⚠️ ${msg}`);
        }
      } else {
        setBackendMessage(
          "⚠️ Network error. Check that your backend is running."
        );
      }
    } finally {
      setLoading(false);
      setShowCookingMessage(false);
    }
  };

  const handleSongClick = (index) => {
    setClickedIndex(clickedIndex === index ? null : index);
  };

  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      {/* Header */}
      <header className="py-5 bg-primary text-white text-center shadow">
        <div className="container">
          <h1 className="display-4 fw-bold">🎵 AI Playlist Generator</h1>
          <p className="lead mt-3">
            Ever wanted a playlist that <em>feels</em> exactly like your mood or
            story? This AI-powered tool turns your emotions and words into
            personalized song recommendations; no more random playlists, just
            pure emotional connection to music. Simply describe your vibe, and
            let the magic happen.
          </p>
        </div>
      </header>

      {/* Main */}
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
                id="emotion"
                type="text"
                className="form-control form-control-lg"
                placeholder="e.g., joy, sadness..."
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
                id="text"
                className="form-control form-control-lg"
                rows="4"
                placeholder="e.g., A sunrise after a storm..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
              />
            </div>
            <div className="d-grid">
              <button
                className="btn btn-primary btn-lg shadow"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                    />
                    Cooking your playlist...
                  </>
                ) : (
                  "Get Recommendations"
                )}
              </button>
            </div>
          </form>

          {/* Cooking message */}
          {showCookingMessage && (
            <div className="text-center my-4">
              <div className="alert alert-info shadow-sm">
                🍳 We are cooking up your perfect playlist... Hold tight!
              </div>
            </div>
          )}

          {/* Backend message */}
          {backendMessage && (
            <div className="text-center my-4">
              <div className="alert alert-warning shadow-sm">
                {backendMessage}
              </div>
            </div>
          )}

          {/* Playlist Results */}
          {Array.isArray(results) && results.length > 0 && (
            <div className="mt-5">
              <h2 className="text-center mb-4 text-success fw-bold">
                🎶 Your AI‑Generated Playlist
              </h2>
              <div className="list-group shadow-sm">
                {results.map((item, idx) => (
                  <div key={idx} className="mb-3">
                    <div
                      className="list-group-item list-group-item-action d-flex align-items-center"
                      onClick={() => handleSongClick(idx)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="flex-shrink-0">
                        <span className="badge rounded-pill bg-primary me-3">
                          {idx + 1}
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
                            <strong>Released:</strong> {item.released ?? "N/A"}{" "}
                            yrs ago
                          </small>
                        </p>
                      </div>
                    </div>
                    {clickedIndex === idx && (
                      <div className="card shadow-sm p-3 mt-2">
                        <h6 className="fw-bold text-primary mb-2">
                          🎤 Lyrics Preview
                        </h6>
                        <p className="mb-0">{item.text}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-white text-center py-3 mt-auto shadow-sm">
        <small>
          © {new Date().getFullYear()} AI Playlist Generator | Crafted by
          Mohamed Gad
        </small>
      </footer>
    </div>
  );
}

export default App;
