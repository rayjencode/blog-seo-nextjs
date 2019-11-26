import { useState } from "react";
import Link from "next/link";
import Router from "next/router";
import NProgress from "nprogress";

Router.onRouteChangeStart = url => NProgress.start();
Router.onRouteChangeComplete = url => NProgress.done();
Router.onRouteChangeError = url => NProgress.done();

const UserSideNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <ul className="list-group">
      <li className="list-group-item active">User Dashboard</li>
      <li className="list-group-item">
        <Link href="/user/crud/blogs">
          <a>Posts</a>
        </Link>
      </li>

      <li className="list-group-item">
        <Link href="/user/update">
          <a> Profile</a>
        </Link>
      </li>
      <li className="list-group-item">
        <Link href="/user/crud/settings">
          <a>Settings</a>
        </Link>
      </li>
    </ul>
  );
};

export default UserSideNav;
