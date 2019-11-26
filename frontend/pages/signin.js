import Layout from "../components/Layout";
import SigninComponent from "../components/auth/SigninComponent";
import { withRouter } from "next/router";

const Signin = ({ router }) => {
  const showRedirectMessage = () => {
    if (router.query.message) {
      return <div className="alert alert-danger">{router.query.message}</div>;
    } else {
      return;
    }
  };
  return (
    <Layout>
      <div className="container">
        <div className="row my-5">
          <div className="col-md-6 offset-md-3">
            <div className="card card-body">
              <h2 className="text-center mb-4">Signin</h2>
              {showRedirectMessage()}
              <SigninComponent />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default withRouter(Signin);
