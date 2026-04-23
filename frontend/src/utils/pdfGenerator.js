import jsPDF from "jspdf";

export const generateQuotePDF = (quoteData) => {
    const doc = new jsPDF("p", "mm", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;

    let y = margin;

    const checkPageBreak = (spaceNeeded) => {
        if (y + spaceNeeded > pageHeight - margin) {
            doc.addPage();
            y = margin;
        }
    };

    const addDivider = () => {
        doc.setDrawColor(220, 220, 220);
        doc.line(margin, y, pageWidth - margin, y);
        y += 6;
    };

    const addSectionTitle = (title) => {
        checkPageBreak(10);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text(title, margin, y);
        y += 6;
    };

    const addText = (text) => {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(60, 60, 60);

        const lines = doc.splitTextToSize(text, pageWidth - margin * 2);
        checkPageBreak(lines.length * 5);
        doc.text(lines, margin, y);
        y += lines.length * 5;
    };

    // ===== HEADER =====
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Adithyan G", margin, y);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("Web Developer", margin, y + 5);

    doc.setFontSize(10);
    doc.text(`Quote #: ${quoteData.quoteId}`, pageWidth - margin, y, { align: "right" });
    doc.text(`Date: ${new Date().toLocaleDateString()}`, pageWidth - margin, y + 5, { align: "right" });
    doc.text(`Time: ${new Date().toLocaleTimeString()}`, pageWidth - margin, y + 10, { align: "right" });

    y += 20;
    addDivider();

    // CLIENT
    addSectionTitle("Prepared For");
    addText(quoteData.name || "Valued Client");

    y += 4;
    addDivider();

    // OVERVIEW
    addSectionTitle("Project Overview");
    addText(`Development of a ${quoteData.projectTypeName} with focus on performance, responsiveness, and clean user experience.`);

    y += 4;
    addDivider();

    // FEATURES
    addSectionTitle("Scope Details");

    addText(`Design: Custom UI/UX`);
    addText(`Responsiveness: Mobile, Tablet, Desktop`);
    addText(`SEO: Basic optimization`);

    if (quoteData.features?.length) {
        y += 2;
        addText("Features:");
        quoteData.features.forEach(f => {
            addText(`- ${f.name}`);
        });
    }

    y += 4;
    addDivider();

    // TIMELINE
    addSectionTitle("Timeline");
    addText(`Estimated: ${quoteData.timeline || "TBD"}`);
    addText("Design → Development → Testing");

    y += 4;
    addDivider();

    // PRICING
    addSectionTitle("Pricing");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("Item", margin, y);
    doc.text("Cost", pageWidth - margin, y, { align: "right" });

    y += 5;
    addDivider();

    doc.setFont("helvetica", "normal");

    const base = quoteData.basePrice || 0;
    const design = Math.round(base * 0.3);
    const dev = Math.round(base * 0.5);
    const test = base - design - dev;

    const pricingRows = [
        { name: "Design", price: design },
        { name: "Development", price: dev },
        { name: "Testing & Deployment", price: test }
    ];

    pricingRows.forEach(row => {
        checkPageBreak(6);
        doc.text(row.name, margin, y);
        doc.text(`₹${row.price.toLocaleString("en-IN")}`, pageWidth - margin, y, { align: "right" });
        y += 6;
    });

    if (quoteData.features?.length) {
        y += 4;
        quoteData.features.forEach(f => {
            checkPageBreak(6);
            doc.text(`+ ${f.name}`, margin, y);
            doc.text(`₹${(f.price || 0).toLocaleString("en-IN")}`, pageWidth - margin, y, { align: "right" });
            y += 6;
        });
    }

    y += 4;
    addDivider();

    // TOTAL
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("Total Estimate", margin, y);

    doc.setFontSize(12);
    doc.text(
        `₹${quoteData.estimates?.min?.toLocaleString("en-IN") || 0} - ₹${quoteData.estimates?.max?.toLocaleString("en-IN") || 0}`,
        pageWidth - margin,
        y,
        { align: "right" }
    );

    y += 10;
    addDivider();

    // INCLUDED / NOT INCLUDED
    addSectionTitle("Included");
    addText("- 2–3 revisions\n- Basic SEO\n- Deployment");

    addSectionTitle("Not Included");
    addText("- Content writing\n- Hosting/domain\n- Maintenance");

    y += 4;
    addDivider();

    // PAYMENT
    addSectionTitle("Payment Terms");
    addText("50% upfront\n50% on completion");

    y += 4;
    addDivider();

    // FOOTER NOTE
    addText("This is an estimated quote. Final pricing may vary after discussion.");

    // SAVE
    doc.save(`Quotation_${quoteData.name || "Client"}.pdf`);
};