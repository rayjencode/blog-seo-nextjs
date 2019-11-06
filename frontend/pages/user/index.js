import Layout from "../../components/Layout";
import Private from "../../components/auth/Private";
import Link from "next/link";
import UserDashboard from "../../components/UserDashboard";

const UserIndex = () => {
  return (
    <Layout>
      <Private>
        <UserDashboard>
          <h5>Welcome Dashboard User</h5>
        </UserDashboard>
      </Private>
    </Layout>
  );
};

export default UserIndex;
