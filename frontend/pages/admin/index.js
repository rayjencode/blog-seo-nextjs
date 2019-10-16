import Layout from "../../components/Layout";
import Admin from "../../components/auth/Admin";
import Dashboard from "../../components/Dashboard";
import Link from "next/link";

const Adminindex = () => {
  return (
    <Layout>
      <Admin>
        <Dashboard>
          <h5>Welcome Dashboard</h5>
        </Dashboard>
      </Admin>
    </Layout>
  );
};

export default Adminindex;
