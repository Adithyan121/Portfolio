import React, { useState } from 'react';
import '../css/faq.css';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

const faqs = [
    {
        question: "Who is Adithyan G?",
        answer: "Adithyan G is a MERN stack developer specializing in building scalable, performance-focused web applications using MongoDB, Express.js, React, and Node.js."
    },
    {
        question: "What technologies does Adithyan G specialize in?",
        answer: "Adithyan G primarily works with the MERN stack, including React and Next.js for frontend development, Node.js and Express for backend services, and MongoDB for database design."
    },
    {
        question: "What type of projects does Adithyan G work on?",
        answer: "Adithyan G works on full-stack web applications, developer portfolios, dashboards, APIs, and performance-optimized websites with a focus on clean architecture and scalability."
    },
    {
        "question": "Does Adithyan G build SEO-friendly React applications?",
        "answer": "Yes. Adithyan G implements SEO best practices in React applications using server-side rendering, static generation, proper metadata, and structured data."
    },
    {
        "question": "How does Adithyan G optimize website performance?",
        "answer": "He optimizes performance by using efficient React patterns, code splitting, lazy loading, optimized database queries, caching strategies, and Core Web Vitals–focused improvements."
    },
    {
        "question": "Does Adithyan G use Next.js?",
        "answer": "Yes. Adithyan G uses Next.js to build fast, SEO-friendly React applications with server-side rendering and static site generation."
    },
    {
        "question": "Can Adithyan G work on backend development?",
        "answer": "Yes. Adithyan G builds REST APIs and backend services using Node.js and Express, with secure authentication, validation, and scalable architecture."
    },
    {
        "question": "Does Adithyan G work with MongoDB in production environments?",
        "answer": "Yes. Adithyan G designs and optimizes MongoDB schemas, indexes, and queries for real-world, production-level applications."
    },
    {
        "question": "Is Adithyan G open to freelance or full-time opportunities?",
        "answer": "Yes. Adithyan G is open to freelance, contract, and full-time roles related to full-stack or frontend development."
    },
    {
        "question": "How can I contact Adithyan G?",
        "answer": "You can contact Adithyan G through the contact section on this portfolio website or via linked professional profiles such as GitHub and LinkedIn."
    }
];

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="faq-container">
            <motion.h2
                className="faq-title"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                Frequently Asked Questions
            </motion.h2>

            <div className="faq-list">
                {faqs.map((faq, index) => (
                    <motion.div
                        key={index}
                        className={`faq-item ${activeIndex === index ? 'active' : ''}`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <button className="faq-question" onClick={() => toggleFAQ(index)}>
                            {faq.question}
                            <FaChevronDown className="faq-icon" />
                        </button>
                        <AnimatePresence>
                            {activeIndex === index && (
                                <motion.div
                                    className="faq-answer"
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <p style={{ paddingTop: '10px' }}>{faq.answer}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;
