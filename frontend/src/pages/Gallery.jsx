import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/gallery.css"; // We will create this

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Gallery = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInstagramPosts = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/instagram/posts`);
        setPosts(res.data);
      } catch (err) {
        setError(err.response?.data?.error || err.response?.data?.message || err.message || "Failed to fetch Instagram posts");
      } finally {
        setLoading(false);
      }
    };

    fetchInstagramPosts();
  }, []);

  return (
    <div className="gallery-page">
      <div className="gallery-header">
        <h1 className="gallery-title">Gallery</h1>
        <p className="gallery-subtitle">Latest updates from Instagram</p>
      </div>

      {loading ? (
        <div className="gallery-loading">
          <div className="spinner"></div>
          <h2>Loading Instagram posts...</h2>
        </div>
      ) : error ? (
        <div className="gallery-error">
          <svg className="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <h2>Oops! Something went wrong.</h2>
          <p>{error}</p>
        </div>
      ) : posts.length === 0 ? (
        <div className="gallery-empty">
          <h2>No posts found.</h2>
        </div>
      ) : (
        <div className="gallery-grid">
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="gallery-card"
            >
              <div className="media-container">
                {post.media_type === "VIDEO" ? (
                  <>
                    <video
                      src={post.media_url}
                      poster={post.thumbnail_url}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="gallery-media"
                    />
                    <div className="video-icon">
                      <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path></svg>
                    </div>
                  </>
                ) : (
                  <img
                    src={post.media_url}
                    alt={post.caption || "Instagram post"}
                    className="gallery-media"
                    loading="lazy"
                  />
                )}
                {post.media_type === "CAROUSEL_ALBUM" && (
                    <div className="carousel-icon">
                        <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path></svg>
                    </div>
                )}
              </div>
              {/* <div className="gallery-caption-overlay">
                {post.caption && (
                  <p className="gallery-caption">
                    {post.caption.length > 100
                      ? `${post.caption.substring(0, 100)}...`
                      : post.caption}
                  </p>
                )}
                <span className="view-on-ig">View on Instagram</span>
              </div> */}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;
