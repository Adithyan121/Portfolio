import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../assets/api";
import '../css/casestudies.css';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import { FaArrowRight, FaShareAlt } from "react-icons/fa";
import { useNotification } from "../context/NotificationContext";

const CaseStudies = () => {
    const { notify } = useNotification();
    const [caseStudies, setCaseStudies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/casestudies')
            .then(res => {
                setCaseStudies(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const handleCopyLink = (e, cs) => {
        e.stopPropagation();
        const link = `https://adithyan-phi.vercel.app/casestudies/${cs.slug || cs._id}`;
        navigator.clipboard.writeText(link);
        notify.success("Link copied to clipboard!");
    };

    return (
        <div className="page-wrapper">
            <Helmet>
                <title>Case Studies | Adithyan G</title>
                <meta name="description" content="In-depth case studies of my software engineering projects." />
                <link rel="canonical" href="https://adithyan-phi.vercel.app/casestudies" />

                {/* Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Case Studies | Adithyan G" />
                <meta property="og:description" content="In-depth case studies of my software engineering projects, detailing challenges, solutions, and impact." />
                <meta property="og:url" content="https://adithyan-phi.vercel.app/casestudies" />
                <meta property="og:image" content="https://adithyan-phi.vercel.app/og-image.png" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Case Studies | Adithyan G" />
                <meta name="twitter:description" content="In-depth case studies of my software engineering projects." />
                <meta name="twitter:image" content="https://adithyan-phi.vercel.app/og-image.png" />
                <script type="application/ld+json">
                    {`
                    {
                        "@context": "https://schema.org",
                        "@type": "CollectionPage",
                        "name": "Case Studies - Adithyan G",
                        "description": "In-depth case studies of my software engineering projects.",
                        "url": "https://adithyan-phi.vercel.app/casestudies",
                        "hasPart": [
                            {
                                "@type": "CreativeWork",
                                "name": "MERN Stack E-commerce",
                                "description": "Full featured e-commerce application built with MERN stack."
                            },
                            {
                                "@type": "CreativeWork",
                                "name": "Task Management System",
                                "description": "A collaborative task management tool for teams."
                            }
                        ]
                    }
                `}
                </script>
            </Helmet>
            <Navbar />
            <section className="cs-section">
                <h1 className="section-title">Case Studies</h1>
                <p className="section-subtitle">Deep dives into challenges, solutions, and architectural decisions.</p>

                {loading ? (
                    <div className="loading">Loading...</div>
                ) : (
                    <div className="cs-grid">
                        {caseStudies.map(cs => (
                            <motion.div
                                className="cs-card"
                                key={cs._id}
                                style={{ position: 'relative' }}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="cs-image-wrapper">
                                    <img src={cs.image} alt={cs.title} className="cs-image" />
                                    <button
                                        className="share-icon-btn"
                                        onClick={(e) => handleCopyLink(e, cs)}
                                        title="Copy Link"
                                        style={{
                                            position: 'absolute',
                                            top: '10px',
                                            right: '10px',
                                            background: 'rgba(255, 255, 255, 0.9)',
                                            border: 'none',
                                            borderRadius: '50%',
                                            padding: '8px',
                                            cursor: 'pointer',
                                            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                                            zIndex: 10,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: '#333'
                                        }}
                                    >
                                        <FaShareAlt />
                                    </button>
                                </div>
                                <div className="cs-content">
                                    <h3 className="cs-title">{cs.title}</h3>
                                    <p className="cs-overview">{cs.overview.substring(0, 150)}...</p>
                                    <Link to={`/casestudies/${cs.slug || cs._id}`} className="cs-link">
                                        View Case Study <FaArrowRight />
                                    </Link>
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

export default CaseStudies;
