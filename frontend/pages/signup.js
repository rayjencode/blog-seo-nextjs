import Layout from "../components/Layout";
import SignupComponent from "../components/auth/SignupComponent";
import Link from "next/link";

const Signup = () => {
  return (
    <Layout>
      <div className="container">
        <div className="row my-5">
          <div className="col-md-6 offset-md-3">
            <div className="card card-body">
              <h2 className="text-center mb-4">Signup</h2>
              <SignupComponent />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
