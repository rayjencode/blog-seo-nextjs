import Link from "next/link";
import { useState, useEffect } from "react";
import Router from "next/router";
import { getCookie, isAuth } from "../../actions/auth";
import { getProfile, update } from "../../actions/user";

const ProfileUpdate = () => {
  const [values, setValues] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    about: "",
    error: false,
    success: false,
    loading: false,
    photo: "",
    userData: ""
  });

  const token = getCookie("token");
  const {
    username,
    name,
    email,
    password,
    about,
    error,
    success,
    loading,
    photo,
    userData
  } = values;

  const init = () => {
    getProfile(token).then(data => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error
        });
      } else {
        setValues({
          ...values,
          username: data.username,
          name: data.name,
          email: data.email,
          about: data.about
        });
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  const handleChange = name => e => {
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    let userFormData = new FormData();
    userFormData.set(name, value);
    setValues({
      ...values,
      [name]: value,
      userData: userFormData,
      error: false,
      success: false
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setValues({ ...values, loading: true });
    update(token, userData).then(data => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          success: false,
          loading: false
        });
      } else {
        setValues({
          ...values,
          username: data.username,
          name: data.name,
          email: data.email,
          about: data.about,
          success: true,
          loading: false
        });
      }
    });
  };

  const profileUpdateForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="btn btn-outline-info">
          Profile Photo
          <input
            type="file"
            accept="image/*"
            className="form-control"
            onChange={handleChange("photo")}
            hidden
          />
        </label>
      </div>

      <div className="form-group">
        <input
          onChange={handleChange("username")}
          type="text"
          value={username}
          placeholder="Username"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          type="text"
          value={name}
          placeholder="Name"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("email")}
          type="email"
          value={email}
          placeholder="Email"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("about")}
          value={about}
          className="form-control"
          cols="30"
          rows="10"
          placeholder="About"
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("password")}
          type="password"
          value={password}
          placeholder="Password"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  );

  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <img
                  className="w-100"
                  src="https://sc01.alicdn.com/kf/HTB1Yh0PQVXXXXb_XXXXq6xXFXXXU/Wholesale-new-sexy-ladies-colorful-sexy-model.jpg"
                  alt="photo"
                />
              </div>
            </div>
          </div>
          <div className="col-md-8">{profileUpdateForm()}</div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProfileUpdate;
