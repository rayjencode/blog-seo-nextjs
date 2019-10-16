import Layout from "../../../components/Layout";
import Admin from "../../../components/auth/Admin";
import BlogCreate from "../../../components/crud/BlogCreate";
import Link from "next/link";
import Dashboard from "../../../components/Dashboard";

const Blog = () => {
  return (
    <Layout>
      <Dashboard>
        <Admin>
          <div className="card card-body">
            <BlogCreate />
          </div>
        </Admin>
      </Dashboard>
    </Layout>
  );
};

export default Blog;
