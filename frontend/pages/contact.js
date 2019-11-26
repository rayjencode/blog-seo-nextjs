import Layout from "../components/Layout";
import ContactForm from "../components/form/ContactForm";

const Contact = () => {
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <h3 className="mt-5">Contact Form</h3>
            <hr />
            <ContactForm />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
