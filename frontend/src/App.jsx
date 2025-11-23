import React, { useState } from "react";
import "./index.css";
import { createShortLink } from "./api";

export default function App() {
  const [target, setTarget] = useState("");
  const [shortUrl, setShortUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = async (e) => {
    e?.preventDefault();
    setError(null);

    if (!target.trim()) {
      setError("Please paste a URL to shorten.");
      return;
    }

    setLoading(true);
    try {
      const res = await createShortLink(target.trim());
      setShortUrl(res.shortUrl || `${window.location.origin}/${res.data?.shortCode}`);
      setTarget("");
    } catch (err) {
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      
      <header className="topbar">
        <div className="logo">URL shortener</div>
      </header>

     
      <section className="hero">
        <div className="hero-inner">
          <h1>Build stronger digital connections</h1>
          <p className="lead">
            Use our URL shortener to engage your audience and connect them to the right information.
          </p>

          
          <div className="card shell">
            <div className="card-body">
              <h2>Shorten a long link</h2>
              <p className="muted">No credit card required.</p>

              <form onSubmit={onSubmit} className="short-form">
                <label htmlFor="target">Paste your long link here</label>

                <input
                  id="target"
                  name="target"
                  type="url"
                  placeholder="https://example.com/my-long-url"
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  required
                />

                <div className="form-row">
                  <button className="btn primary" type="submit" disabled={loading}>
                    {loading ? "Shortening…" : "Shorten"}
                  </button>

                  <button
                    type="button"
                    className="btn ghost"
                    onClick={() => {
                      setTarget("");
                      setShortUrl(null);
                      setError(null);
                    }}
                  >
                    Reset
                  </button>
                </div>

                {error && <p className="error">{error}</p>}
              </form>

             
              {shortUrl && (
                <div className="result">
                  <strong>Short URL</strong>
                  <div className="short-row">
                    <a href={shortUrl} target="_blank" rel="noreferrer">
                      {shortUrl}
                    </a>
                    <button
                      className="btn tiny"
                      onClick={() => navigator.clipboard.writeText(shortUrl)}
                    >
                      Copy
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <small>Made with ♥ — For Project Demo</small>
      </footer>
    </div>
  );
}
