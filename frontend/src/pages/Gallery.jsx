import React from "react";
import { Helmet } from "react-helmet-async";
import "../css/gallery.css";
import image1 from "../assets/gallery1.jpg";
import image2 from "../assets/gallery2.jpg";
import image3 from "../assets/gallery3.jpg";
import image4 from "../assets/gallery4.jpg";
import image5 from "../assets/gallery5.jpg";

const Gallery = () => {
  const images = [
    image1, image2, image3, image4,
    image5, image1, image2, image3,
    image4, image5, image1, image2
  ]; // 12 images for 4x3 grid

  return (
    <section id="gallery">
      <Helmet>
        <title>Gallery | Adithyan G Portfolio</title>
        <meta name="description" content="A visual gallery of work, achievements, and assets from Adithyan G's portfolio." />
        <link rel="canonical" href="https://adithyan-phi.vercel.app/gallery" />
      </Helmet>
      <div className="gallery-container">
        <h2>My Gallery</h2>
        <div className="gallery-grid">
          {images.map((img, index) => (
            <img key={index} src={img} alt={`Gallery Image ${index + 1}`} />
          ))}
        </div>
      </div>

      <div className="file-input-container">
        <label htmlFor="file-upload" className="file-label">
          <i className="fas fa-upload"></i> Upload Profile pic
        </label>
        <input
          id="file-upload"
          className="file_input"
          type="file"
          accept="application/pdf"
          onChange={handleResumeUpload}
        />
        {resumeUrl && (
          <p>
            <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
              View Current Resume
            </a>
          </p>
        )}
      </div>




    </section>
  );
};

export default Gallery;
