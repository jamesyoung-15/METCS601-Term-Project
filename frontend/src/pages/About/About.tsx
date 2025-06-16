import "./About.css";
import CallToAction from "../../components/CallToAction/CallToAction";
import type { EducationItem, ExperienceItem } from "../../types";

const About = () => {
  const education: EducationItem[] = [
    {
      degree: "Master of Science in Computer Science",
      school: "Boston University",
      period: "2024-Present",
      location: "United States",
    },
    {
      degree: "BEng in Electronic and Computer Engineering",
      school: "The Hong Kong University of Science and Technology",
      period: "2020-2024",
      location: "Hong Kong",
    },
  ];

  const experience: ExperienceItem[] = [
    {
      title: "Software Engineer Intern",
      company: "Granite Telecommunications",
      period: "June 2025 - August 2025",
      description: "Ongoing summer internship, project TBD",
      location: "United States",
    },
    {
      title: "Software Developer Intern",
      company: "Intelligent Design Technology Limited",
      period: "December 2023 - February 2024",
      description:
        "Developed a prototype for real-time human fall detection in Python using OpenCV and TensorFlow.",
      location: "Hong Kong",
    },
  ];

  return (
    <div className="about-page fade-in">
      {/* Header Section */}
      <h1>About Me</h1>
      <section className="about-header">
        <div className="about-intro">
          <h3>Hey, I'm James!</h3>
          <p className="intro-text">
            I'm currently pursuing a Master's in Computer Science at Boston
            University and interning as a Software Engineer at Granite
            Telecommunications in Boston. I have a passion for solving various
            problems through coding, whether it is building web applications,
            automating tasks, or exploring new technologies.
          </p>
        </div>

        <div className="about-image">
          <img src="/images/myphoto.jpg" alt="About me" />
          <div className="image-placeholder" style={{ display: "none" }}>
            Professional Photo
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="education-section section">
        <h2>Education</h2>
        <div className="timeline">
          {education.map((item, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-content">
                <div className="timeline-header">
                  <h3 className="timeline-main">{item.degree}</h3>
                  <span className="timeline-secondary">{item.period}</span>
                </div>
                <div className="timeline-meta">
                  <span className="timeline-main">{item.school}</span>
                  <span className="timeline-secondary">{item.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section className="experience-section section">
        <h2>Experience</h2>
        <div className="timeline">
          {experience.map((item, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-content">
                <div className="timeline-header">
                  <h3 className="timeline-main">{item.title}</h3>
                  <span className="timeline-secondary">{item.period}</span>
                </div>
                <div className="timeline-meta">
                  <span className="timeline-main">{item.company}</span>
                  <span className="timeline-secondary">{item.location}</span>
                </div>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <CallToAction />
    </div>
  );
};

export default About;
