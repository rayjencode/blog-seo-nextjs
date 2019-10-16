import Layout from "../../components/Layout";
import Private from "../../components/auth/Private";
import Link from "next/link";

const UserIndex = () => {
  return (
    <Layout>
      <Private>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3 my-5">
              <ul className="list-group">
                <li className="list-group-item active">User Dashboard</li>
                <li className="list-group-item">Dapibus ac facilisis in</li>
                <li className="list-group-item">Morbi leo risus</li>
                <li className="list-group-item">Porta ac consectetur ac</li>
                <li className="list-group-item">Vestibulum at eros</li>
              </ul>
            </div>
            <div className="col-md-9 my-5">
              <p>right</p>
            </div>
          </div>
        </div>
      </Private>
    </Layout>
  );
};

export default UserIndex;
