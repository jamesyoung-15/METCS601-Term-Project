import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>METCS601 Term Project</p>
        <p>&copy; 2025 James Young</p>
        <a
          className="footer-link"
          href="https://github.com/jamesyoung-15/METCS601-Term-Project/"
          target="_blank"
        >
          Project Source Code
        </a>
      </div>
    </footer>
  );
};

export default Footer;
