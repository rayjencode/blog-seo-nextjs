import { useState, useEffect } from "react";
import Link from "next/link";
import { Router, withRouter } from "next/router";
import dynamic from "next/dynamic";
import { getCookie, isAuth } from "../../actions/auth";
import { getCategories } from "../../actions/category";
import { getTags } from "../../actions/tags";
import { createBlog } from "../../actions/blog";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import { QuillModules, QuillFormats } from "../../helpers/quill";
// import "../../node_modules/react-quill/dist/quill.snow.css";

const BlogCreate = ({ router }) => {
  const blogFromLS = () => {
    if (typeof window === "undefined") {
      return false;
    }

    if (localStorage.getItem("blog")) {
      return JSON.parse(localStorage.getItem("blog"));
    } else {
      return false;
    }
  };

  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [checkedCat, setCheckedCat] = useState([]); // store the Category id
  const [checkedTag, setCheckedTag] = useState([]); // store the Tags id
  const [body, setBody] = useState(blogFromLS());
  const [values, setValues] = useState({
    title: "",
    error: "",
    sizeError: "",
    success: "",
    formData: "",
    hidePublishButton: false
  });

  const {
    title,
    error,
    sizeError,
    success,
    formData,
    hidePublishButton
  } = values;

  const token = getCookie("token");

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
    initCategories();
    initTags();
  }, [router]);

  const initCategories = () => {
    getCategories().then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setCategories(data);
      }
    });
  };

  const initTags = () => {
    getTags().then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setTags(data);
      }
    });
  };

  const publishBlog = e => {
    e.preventDefault();
    // console.log("ready to publish");
    createBlog(formData, token).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          title: "",
          error: "",
          success: `A new blog title "${data.title}" is created`
        });
        setBody("");
        setCategories([]);
        setTags([]);
      }
    });
  };

  const handleChange = name => e => {
    const value = name == "photo" ? e.target.files[0] : e.target.value;
    formData.set(name, value);
    setValues({
      ...values,
      [name]: value,
      formData,
      error: ""
    });
  };

  const handleBody = e => {
    setBody(e);
    formData.set("body", e);
    if (typeof window !== "undefined") {
      localStorage.setItem("blog", JSON.stringify(e));
    }
  };

  const handleToggle = cat_id => () => {
    setValues({ ...values, error: "" });
    // return the first index or -1

    const clickedCategory = checkedCat.indexOf(cat_id);
    const all = [...checkedCat];

    if (clickedCategory === -1) {
      all.push(cat_id);
    } else {
      all.splice(clickedCategory, 1);
    }

    console.log(all);
    setCheckedCat(all);
    formData.set("categories", all);
  };

  const handleToggleTag = tag_id => () => {
    setValues({ ...values, error: "" });

    const clickedTag = checkedTag.indexOf(tag_id);
    const all = [...checkedTag];

    if (clickedTag === -1) {
      all.push(tag_id);
    } else {
      all.splice(clickedTag, 1);
    }

    console.log(all);
    setCheckedTag(all);
    formData.set("tags", all);
  };

  const showCategories = () => {
    return (
      categories &&
      categories.map((cat, index) => (
        <li key={index} className="list-unstyled">
          <input
            onChange={handleToggle(cat._id)}
            type="checkbox"
            className="mr-2"
          />
          <label className="form-check-label">{cat.name}</label>
        </li>
      ))
    );
  };

  const showTags = () => {
    return (
      tags &&
      tags.map((tag, index) => (
        <li key={index} className="list-unstyled">
          <input
            onChange={handleToggleTag(tag._id)}
            type="checkbox"
            className="mr-2"
          />
          <label className="form-check-label">{tag.name}</label>
        </li>
      ))
    );
  };

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-success"
      style={{ display: success ? "" : "none" }}
    >
      {success}
    </div>
  );

  const createBlogForm = () => {
    return (
      <form onSubmit={publishBlog}>
        <div className="form-group">
          <div className="d-flex justify-content-between">
            <h3>Add New Post</h3>
            <div>
              <div className="d-flex">
                <button type="submit" className="btn btn-outline-primary">
                  Preview
                </button>
                <button type="submit" className="btn btn-primary ml-2">
                  Publish
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={handleChange("title")}
            placeholder="Title"
          />
        </div>
        <div className="form-group">
          <ReactQuill
            modules={QuillModules}
            formats={QuillFormats}
            value={body}
            placeholder="Write something..."
            onChange={handleBody}
          />
        </div>
      </form>
    );
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-12 col-lg-9">
          {showError()}
          {showSuccess()}
          {createBlogForm()}
        </div>
        <div className="col-md-12 col-lg-3">
          <div className="card card-body">
            <img
              className="w-100 pb-3"
              src="https://kare.ee/images/no-image.jpg"
              alt=""
            />
            <small className="mb-3">Set Featured Image: Max size: 1mb</small>
            <label className="btn btn-outline-info">
              Upload featured image
              <input
                type="file"
                accept="image/*"
                className="btn btn-secondary"
                onChange={handleChange("photo")}
                hidden
              />
            </label>
          </div>
          <div className="card card-body mt-3">
            <h5>Categories</h5>
            <ul
              style={{ maxHeight: "200px", overflowY: "scroll" }}
              className="px-0"
            >
              {showCategories()}
            </ul>
          </div>
          <div className="card card-body mt-3">
            <h5>Tags</h5>
            <ul
              style={{ maxHeight: "200px", overflowY: "scroll" }}
              className="px-0"
            >
              {showTags()}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(BlogCreate);
