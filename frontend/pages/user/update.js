import Layout from "../../components/Layout";
import Private from "../../components/auth/Private";
import UserDashboard from "../../components/UserDashboard";
import ProfileUpdate from "../../components/auth//ProfileUpdate";
import Link from "next/link";

const UserProfileUpdate = () => {
  return (
    <Layout>
      <UserDashboard>
        <Private>
          <div className="card card-body">
            <ProfileUpdate />
          </div>
        </Private>
      </UserDashboard>
    </Layout>
  );
};

export default UserProfileUpdate;
