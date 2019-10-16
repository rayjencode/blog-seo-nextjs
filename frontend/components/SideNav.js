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
        <Link href="/admin/crud/category-tag">
          <a>Create Category & Tags</a>
        </Link>
      </li>
      <li className="list-group-item">
        <Link href="/admin/crud/blog">
          <a>Create Blog</a>
        </Link>
      </li>
      <li className="list-group-item">
        <Link href="/admin/crud/profile">
          <a>Update Profile</a>
        </Link>
      </li>
    </ul>
  );
};

export default SideNav;
