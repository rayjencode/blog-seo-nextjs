import Layout from "../../../components/Layout";
import Dashboard from "../../../components/Dashboard";
import Admin from "../../../components/auth/Admin";
import UserProfile from "../../../components/crud/Profile";

const Profile = () => {
  return (
    <Layout>
      <Dashboard>
        <Admin>
          <div className="container">
            <div className="card card-body">
              <UserProfile />
            </div>
          </div>
        </Admin>
      </Dashboard>
    </Layout>
  );
};

export default Profile;
