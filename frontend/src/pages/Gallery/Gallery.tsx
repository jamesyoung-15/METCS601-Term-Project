import { useState, useEffect } from "react";
import "./Gallery.css";
import type { ProjectItem } from "../../types";

const Gallery = () => {
  const [projects, setProjects] = useState<ProjectItem[]>([]);

  useEffect(() => {
    fetch("/data/projects.json")
      .then((res) => res.json())
      // only get top 3
      .then((data: ProjectItem[]) => setProjects(data))
      .catch((err) => console.error("Error fetching inventory:", err));
  }, []);

  return (
    <div className="gallery-page fade-in">
      <section className="gallery-header">
        <h1>Gallery</h1>
        <p>A showcase of METCS601 assignments</p>
      </section>

      {/* Gallery Grid */}
      <section className="gallery-section">
        <div className="gallery-grid">
          {projects.map((item) => (
            <div key={item.id} className="gallery-item">
              <div className="item-image">
                <img src={item.imagePath} alt={item.title} />
                <div className="image-placeholder" style={{ display: "none" }}>
                  <span>Project Image</span>
                </div>
                <div className="item-overlay">
                  <div className="overlay-content">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Gallery;
