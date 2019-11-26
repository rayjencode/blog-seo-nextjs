import Layout from "../../../components/Layout";
import Private from "../../../components/auth/Private";
import BlogRead from "../../../components/crud/BlogRead";
import UserDashboard from "../../../components/UserDashboard";
import { isAuth } from "../../../actions/auth";

const Blogs = () => {
  const username = isAuth() && isAuth().username;
  return (
    <Layout>
      <UserDashboard>
        <a href="/user/crud/blog" className="btn btn-primary mb-4">
          Add Post
        </a>

        <Private>
          <div className="card card-body">
            <BlogRead username={username} />
          </div>
        </Private>
      </UserDashboard>
    </Layout>
  );
};

export default Blogs;
