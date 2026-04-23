import emailjs from '@emailjs/browser';

// ========================================================
// EMAILJS CONFIGURATION
// To make this work, sign up at https://www.emailjs.com/
// Create an Email Service, and an Email Template.
// ========================================================

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID_CLIENT = import.meta.env.VITE_EMAILJS_TEMPLATE_ID2;
const EMAILJS_TEMPLATE_ID_OWNER = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export const sendQuoteEmails = async (quoteData) => {
    // We format the text payload
    const featuresList = quoteData.features.length > 0
        ? quoteData.features.map(f => f.name).join(', ')
        : 'No additional features';

    const priceRange = `₹${quoteData.estimates.min.toLocaleString('en-IN')} - ₹${quoteData.estimates.max.toLocaleString('en-IN')}`;

    const commonParams = {
        user_name: quoteData.name,
        user_email: quoteData.email,
        to_email: quoteData.email,
        email: quoteData.email,
        reply_to: quoteData.email,
        project_type: quoteData.projectTypeName,
        features: featuresList,
        price_range: priceRange,
        timeline: quoteData.timeline,
        message: quoteData.message || 'No additional message.',
        quote_summary: `Quote Estimate: ${priceRange}. Project: ${quoteData.projectTypeName}. Timeline: ${quoteData.timeline}. Included Features: ${featuresList}.`,
        content: quoteData.pdfBase64,
        my_file: quoteData.pdfBase64,
        pdf_attachment: quoteData.pdfBase64,
        newsletter_opt_in: quoteData.newsletterOptIn ? 'Yes' : 'No',
        tech_stack: "HTML, CSS, JavaScript, React.js, MERN Stack"
    };

    try {
        if (EMAILJS_SERVICE_ID) {
            // ONLY send email to Owner (Lead Generation)
            await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID_OWNER,
                {
                    ...commonParams,
                    owner_email: import.meta.env.VITE_EMAIL || "adithyang24@gmail.com",
                    to_email: import.meta.env.VITE_EMAIL || "adithyang24@gmail.com",
                    admin_email: import.meta.env.VITE_EMAIL || "adithyang24@gmail.com"
                },
                EMAILJS_PUBLIC_KEY
            );
        } else {
            console.warn("EmailJS is not configured. Falling back to console log simulation.");
            console.log("Mock Lead captured for Owner:", commonParams);
        }
    } catch (error) {
        console.error("Failed to send quote lead to owner:", error);
        throw error;
    }
};
