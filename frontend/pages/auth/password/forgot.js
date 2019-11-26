import { useState } from "react";
import Layout from "../../../components/Layout";
import { forgotPassword } from "../../../actions/auth";

export const ForgotPassword = () => {
  const [values, setValues] = useState({
    email: "",
    message: "",
    error: "",
    showForm: true
  });

  const { email, message, error, showForm } = values;

  const handleChange = name => e => {
    setValues({ ...values, message: "", error: "", [name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setValues({ ...values, message: "", error: "" });
    forgotPassword({ email }).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          message: data.message,
          email: "",
          showForm: false
        });
      }
    });
  };

  const showError = () =>
    error ? <div className="alert alert-danger">{error}</div> : "";

  const showMessage = () =>
    message ? <div className="alert alert-success">{message}</div> : "";

  const passwordForgotForm = () => {
    return (
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="form-group pt-5">
            <input
              type="email"
              className="form-control"
              onChange={handleChange("email")}
              values={email}
              placeholder="Enter Email"
              required
            />
          </div>
          <button className="btn btn-primary">Send password reset link</button>
        </form>
      </div>
    );
  };

  return (
    <Layout>
      <div className="container">
        <h3>Forgot Password</h3>
        <hr />
        {showError()}
        {showMessage()}
        {showForm && passwordForgotForm()}
      </div>
    </Layout>
  );
};

export default ForgotPassword;
