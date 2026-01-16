import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../assets/api";
import '../css/blogs.css';
import { motion } from "framer-motion";
import { FaMedium, FaDev, FaExternalLinkAlt } from "react-icons/fa";

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/blogs')
            .then(res => {
                setBlogs(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const getPlatformIcon = (platform) => {
        if (platform?.toLowerCase().includes('medium')) return <FaMedium />;
        if (platform?.toLowerCase().includes('dev')) return <FaDev />;
        return <FaExternalLinkAlt />;
    };

    return (
        <div className="page-wrapper">
            <Helmet>
                <title>Blogs | Adithyan G</title>
                <meta name="description" content="Read my latest articles on Web Development, React, Node.js and more." />
                <link rel="canonical" href="https://adithyan-phi.vercel.app/blogs" />

                {/* Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Blogs | Adithyan G" />
                <meta property="og:description" content="Read my latest articles on Web Development, React, Node.js and more." />
                <meta property="og:url" content="https://adithyan-phi.vercel.app/blogs" />
                <meta property="og:image" content="https://adithyan-phi.vercel.app/og-image.png" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Blogs | Adithyan G" />
                <meta name="twitter:description" content="Read my latest articles on Web Development, React, Node.js and more." />
                <meta name="twitter:image" content="https://adithyan-phi.vercel.app/og-image.png" />
            </Helmet>
            <Navbar />
            <section className="blogs-section">
                <h1 className="section-title">Latest Articles</h1>
                <p className="section-subtitle">Thoughts, tutorials, and insights on modern web development.</p>

                {loading ? (
                    <div className="loading">Loading...</div>
                ) : (
                    <div className="blogs-grid">
                        {blogs.map(blog => (
                            <motion.div
                                onClick={() => window.location.href = `/blogs/${blog.slug || blog._id}`}
                                className="blog-card"
                                key={blog._id}
                                style={{ cursor: 'pointer' }}
                                whileHover={{ y: -5 }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="blog-image-wrapper">
                                    <img src={blog.image} alt={blog.title} className="blog-image" />
                                    <div className="platform-badge">
                                        {getPlatformIcon(blog.platform)} {blog.platform}
                                    </div>
                                </div>
                                <div className="blog-content">
                                    <h3 className="blog-title">{blog.title}</h3>
                                    <span className="read-more">View Details <FaExternalLinkAlt className="icon-sm" /></span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </section>
            <Footer />
        </div>
    );
};

export default Blogs;
