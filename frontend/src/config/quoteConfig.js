export const defaultQuoteConfig = {
    projectTypes: [
        {
            id: 'landing_page',
            name: 'Landing Page',
            basePrice: 8000,
            timeline: '1-2 weeks',
            tooltip: 'A single-page site optimized for converting visitors into leads.',
            whyYouNeedThis: 'Perfect for campaigns, single products, or simple lead generation without the clutter.',
            recommendations: ['seo_setup']
        },
        {
            id: 'business_website',
            name: 'Business Website',
            basePrice: 15000,
            timeline: '2-4 weeks',
            tooltip: 'Multi-page site (Home, About, Services, Contact) outlining your business.',
            whyYouNeedThis: 'Build trust and attract customers online with a professional presence.',
            recommendations: ['seo_setup', 'blog_cms']
        },
        {
            id: 'ecommerce_website',
            name: 'E-commerce Website',
            basePrice: 30000,
            timeline: '4-6 weeks',
            tooltip: 'A full store to sell products or services online with cart and checkout.',
            whyYouNeedThis: 'Start selling your products online 24/7 to a global audience.',
            recommendations: ['payment', 'admin_dashboard']
        }
    ],
    features: [
        { id: 'blog_cms', name: 'Blog / CMS', price: 5000, tooltip: 'Content Management System for easy updates.' },
        { id: 'user_login', name: 'User Login System', price: 7000 },
        { id: 'payment', name: 'Payment Integration', price: 10000, tooltip: 'Secure payment gateway integration (Stripe/Razorpay).' },
        { id: 'admin_dashboard', name: 'Admin Dashboard', price: 12000 },
        { id: 'seo_setup', name: 'SEO Setup', price: 3000, tooltip: 'On-page optimizations to rank higher on Google.' }
    ]
};

export const getQuoteConfig = () => {
    const stored = localStorage.getItem("portfolio_quote_config");
    if (stored) {
        try {
            const parsed = JSON.parse(stored);
            // Ensure we merge new fields like tooltips if they don't exist in older localStorage versions
            const mergedProjectTypes = defaultQuoteConfig.projectTypes.map(def => {
                const matching = parsed.projectTypes?.find(p => p.id === def.id) || {};
                return { ...def, ...matching };
            });
            const mergedFeatures = defaultQuoteConfig.features.map(def => {
                const matching = parsed.features?.find(f => f.id === def.id) || {};
                return { ...def, ...matching };
            });
            return { projectTypes: mergedProjectTypes, features: mergedFeatures };
        } catch (e) {
            console.error("Failed to parse stored quote config", e);
        }
    }
    return defaultQuoteConfig;
};

export const saveQuoteConfig = (config) => {
    localStorage.setItem("portfolio_quote_config", JSON.stringify(config));
};
