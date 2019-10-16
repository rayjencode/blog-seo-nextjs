import { useState, useEffect } from "react";
import { isAuth, getCookie } from "../../actions/auth";
import { create, getTags, removeTags } from "../../actions/tags";

const Tags = () => {
  const [values, setValues] = useState({
    name: "",
    error: false,
    success: false,
    tags: [],
    removed: false,
    reload: false
  });
  const { name, error, success, tags, removed, reload } = values;
  const token = getCookie("token");

  useEffect(() => {
    getTags().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({ ...values, tags: data });
      }
    });
  }, [reload]);

  const showTags = () => {
    return tags.map((item, index) => {
      return (
        <React.Fragment>
          <button
            key={index}
            onDoubleClick={() => handleDelete(item.slug)}
            title="Double Click to Delete"
            className="btn btn-outline-primary mx-1 my-1"
          >
            {item.name}
          </button>
        </React.Fragment>
      );
    });
  };

  const handleDelete = slug => {
    let answer = window.confirm("Are you sure you want to delete this tag?");
    if (answer) {
      removeTags(slug, token).then(data => {
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
      return <div className="alert alert-success">Tag is Created</div>;
    }
  };

  const showError = () => {
    if (error) {
      return <div className="alert alert-danger">Tag is already exist</div>;
    }
  };

  const showRemoved = () => {
    if (removed) {
      return <div className="alert alert-danger">Tag is removed</div>;
    }
  };

  const newTagForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="text-muted">Tag Name</label>
        <input
          type="text"
          className="form-control"
          onChange={handleChange}
          value={name}
          required
        />
      </div>
      <div className="form-group">
        <button type="submit" className="btn btn-primary">
          Create Tag
        </button>
      </div>
    </form>
  );

  return (
    <React.Fragment>
      {showSuccess()}
      {showError()}
      {showRemoved()}
      {newTagForm()}

      <div>
        <p>
          Note: * Double Click the Tag to{" "}
          <strong className="text-danger">Delete</strong>
        </p>
      </div>
      <div>{showTags()}</div>
    </React.Fragment>
  );
};

export default Tags;
