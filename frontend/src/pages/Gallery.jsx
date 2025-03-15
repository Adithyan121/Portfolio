import React from "react";
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
      <div className="gallery-container">
        <h2>My Gallery</h2>
        <div className="gallery-grid">
          {images.map((img, index) => (
            <img key={index} src={img} alt={`Gallery Image ${index + 1}`} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
