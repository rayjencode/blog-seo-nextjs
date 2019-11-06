import Layout from "../../../components/Layout";
import Admin from "../../../components/auth/Admin";
import BlogRead from "../../../components/crud/BlogRead";
import Dashboard from "../../../components/Dashboard";
import Link from "next/link";

const Blogs = () => {
  return (
    <Layout>
      <Dashboard>
        <a href="/admin/crud/blog" className="btn btn-primary mb-4">
          Add Post
        </a>

        <Admin>
          <div className="card card-body">
            <BlogRead />
          </div>
        </Admin>
      </Dashboard>
    </Layout>
  );
};

export default Blogs;
