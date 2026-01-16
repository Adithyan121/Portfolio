import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet-async";
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../assets/api";
import { FaArrowLeft, FaExternalLinkAlt } from "react-icons/fa";
import '../css/projectdetails.css'; // Reusing for now as layout is similar

import SocialInteractions from "../components/SocialInteractions";

const CaseStudyDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [cs, setCs] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get(`/casestudies/${id}`)
            .then((response) => {
                setCs(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching case study:", error);
                setLoading(false);
            });
    }, [id]);

    const handleLike = async (id) => {
        await api.put(`/casestudies/${id}/like`);
    };

    const handleComment = async (id, commentData) => {
        const res = await api.post(`/casestudies/${id}/comment`, commentData);
        return res.data;
    };


    if (loading) return <div>Loading...</div>;
    if (!cs) return <div>Case Study not found.</div>;

    return (
        <div className="page-wrapper">
            <Helmet>
                <title>{cs.title} | Case Study | Adithyan G</title>
                <meta name="description" content={`Case study: ${cs.title}. ${cs.overview}`} />
                <link rel="canonical" href={`https://adithyan-phi.vercel.app/casestudies/${cs.slug || cs._id}`} />

                {/* Open Graph */}
                <meta property="og:type" content="article" />
                <meta property="og:title" content={`${cs.title} - Case Study`} />
                <meta property="og:description" content={cs.overview} />
                <meta property="og:url" content={`https://adithyan-phi.vercel.app/casestudies/${cs.slug || cs._id}`} />
                <meta property="og:image" content={cs.image} />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={`${cs.title} - Case Study`} />
                <meta name="twitter:description" content={cs.overview} />
                <meta name="twitter:image" content={cs.image} />
            </Helmet>
            <Navbar />
            <section id="project-details"> {/* Reuse ID for styling */}
                <div className="project-details-container">
                    <button className="back-btn" onClick={() => navigate(-1)}>
                        <FaArrowLeft /> Back to Case Studies
                    </button>

                    <img src={cs.image} alt={cs.title} className="project-image" />

                    <h1 className="project-title">{cs.title}</h1>

                    <div className="content-section">
                        <p className="project-description" style={{ fontStyle: 'italic', fontSize: '1.2rem' }}>{cs.overview}</p>
                    </div>

                    {cs.challenge && (
                        <div className="content-section">
                            <h2 className="tech-heading">Problem Statement</h2>
                            <p className="project-description">{cs.challenge}</p>
                        </div>
                    )}

                    {cs.myRole && (
                        <div className="content-section">
                            <h2 className="tech-heading">My Role / Contributions</h2>
                            <p className="project-description">{cs.myRole}</p>
                        </div>
                    )}

                    {cs.solution && (
                        <div className="content-section">
                            <h2 className="tech-heading">The Solution</h2>
                            <p className="project-description">{cs.solution}</p>
                        </div>
                    )}

                    {cs.results && (
                        <div className="content-section">
                            <h2 className="tech-heading">Results</h2>
                            <p className="project-description">{cs.results}</p>
                        </div>
                    )}

                    <SocialInteractions
                        item={cs}
                        type="Case Study"
                        onLike={handleLike}
                        onComment={handleComment}
                    />

                </div>
            </section>
            <Footer />
        </div>
    );
};

export default CaseStudyDetails;
