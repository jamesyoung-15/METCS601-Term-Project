import "./Resume.css";

const Resume = () => {
  const resumeUrl = "/resume/resume.pdf";
  const fileName = "Resume.pdf";

  const downloadResume = () => {
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.download = fileName;
    link.click();
  };

  const printResume = () => {
    window.open(resumeUrl, "_blank");
  };

  return (
    <div className="resume-page fade-in">
      <h1>Resume</h1>
      <p>Here is my resume in PDF format:</p>
      {/* PDF Viewer Section */}
      <section className="pdf-viewer-section">
        <div className="pdf-container">
          <iframe src={resumeUrl} title="Resume PDF" className="pdf-iframe" />
        </div>
        <div className="resume-actions">
          <button onClick={downloadResume} className="btn btn-primary">
            Download PDF
          </button>
          <button onClick={printResume} className="btn btn-secondary">
            Open in New Tab
          </button>
        </div>
      </section>
    </div>
  );
};

export default Resume;
