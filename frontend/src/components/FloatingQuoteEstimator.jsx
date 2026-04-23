import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalculator, FaTimes, FaArrowLeft, FaInfoCircle } from 'react-icons/fa';
import '../css/floatingQuoteEstimator.css';
import { getQuoteConfig } from '../config/quoteConfig';
import { useNotification } from '../context/NotificationContext';
import { sendQuoteEmails } from '../utils/emailHandler';

const FloatingQuoteEstimator = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [showContactForm, setShowContactForm] = useState(false);
    const [config, setConfig] = useState(getQuoteConfig());

    const { notify } = useNotification();

    // Form states
    const [selectedProjectType, setSelectedProjectType] = useState(null);
    const [selectedFeatures, setSelectedFeatures] = useState([]);
    const [contactData, setContactData] = useState({
        name: '',
        email: '',
        message: '',
        newsletterOptIn: true
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Sync config
    useEffect(() => {
        const handleStorageChange = () => setConfig(getQuoteConfig());
        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('quoteConfigUpdated', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('quoteConfigUpdated', handleStorageChange);
        };
    }, []);

    // Pre-select first project type
    useEffect(() => {
        if (!selectedProjectType && config.projectTypes && config.projectTypes.length > 0) {
            setSelectedProjectType(config.projectTypes[0].id);
        }
    }, [config.projectTypes, selectedProjectType]);

    const activeProject = config.projectTypes?.find(p => p.id === selectedProjectType) || null;

    const handleFeatureToggle = (featureId) => {
        setSelectedFeatures((prev) =>
            prev.includes(featureId)
                ? prev.filter((id) => id !== featureId)
                : [...prev, featureId]
        );
    };

    const getPriceEstimate = () => {
        if (!activeProject) return { min: 0, max: 0, timeline: '', total: 0 };
        let total = activeProject.basePrice || 0;
        selectedFeatures.forEach(featId => {
            const feature = config.features?.find(f => f.id === featId);
            if (feature) total += feature.price;
        });

        return {
            min: total,
            max: Math.round(total * 1.4),
            timeline: activeProject.timeline || 'TBD',
            total
        };
    };

    const estimates = getPriceEstimate();

    const handleContactChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setContactData({ ...contactData, [e.target.name]: value });
    };

    const getFullQuoteData = () => {
        const featuresArr = selectedFeatures.map(fId => config.features.find(f => f.id === fId)).filter(Boolean);
        return {
            ...contactData,
            projectTypeName: activeProject?.name || 'Unknown',
            basePrice: activeProject?.basePrice || 0,
            features: featuresArr,
            estimates,
            timeline: estimates.timeline
        };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const fullPayload = getFullQuoteData();

            // Send Emails (without PDF payload)
            await sendQuoteEmails(fullPayload);

            notify.success("Quote request sent successfully! I will reach out to you soon.");
            setIsOpen(false);
            setShowContactForm(false);
            setContactData({ name: '', email: '', message: '', newsletterOptIn: true });
            setSelectedFeatures([]);
        } catch (error) {
            notify.error("There was an error submitting your request. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(price);
    };

    return (
        <div className="quote-estimator-container">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="quote-panel"
                    >
                        <div className="quote-panel-header">
                            <div className="flex-center">
                                {showContactForm && (
                                    <button className="back-btn" onClick={() => setShowContactForm(false)}>
                                        <FaArrowLeft />
                                    </button>
                                )}
                                <h3>{showContactForm ? "Get Exact Quote" : "Project Estimator"}</h3>
                            </div>
                            <button className="close-button" onClick={() => setIsOpen(false)}>
                                <FaTimes />
                            </button>
                        </div>

                        <div className="quote-panel-content">
                            {!showContactForm ? (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                >
                                    <h4 className="section-title">Project Type</h4>
                                    <div className="radio-group">
                                        {config.projectTypes?.map(project => (
                                            <label key={project.id} className={`option-label ${selectedProjectType === project.id ? 'selected' : ''}`}>
                                                <input
                                                    type="radio"
                                                    name="projectType"
                                                    value={project.id}
                                                    checked={selectedProjectType === project.id}
                                                    onChange={() => setSelectedProjectType(project.id)}
                                                />
                                                <span className="option-text">
                                                    {project.name}
                                                    {project.tooltip && (
                                                        <span className="tooltip-icon">
                                                            <FaInfoCircle />
                                                            <span className="tooltip-text">{project.tooltip}</span>
                                                        </span>
                                                    )}
                                                </span>
                                                <span className="option-price">{formatPrice(project.basePrice)}</span>
                                            </label>
                                        ))}
                                    </div>

                                    {/* Why You Need This Dynamic Section */}
                                    {activeProject && activeProject.whyYouNeedThis && (
                                        <div className="why-section">
                                            <strong>Why you need this:</strong>
                                            {activeProject.whyYouNeedThis}
                                        </div>
                                    )}

                                    <h4 className="section-title" style={{ marginTop: activeProject && activeProject.whyYouNeedThis ? '0' : '20px' }}>
                                        Optional Features
                                    </h4>
                                    <div className="checkbox-group">
                                        {config.features?.map(feature => {
                                            const isRecommended = activeProject?.recommendations?.includes(feature.id);
                                            return (
                                                <label key={feature.id} className={`option-label ${selectedFeatures.includes(feature.id) ? 'selected' : ''}`}>
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedFeatures.includes(feature.id)}
                                                        onChange={() => handleFeatureToggle(feature.id)}
                                                    />
                                                    <span className="option-text">
                                                        {feature.name}
                                                        {isRecommended && <span className="badge-recommended">Recommended</span>}
                                                        {feature.tooltip && (
                                                            <span className="tooltip-icon">
                                                                <FaInfoCircle />
                                                                <span className="tooltip-text">{feature.tooltip}</span>
                                                            </span>
                                                        )}
                                                    </span>
                                                    <span className="option-price">+{formatPrice(feature.price)}</span>
                                                </label>
                                            );
                                        })}
                                    </div>

                                    {/* Price Breakdown */}
                                    <div className="price-breakdown">
                                        <div className="price-breakdown-item">
                                            <span>Base Estimate ({activeProject?.name})</span>
                                            <span>{formatPrice(activeProject?.basePrice || 0)}</span>
                                        </div>
                                        {selectedFeatures.map(fId => {
                                            const f = config.features?.find(x => x.id === fId);
                                            if (!f) return null;
                                            return (
                                                <div key={f.id} className="price-breakdown-item">
                                                    <span>+ {f.name}</span>
                                                    <span>{formatPrice(f.price)}</span>
                                                </div>
                                            )
                                        })}
                                        <div className="price-breakdown-total">
                                            <span>Total Calculated</span>
                                            <span>{formatPrice(estimates.total)}</span>
                                        </div>
                                    </div>

                                    {/* Price Summary */}
                                    <div className="price-summary" style={{ marginTop: '15px' }}>
                                        <p>Estimated Budget Range</p>
                                        <div className="price-range">
                                            {formatPrice(estimates.min)} – {formatPrice(estimates.max)}
                                        </div>
                                        <p className="timeline">Estimated Timeline: {estimates.timeline}</p>
                                        <p className="note mt-2" style={{ marginTop: '10px' }}><small>Final pricing may vary based on exact requirements.</small></p>
                                    </div>

                                    <button className="quote-action-btn" onClick={() => setShowContactForm(true)}>
                                        Get Exact Quote
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.form
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    onSubmit={handleSubmit}
                                    className="contact-form-section"
                                >
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Your Name"
                                        value={contactData.name}
                                        onChange={handleContactChange}
                                        required
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Your Email"
                                        value={contactData.email}
                                        onChange={handleContactChange}
                                        required
                                    />
                                    <textarea
                                        name="message"
                                        placeholder="Tell me a bit about your business or project goals (optional)"
                                        value={contactData.message}
                                        onChange={handleContactChange}
                                    />

                                    <label className="newsletter-optin">
                                        <input
                                            type="checkbox"
                                            name="newsletterOptIn"
                                            checked={contactData.newsletterOptIn}
                                            onChange={handleContactChange}
                                        />
                                        Send me occasional website tips and special offers
                                    </label>

                                    <div className="price-summary" style={{ padding: '12px', marginTop: '5px' }}>
                                        <p style={{ marginBottom: 0, color: '#334155', fontWeight: 'bold' }}>Your Estimate Details:</p>
                                        <p style={{ fontSize: '13px', margin: '5px 0 0 0' }}>
                                            Type: {activeProject?.name} <br />
                                            Features: {selectedFeatures.length} selected <br />
                                            Total Estimate: {formatPrice(estimates.min)} – {formatPrice(estimates.max)}
                                        </p>
                                    </div>

                                    <button type="submit" className="quote-action-btn" disabled={isSubmitting}>
                                        {isSubmitting ? 'Sending...' : 'Submit Request'}
                                    </button>
                                </motion.form>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                className={`floating-button ${isOpen ? 'icon-only' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                onMouseEnter={() => !isOpen && setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                {isOpen ? <FaTimes /> : <FaCalculator />}
                {!isOpen && (
                    <motion.span
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: "auto", opacity: 1 }}
                        style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}
                    >
                        Get Quote
                    </motion.span>
                )}
            </motion.button>
        </div>
    );
};

export default FloatingQuoteEstimator;
