import Layout from "../../../components/Layout";
import Private from "../../../components/auth/Private";
import BlogCreate from "../../../components/crud/BlogCreate";
import UserDashboard from "../../../components/UserDashboard";

const CreateBlogUser = () => {
  return (
    <Layout>
      <UserDashboard>
        <Private>
          <div className="card card-body">
            <BlogCreate />
          </div>
        </Private>
      </UserDashboard>
    </Layout>
  );
};

export default CreateBlogUser;
