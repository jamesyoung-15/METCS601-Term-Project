import React, { useState } from "react";
import "./Contact.css";
import type { ContactFormData, FormErrors } from "../../types";
import DisplayTime from "../../components/DisplayTime/DisplayTime";

// contact form page
const Contact = () => {
  // State to manage form data and validation errors
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // State to manage form errors, submission status, and loading state
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  // Function to validate the form data
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Check if name, email, and message fields are filled out
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 5) {
      newErrors.message = "Message must be at least 5 characters long";
    }

    // If there are no errors, return true
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      // remove the error for the specific field
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    // Clear submit status when user starts typing
    if (submitStatus !== "idle") {
      setSubmitStatus("idle");
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    // Prevent default form submission behavior
    e.preventDefault();

    // Validate the form before submission
    if (!validateForm()) {
      return;
    }

    // If validation passes, proceed with form submission
    setIsSubmitting(true);
    setSubmitStatus("idle");

    // Send form to API Gateway, uploads to DynamoDB
    try {
      const response = await fetch(
        import.meta.env.VITE_API_ENDPOINT + "/upload",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Form submitted successfully:", result);

      // Reset form data and set status
      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render the contact form page
  return (
    <div className="contact-page fade-in">
      <h1>Contact Me</h1>
      <div className="contact-description">
        <p>
          Use the form below to contact me. I have also displayed my local time,
          you can expect a response from me around 1 week after you send.
        </p>
        <DisplayTime />
      </div>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-row">
          {/* Name */}
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`form-input ${errors.name ? "error" : ""}`}
              placeholder="Your Name"
            />
            {errors.name && (
              <span className="error-message">{errors.name}</span>
            )}
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`form-input ${errors.email ? "error" : ""}`}
              placeholder="youremail@example.com"
            />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>
        </div>

        {/* Subject (optional) */}
        <div className="form-group">
          <label htmlFor="subject" className="form-label">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            className="form-input"
            placeholder="What's this about?"
          />
        </div>

        {/* Message */}
        <div className="form-group">
          <label htmlFor="message" className="form-label">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            className={`form-textarea ${errors.message ? "error-message" : ""}`}
            placeholder="Your message or just say hello..."
            rows={6}
          />
          {errors.message && (
            <span className="error-message">{errors.message}</span>
          )}
        </div>

        {/* Submit Button */}
        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </div>
      </form>

      {/* Submission Status Messages */}
      {submitStatus === "success" && (
        <div className="alert success-message">
          <p>Thank you for your message! I'll get back to you soon.</p>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="alert error-message">
          <p>
            Sorry, there was an error sending your message. Please try again.
          </p>
        </div>
      )}
    </div>
  );
};

export default Contact;
