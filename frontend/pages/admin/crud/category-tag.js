import Layout from "../../../components/Layout";
import Dashboard from "../../../components/Dashboard";
import Admin from "../../../components/auth/Admin";
import Category from "../../../components/crud/Category";
import Tags from "../../../components/crud/Tags";

const CategoryTag = () => {
  return (
    <Layout>
      <Dashboard>
        <Admin>
          <div className="container">
            <div className="card">
              <div className="card-body">
                <Category />
              </div>
            </div>
            <div className="card card-body mt-5">
              <Tags />
            </div>
          </div>
        </Admin>
      </Dashboard>
    </Layout>
  );
};

export default CategoryTag;
