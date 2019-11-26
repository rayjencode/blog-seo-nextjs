import { useState } from "react";
import Link from "next/link";
import Router from "next/router";
import NProgress from "nprogress";

Router.onRouteChangeStart = url => NProgress.start();
Router.onRouteChangeComplete = url => NProgress.done();
Router.onRouteChangeError = url => NProgress.done();

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <ul className="list-group">
      <li className="list-group-item active">Admin Dashboard</li>
      <li className="list-group-item">
        <Link href="/admin/crud/blogs">
          <a>Posts</a>
        </Link>
      </li>
      <li className="list-group-item">
        <Link href="/admin/crud/category-tag">
          <a>Category </a>
        </Link>
      </li>
      <li className="list-group-item">
        <Link href="/admin/crud/category-tag">
          <a>Tags </a>
        </Link>
      </li>

      <li className="list-group-item">
        <Link href="/user/update">
          <a>User Profile</a>
        </Link>
      </li>
      <li className="list-group-item">
        <Link href="/admin/crud/settings">
          <a>Settings</a>
        </Link>
      </li>
    </ul>
  );
};

export default SideNav;
