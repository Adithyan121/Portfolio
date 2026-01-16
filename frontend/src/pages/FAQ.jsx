import React from 'react';
import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FAQSection from "../components/FAQ";

const FAQ = () => {
    return (
        <div className="page-wrapper">
            <Helmet>
                <title>Frequently Asked Questions | Adithyan G</title>
                <meta name="description" content="Common questions about Adithyan G's skills, experience, and services as a MERN Stack Developer." />
                <link rel="canonical" href="https://adithyan-phi.vercel.app/faq" />

                {/* Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content="FAQ | Adithyan G" />
                <meta property="og:description" content="Common questions about Adithyan G's skills, experience, and services." />
                <meta property="og:url" content="https://adithyan-phi.vercel.app/faq" />
                <meta property="og:image" content="https://adithyan-phi.vercel.app/og-image.png" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="FAQ | Adithyan G" />
                <meta name="twitter:description" content="Common questions about Adithyan G's skills, experience, and services." />
                <meta name="twitter:image" content="https://adithyan-phi.vercel.app/og-image.png" />

                <script type="application/ld+json">
                    {`
                    {
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": [
                            {
                                "@type": "Question",
                                "name": "What services do you offer?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "I specialize in Full Stack Web Development using the MERN Stack (MongoDB, Express, React, Node.js)."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Are you available for freelance projects?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Yes, I am available for freelance work and consulting. Please reach out via the contact form."
                                }
                            }
                        ]
                    }
                `}
                </script>
            </Helmet>
            <Navbar />
            <div style={{ paddingTop: '60px', minHeight: '100vh', background: '#f8fafc' }}>
                <FAQSection />
            </div>
            <Footer />
        </div>
    );
};

export default FAQ;
