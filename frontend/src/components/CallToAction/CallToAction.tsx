import { Link } from "react-router-dom";
import "./CallToAction.css";

// Call to action component, just gonna use this to link to the contact page maybe change?
const CallToAction = () => {
  {
    /* CTA Section */
  }
  return (
    <section className="cta-section">
      <div className="cta-content">
        <h2>Let's Connect!</h2>
        <p>
          If you want to reach out to me, whether it's for work or just a chat,
          feel free to contact me. I'm always open to new opportunities and
          discussions.
        </p>
        <Link to="/contact" className="btn btn-primary">
          Contact Me
        </Link>
      </div>
    </section>
  );
};

export default CallToAction;
