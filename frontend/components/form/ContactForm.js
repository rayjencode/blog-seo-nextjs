import { useState } from "react";
import Link from "next/link";
import { emailContactForm } from "../../actions/form";

const ContactForm = ({ authorEmail }) => {
  const [values, setValues] = useState({
    message: "",
    name: "",
    email: "",
    sent: false,
    buttonText: "Send Message",
    success: false,
    error: false
  });

  const { message, name, email, sent, buttonText, success, error } = values;

  const handleSubmit = e => {
    e.preventDefault();
    setValues({ ...values, buttonText: "Sending..." });
    emailContactForm({ name, authorEmail, email, message }).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          sent: true,
          name: "",
          email: "",
          message: "",
          buttonText: "Sent",
          success: data.success
        });
      }
    });
  };

  const showSuccessMessage = () =>
    success && (
      <div className="alert alert-info">Thanks you for contacting us.</div>
    );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const handleChange = name => e => {
    setValues({
      ...values,
      [name]: e.target.value,
      error: false,
      success: false,
      buttonText: "Send Message"
    });
  };

  const contactForm = () => {
    return (
      <form className="mt-5" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            onChange={handleChange("name")}
            className="form-control"
            value={name}
          />
        </div>

        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            onChange={handleChange("email")}
            className="form-control"
            value={email}
          />
        </div>

        <div className="form-group">
          <textarea
            cols="30"
            rows="10"
            onChange={handleChange("message")}
            type="text"
            className="form-control"
            value={message}
            placeholder="Write something..."
            required
          ></textarea>
        </div>
        <button className="btn btn-primary">{buttonText}</button>
      </form>
    );
  };

  return (
    <React.Fragment>
      {showSuccessMessage()}
      {showError()}
      {contactForm()}
    </React.Fragment>
  );
};

export default ContactForm;
