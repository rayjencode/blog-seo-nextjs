import UserSideNav from "./UserSideNav";

const UserDashboard = ({ children }) => {
  return (
    <React.Fragment>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 col-lg-3 my-5">
            <UserSideNav />
          </div>
          <div className="col-md-12 col-lg-9 my-5">{children}</div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UserDashboard;
