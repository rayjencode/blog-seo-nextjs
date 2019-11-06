import Link from "next/link";
import { useState, useEffect } from "react";
import Router from "next/router";
import dynamic from "next/dynamic";
import { withRouter } from "next/router";
import { getCookie, isAuth } from "../../actions/auth";
import { getCategories } from "../../actions/category";
import { getTags } from "../../actions/tags";
import { singleBlog, updateBlog } from "../../actions/blog";
import { API } from "../../config";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import { QuillModules, QuillFormats } from "../../helpers/quill";
// import "../../node_modules/react-quill/dist/quill.snow.css";

const BlogUpdate = ({ router }) => {
  const [body, setBody] = useState("");
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  const [checked, setCheckedCat] = useState([]);
  const [checkedTag, setCheckedTag] = useState([]);

  const [values, setValues] = useState({
    title: "",
    error: "",
    success: "",
    formData: "",
    title: "",
    body: ""
  });

  const { error, success, formData, title } = values;
  const token = getCookie("token");

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
    initBlog();
    initCategories();
    initTags();
  }, [router]);

  const initBlog = () => {
    if (router.query.slug) {
      singleBlog(router.query.slug).then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          setValues({ ...values, title: data.title });
          setBody(data.body);
          setCategoriesArray(data.categories);
          setTagsArray(data.tags);
        }
      });
    }
  };

  const setCategoriesArray = blogCategories => {
    let catArray = [];
    blogCategories.map((cat, index) => {
      catArray.push(cat._id);
    });
    setCheckedCat(catArray);
  };

  const setTagsArray = blogTags => {
    let tagArray = [];
    blogTags.map((tag, index) => {
      tagArray.push(tag._id);
    });
    setCheckedTag(tagArray);
  };

  const findOutCategory = cat => {
    const result = checked.indexOf(cat);
    if (result !== -1) {
      return true;
    } else {
      return false;
    }
  };

  const findOutTag = tag => {
    const result = checkedTag.indexOf(tag);
    if (result !== -1) {
      return true;
    } else {
      return false;
    }
  };

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

  const showCategories = () => {
    return (
      categories &&
      categories.map((cat, index) => (
        <li key={index} className="list-unstyled">
          <input
            type="checkbox"
            className="mr-2"
            checked={findOutCategory(cat._id)}
            onChange={handleToggleCat(cat._id)}
          />
          <label className="form-check-label">{cat.name}</label>
        </li>
      ))
    );
  };

  const handleToggleCat = cat => () => {
    setValues({ ...values, error: "" });
    // return the first index or -1
    const clickedCategory = checked.indexOf(cat);
    const all = [...checked];

    if (clickedCategory === -1) {
      all.push(cat);
    } else {
      all.splice(clickedCategory === -1);
    }
    console.log(all);
    setCheckedCat(all);
    formData.set("categories", all);
  };

  const showTags = () =>
    tags &&
    tags.map((tag, index) => (
      <li key={index} className="list-unstyled">
        <input
          type="checkbox"
          className="mr-2"
          checked={findOutTag(tag._id)}
          onChange={handleToggleTag(tag._id)}
        />
        <label className="form-check-label">{tag.name}</label>
      </li>
    ));

  const handleToggleTag = tag => () => {
    setValues({ ...values, error: "" });
    const clickedTag = checkedTag.indexOf(tag);
    const all = [...checkedTag];

    if (clickedTag === -1) {
      all.push(tag);
    } else {
      all.splice(clickedTag, 1);
    }
    console.log(all);
    setCheckedTag(all);
    formData.set("tags", all);
  };

  const handleBody = e => {
    setBody(e);
    formData.set("body", e);
  };

  const handleChange = name => e => {
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value, formData, error: "" });
  };

  const editBlog = e => {
    e.preventDefault();
    updateBlog(formData, token, router.query.slug).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          title: "",
          success: `Blog titled: "${data.title}" is succesfully Updated.`
        });
        // if (isAuth() && isAuth().role === 1) {
        //   Router.replace(`/admin/crud/${router.query.slug}`);
        // } else if (isAuth() && isAuth().role === 0) {
        //   Router.replace(`/user/crud${router.query.slug}`);
        // }
      }
    });
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

  const updateBlogForm = () => {
    return (
      <React.Fragment>
        <form onSubmit={editBlog}>
          <div className="form-group">
            <div className="d-flex justify-content-between">
              <h3>Update Post</h3>
              <div>
                <div className="d-flex">
                  <Link href={`/blogs/${router.query.slug}`}>
                    <a>
                      <button type="submit" className="btn btn-outline-primary">
                        Preview
                      </button>
                    </a>
                  </Link>
                  <button type="submit" className="btn btn-primary ml-2">
                    Update
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
            />
          </div>
          <div className="form-group">
            <ReactQuill
              modules={QuillModules}
              formats={QuillFormats}
              value={body}
              onChange={handleBody}
            />
          </div>
        </form>
      </React.Fragment>
    );
  };

  return (
    <div className="row">
      <div className="col-md-12 col-lg-9">
        {showError()}
        {showSuccess()}
        {updateBlogForm()}
      </div>
      <div className="col-md-12 col-lg-3">
        <div className="card card-body">
          {body && (
            <img
              className="w-100 pb-3"
              src={`${API}/blog/photo/${router.query.slug}`}
              alt={title}
            />
          )}

          <small className="mb-3">Set Featured Image: Max size: 1mb</small>
          <label className="btn btn-outline-info">
            Upload featured image
            <input
              type="file"
              accept="image/*"
              className="btn btn-secondary"
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
  );
};

export default withRouter(BlogUpdate);
