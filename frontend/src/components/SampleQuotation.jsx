import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import '../css/sampleQuotation.css';

const SampleQuotation = ({
    quoteData = {
        quoteId: "Q-2026-0081",
        date: new Date().toLocaleDateString(),
        status: "Draft",
        clientName: "Acme Corp",
        websiteType: "Landing Page",
        pages: "1 Page",
        featuresRequested: [
            "Lead Capture Form",
            "Responsive Design",
            "Basic SEO Setup"
        ],
        designApproach: "Custom UI Design",
        responsiveness: "Mobile, Tablet, Desktop",
        cmsIntegration: "Not Required",
        seoAndPerformance: "Basic SEO + Performance Optimization",

        timeline: [
            { step: 1, text: "Design: 2–3 days" },
            { step: 2, text: "Development: 4–5 days" },
            { step: 3, text: "Testing & Delivery: 2 days" }
        ],

        pricing: [
            { item: "Design", desc: "Custom UI layout", cost: 3000 },
            { item: "Development", desc: "Responsive build", cost: 3500 },
            { item: "Enhancements", desc: "Form + animations", cost: 1500 }
        ],
        totalCost: 8000,

        whatsIncluded: [
            "2 rounds of revisions",
            "Basic SEO setup",
            "Deployment support"
        ],
        whatsNotIncluded: [
            "Content writing",
            "Hosting/domain",
            "Maintenance"
        ],

        paymentTerms:
            "50% upfront to start project.\n50% on completion before delivery.",

        techStack: [
            "Frontend: React.js / HTML-CSS",
            "Backend: Node.js (if needed)",
            "Database: MongoDB (if needed)"
        ],

        maintenanceOptions: {
            monthlyPlan: "Available at ₹3000/month",
            featureAdditions: "Charged per feature"
        },

        dynamicAdjustmentNote:
            "Pricing and timeline may vary based on final discussion."
    }
}) => {

    const printRef = useRef(null);

    const handleDownloadPdf = async () => {
        const element = printRef.current;
        const canvas = await html2canvas(element, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');

        const pdf = new jsPDF("p", "px", [canvas.width, canvas.height]);
        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save(`Quotation_${quoteData.quoteId}.pdf`);
    };

    const formatCurrency = (val) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(val);
    };

    return (
        <div className="invoice-container">

            <div className="toolbar">
                <button onClick={handleDownloadPdf}>Download PDF</button>
            </div>

            <div className="invoice" ref={printRef}>

                {/* Header */}
                <div className="header">
                    <div>
                        <h2>Adithyan G</h2>
                        <p className="sub">Web Developer</p>
                    </div>
                    <div className="meta">
                        <p><strong>Quote #:</strong> {quoteData.quoteId}</p>
                        <p><strong>Date:</strong> {quoteData.date}</p>
                        <p><strong>Time:</strong> {new Date().toLocaleTimeString()}</p>
                        <p><strong>Status:</strong> {quoteData.status}</p>
                    </div>
                </div>

                {/* Client */}
                <div className="section">
                    <div className="title">Prepared For</div>
                    <p>{quoteData.clientName}</p>
                </div>

                {/* Overview */}
                <div className="section">
                    <div className="title">Project Overview</div>
                    <p>
                        {quoteData.websiteType} with {quoteData.pages}, including:
                    </p>
                    <ul>
                        {quoteData.featuresRequested.map((f, i) => (
                            <li key={i}>- {f}</li>
                        ))}
                    </ul>
                </div>

                {/* Features */}
                <div className="section">
                    <div className="title">Scope Details</div>
                    <p><strong>Design:</strong> {quoteData.designApproach}</p>
                    <p><strong>Responsiveness:</strong> {quoteData.responsiveness}</p>
                    <p><strong>CMS:</strong> {quoteData.cmsIntegration}</p>
                    <p><strong>SEO:</strong> {quoteData.seoAndPerformance}</p>
                </div>

                {/* Timeline */}
                <div className="section">
                    <div className="title">Timeline</div>
                    <ul>
                        {quoteData.timeline.map((t, i) => (
                            <li key={i}>- {t.text}</li>
                        ))}
                    </ul>
                </div>

                {/* Pricing */}
                <div className="section">
                    <div className="title">Pricing</div>
                    <table>
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Description</th>
                                <th>Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            {quoteData.pricing.map((p, i) => (
                                <tr key={i}>
                                    <td>{p.item}</td>
                                    <td>{p.desc}</td>
                                    <td>{formatCurrency(p.cost)}</td>
                                </tr>
                            ))}
                            <tr className="total">
                                <td colSpan="2">Total</td>
                                <td>{formatCurrency(quoteData.totalCost)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Included */}
                <div className="section">
                    <div className="title">Included</div>
                    <ul>
                        {quoteData.whatsIncluded.map((i, idx) => (
                            <li key={idx}>- {i}</li>
                        ))}
                    </ul>
                </div>

                {/* Not Included */}
                <div className="section">
                    <div className="title">Not Included</div>
                    <ul>
                        {quoteData.whatsNotIncluded.map((i, idx) => (
                            <li key={idx}>- {i}</li>
                        ))}
                    </ul>
                </div>

                {/* Payment */}
                <div className="section">
                    <div className="title">Payment Terms</div>
                    <p style={{ whiteSpace: "pre-line" }}>{quoteData.paymentTerms}</p>
                </div>

                {/* Tech */}
                <div className="section">
                    <div className="title">Tech Stack</div>
                    <ul>
                        {quoteData.techStack.map((t, i) => (
                            <li key={i}>- {t}</li>
                        ))}
                    </ul>
                </div>

                {/* Maintenance */}
                <div className="section">
                    <div className="title">Support</div>
                    <p><strong>Maintenance:</strong> {quoteData.maintenanceOptions.monthlyPlan}</p>
                    <p><strong>Upgrades:</strong> {quoteData.maintenanceOptions.featureAdditions}</p>
                </div>

                {/* CTA */}
                <div className="section">
                    <div className="title">Next Step</div>
                    <p>Proceed with this quote or request changes.</p>
                </div>

                {/* Note */}
                <div className="footer">
                    <p>{quoteData.dynamicAdjustmentNote}</p>
                    <p>
                        This is an estimated quote. Final pricing may vary after discussion.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default SampleQuotation;