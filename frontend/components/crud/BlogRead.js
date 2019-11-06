import { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import { getCookie, isAuth } from "../../actions/auth";
import { list, removeBlog } from "../../actions/blog";
import moment from "moment";

const BlogRead = () => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState("");
  const token = getCookie("token");

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = () => {
    list().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setBlogs(data);
      }
    });
  };

  const deleteConfirm = (slug, title) => {
    let answer = window.confirm(
      `Are you sure you want to delete the post? "${title}"`
    );
    if (answer) {
      removeBlog(slug, token).then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          setMessage(data.message);
          loadBlogs();
        }
      });
    }
  };

  const showUpdateButton = blog => {
    if (isAuth() && isAuth().role === 0) {
      return (
        <Link href={`/user/crud/${blog.slug}`}>
          <a>
            <button className="btn btn-success">Update</button>
          </a>
        </Link>
      );
    } else if (isAuth() && isAuth().role === 1) {
      return (
        <Link href={`/admin/crud/${blog.slug}`}>
          <a>
            <button className="btn btn-sm btn-success">Update</button>
          </a>
        </Link>
      );
    }
  };

  const showAllBlogs = () => {
    return blogs.map((blog, index) => (
      <tr key={index}>
        <th scope="row">{index + 1}</th>
        <td>{blog.title}</td>
        <td>{blog.postedBy.name}</td>
        <td>{moment(blog.updatedAt).fromNow()}</td>
        <td>{showUpdateButton(blog)}</td>
        <td>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => deleteConfirm(blog.slug, blog.title)}
          >
            Delete
          </button>{" "}
        </td>
      </tr>
    ));
    console.log(blogs);
  };

  return (
    <React.Fragment>
      {message && <div className="alert alert-warning">{message}</div>}
      <table class="table">
        <thead class="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Blog Title</th>
            <th scope="col">Written by</th>
            <th scope="col">Published</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>

        <tbody>{showAllBlogs()}</tbody>
      </table>
    </React.Fragment>
  );
};

export default BlogRead;
