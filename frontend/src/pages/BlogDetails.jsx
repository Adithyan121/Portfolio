import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet-async";
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../assets/api";
import { FaArrowLeft, FaExternalLinkAlt } from "react-icons/fa";
import '../css/projectdetails.css';
import SocialInteractions from "../components/SocialInteractions";

const BlogDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get(`/blogs/${id}`)
            .then((response) => {
                setBlog(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching blog:", error);
                setLoading(false);
            });
    }, [id]);

    const handleLike = async (id) => {
        await api.put(`/blogs/${id}/like`);
    };

    const handleComment = async (id, commentData) => {
        const res = await api.post(`/blogs/${id}/comment`, commentData);
        return res.data;
    };

    if (loading) return <div>Loading...</div>;
    if (!blog) return <div>Blog not found.</div>;

    return (
        <div className="page-wrapper">
            <Helmet>
                <title>{blog.title} | Blog | Adithyan G</title>
                <meta name="description" content={blog.summary} />
                <link rel="canonical" href={`https://adithyan-phi.vercel.app/blogs/${blog.slug || blog._id}`} />

                {/* Open Graph */}
                <meta property="og:type" content="article" />
                <meta property="og:title" content={blog.title} />
                <meta property="og:description" content={blog.summary} />
                <meta property="og:url" content={`https://adithyan-phi.vercel.app/blogs/${blog.slug || blog._id}`} />
                <meta property="og:image" content={blog.image} />
                <meta property="article:published_time" content={blog.date} />
                <meta property="article:author" content="Adithyan G" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={blog.title} />
                <meta name="twitter:description" content={blog.summary} />
                <meta name="twitter:image" content={blog.image} />
            </Helmet>
            <Navbar />
            <section id="project-details">
                <div className="project-details-container">
                    <button className="back-btn" onClick={() => navigate(-1)}>
                        <FaArrowLeft /> Back to Blogs
                    </button>

                    <img src={blog.image} alt={blog.title} className="project-image" />

                    <h1 className="project-title">{blog.title}</h1>
                    <p className="cs-client" style={{ marginBottom: '20px', fontSize: '1rem', color: '#646cff' }}>
                        Platform: {blog.platform} | Published: {new Date(blog.date).toLocaleDateString()}
                    </p>

                    <div className="content-section">
                        <p className="project-description">{blog.summary}</p>
                    </div>

                    <div className="btn-div">
                        <a href={blog.externalLink} target="_blank" rel="noopener noreferrer">
                            <button className="btn">
                                Read Full Article on {blog.platform} <FaExternalLinkAlt className="git-icon" />
                            </button>
                        </a>
                    </div>

                    <SocialInteractions
                        item={blog}
                        type="Blog"
                        onLike={handleLike}
                        onComment={handleComment}
                        shareUrl={`https://adithyan-phi.vercel.app/blogs/${blog.slug || blog._id}`}
                    />

                </div>
            </section>
            <Footer />
        </div>
    );
};

export default BlogDetails;
