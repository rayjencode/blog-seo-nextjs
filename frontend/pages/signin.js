import Layout from "../components/Layout";
import SigninComponent from "../components/auth/SigninComponent";
import Link from "next/link";

const Signin = () => {
  return (
    <Layout>
      <div className="container">
        <div className="row my-5">
          <div className="col-md-6 offset-md-3">
            <div className="card card-body">
              <h2 className="text-center mb-4">Signin</h2>
              <SigninComponent />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Signin;
