import Layout from "../../../components/Layout";
import Private from "../../../components/auth/Private";
import BlogUpdate from "../../../components/crud/BlogUpdate";
import UserDashboard from "../../../components/UserDashboard";

export const Blog = () => {
  return (
    <Layout>
      <UserDashboard>
        <Private>
          <div className="card card-body">
            <BlogUpdate />
          </div>
        </Private>
      </UserDashboard>
    </Layout>
  );
};

export default Blog;
