import React from 'react';
import { useParams } from 'react-router-dom';
import '../css/preview.css';

const PreviewSite = () => {
  const { id } = useParams();
  const project = projectDetailsData[id];

  if (!project) return <h2 className="error-message">Project Not Found</h2>;

  return (
    <section id="preview-page">
      {/* <h2 className="preview-title">{project.name}</h2> */}
      <div className="iframe-container">
        <iframe src={project.previewLink} title={project.name} allowFullScreen></iframe>
      </div>
    </section>
  );
};

export default PreviewSite;
