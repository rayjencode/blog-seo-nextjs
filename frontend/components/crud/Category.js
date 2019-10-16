import { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import { isAuth, getCookie } from "../../actions/auth";
import { create, getCategories, removeCategory } from "../../actions/category";

const Category = () => {
  const [values, setValues] = useState({
    name: "",
    error: false,
    success: false,
    categories: [],
    removed: false,
    reload: false
  });

  const { name, error, success, categories, removed, reload } = values;
  const token = getCookie("token");

  useEffect(() => {
    getCategories().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({ ...values, categories: data });
      }
    });
  }, [reload]);

  const showCategories = () => {
    return categories.map((item, index) => {
      return (
        <React.Fragment>
          <button
            key={index}
            onDoubleClick={() => handleDelete(item.slug)}
            title="Double Click to Delete"
            className="btn btn-outline-primary mx-1 my-3"
          >
            {item.name}
          </button>
        </React.Fragment>
      );
    });
  };

  const handleDelete = slug => {
    let answer = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (answer) {
      removeCategory(slug, token).then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          setValues({
            ...values,
            error: false,
            success: false,
            name: "",
            removed: !removed,
            reload: !reload
          });
        }
      });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    // console.log("Create Category", name);
    create({ name }, token).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          error: false,
          success: true,
          name: "",
          reload: !reload
        });
      }
    });
  };

  const handleChange = e => {
    setValues({
      ...values,
      name: e.target.value,
      error: false,
      success: false,
      removed: ""
    });
  };

  const showSuccess = () => {
    if (success) {
      return <div className="alert alert-success">Category is Created</div>;
    }
  };

  const showError = () => {
    if (error) {
      return <div className="alert alert-danger">Category already exist</div>;
    }
  };

  const showRemoved = () => {
    if (removed) {
      return <div className="alert alert-danger">Category is removed</div>;
    }
  };

  const newCategoryForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="text-muted">Category Name</label>
        <input
          type="text"
          className="form-control"
          onChange={handleChange}
          value={name}
          required
        />
      </div>
      <div className="form-group">
        <button type="submit" className="btn btn-primary ">
          Create Category
        </button>
      </div>
    </form>
  );

  return (
    <React.Fragment>
      {showSuccess()}
      {showError()}
      {showRemoved()}
      {newCategoryForm()}
      <div>
        <p>
          Note *: Double click the Category to{" "}
          <strong className="text-danger">Delete</strong>
        </p>
      </div>
      <div>{showCategories()}</div>
    </React.Fragment>
  );
};

export default Category;
