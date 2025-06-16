import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import CallToAction from "../../components/CallToAction/CallToAction";
import "./Home.css";
import type { ProjectItem, SkillItem } from "../../types";
import DisplayTime from "../../components/DisplayTime/DisplayTime";

const skills: SkillItem[] = [
  { name: "React", imagePath: "/images/logos/react-logo.png" },
  {
    name: "TypeScript",
    imagePath: "/images/logos/ts-logo.png",
  },
  { name: "CSS", imagePath: "/images/logos/css-logo.png" },
  { name: "Python", imagePath: "/images/logos/python-logo.png" },
  { name: "MySQL", imagePath: "/images/logos/mysql-logo.png" },
  { name: "Docker", imagePath: "/images/logos/docker-logo.png" },
  { name: "Git", imagePath: "/images/logos/git-logo.png" },
  { name: "AWS", imagePath: "/images/logos/aws-logo.png" },
  {
    name: "Terraform",
    imagePath: "/images/logos/tf-logo.png",
  },
  { name: "Linux", imagePath: "/images/logos/linux-logo.png" },
];

const Home = () => {
  const [projects, setProjects] = useState<ProjectItem[]>([]);

  useEffect(() => {
    fetch("/data/projects.json")
      .then((res) => res.json())
      // only get top 3
      .then((data: ProjectItem[]) => {
        setProjects(data.slice(0, 3));
      })
      .catch((err) => console.error("Error fetching inventory:", err));
  }, []);

  return (
    <div className="home-page fade-in">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">Hello, I'm James</h1>
            <p className="hero-subtitle">MS CS @ BU | SWE Intern</p>
            <p className="hero-description">
              Hey, I'm James, currently a student at BU studying MS CS and
              interning as a SWE for the summer. I'm passionate about solving
              problems through using technology and coding.
            </p>
            <div className="hero-actions">
              <Link to="/contact" className="btn btn-primary">
                Get In Touch
              </Link>
              <Link to="/about" className="btn btn-secondary">
                Learn More
              </Link>
            </div>
            <div className="hero-time">
              <DisplayTime />
            </div>
          </div>

          <div className="hero-image">
            <img
              src="/images/myphoto.jpg"
              alt="Profile"
              className="profile-img"
            />
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="skills-section section">
        <h2 className="section-title">Technical Skills</h2>
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div key={index} className="card skill-card">
              <div className="skill-image">
                <img src={skill.imagePath} alt={skill.name} />
              </div>
              <div className="skill-info">
                <h3 className="skill-name">{skill.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Preview Section */}
      <section className="projects-section section">
        <h2 className="section-title">Featured Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card card">
              <div className="project-image">
                <img
                  src={project.imagePath}
                  alt={project.title}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <div
                  className="project-placeholder"
                  style={{ display: "none" }}
                >
                  Project Image
                </div>
              </div>
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="projects-cta">
          <Link to="/gallery" className="btn btn-primary">
            View All Projects
          </Link>
        </div>
      </section>

      {/* Call to Action Section */}
      <CallToAction />
    </div>
  );
};

export default Home;
