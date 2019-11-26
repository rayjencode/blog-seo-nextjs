import { useState, useEffect } from "react";
import { signin, authenticate, isAuth } from "../../actions/auth";
import Router from "next/router";
import Link from "next/link";
import LoginGoogle from "./LoginGoogle";

const SigninComponent = () => {
  const [values, setValues] = useState({
    email: "krisha@gmail.com",
    password: "222222",
    error: "",
    loading: false,
    message: "",
    showForm: true
  });

  const { email, password, error, loading, message, showForm } = values;

  useEffect(() => {
    isAuth() && Router.push(`/`);
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    setValues({
      ...values,
      loading: true,
      error: false
    });

    const user = { email, password };

    signin(user).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        //    Save User Token to Cookie
        // save user info to Local
        // authenticate
        authenticate(data, () => {
          if (isAuth() && isAuth().role === 1) {
            Router.push("/admin");
          } else {
            Router.push("/user");
          }
        });
      }
    });
  };
  const handleChange = name => e => {
    setValues({
      ...values,
      error: false,
      [name]: e.target.value
    });
  };

  const showLoading = () =>
    loading ? <div className="alert alert-info">Loading...</div> : "";

  const showError = () =>
    error ? <div className="alert alert-danger">{error}</div> : "";

  const showMessage = () =>
    message ? <div className="alert alert-info">{message}</div> : "";

  const signinForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            onChange={handleChange("email")}
            value={email}
            placeholder="Enter Email"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            onChange={handleChange("password")}
            value={password}
            placeholder="Enter password"
          />
        </div>

        <button className="btn btn-secondary btn-block mb-3">SignIn</button>
        <Link href="/auth/password/forgot">
          <a>Forgot Password</a>
        </Link>
      </form>
    );
  };
  return (
    <React.Fragment>
      {showError()}
      {showLoading()}
      {showMessage()}

      {showForm && signinForm()}
      <br />
      <LoginGoogle />
      <br />
    </React.Fragment>
  );
};

export default SigninComponent;

// import { useState } from "react";
// import { signin, authenticate } from "../../actions/auth";
// import Router from "next/router";

// const SigninComponent = () => {
//   const [values, setValues] = useState({
//     email: "ryan@gmail.com",
//     password: "rrrrrr",
//     error: "",
//     loading: false,
//     message: "",
//     showForm: true
//   });

//   const { email, password, error, loading, message, showForm } = values;

//   const handleSubmit = e => {
//     e.preventDefault();
//     // console.table({ name, email, password, error, loading, message, showForm });
//     setValues({ ...values, loading: true, error: false });
//     const user = { email, password };

//     signin(user).then(data => {
//       if (data.error) {
//         setValues({ ...values, error: data.error, loading: false });
//       } else {
//         // save user token to cookie
//         // save user info to localstorage
//         // authenticate user
//         authenticate(data, () => {
//           Router.push(`/`);
//         });
//       }
//     });
//   };

//   const handleChange = name => e => {
//     setValues({ ...values, error: false, [name]: e.target.value });
//   };

//   const showLoading = () =>
//     loading ? <div className="alert alert-info">Loading...</div> : "";
//   const showError = () =>
//     error ? <div className="alert alert-danger">{error}</div> : "";
//   const showMessage = () =>
//     message ? <div className="alert alert-info">{message}</div> : "";

//   const signinForm = () => {
//     return (
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <input
//             value={email}
//             onChange={handleChange("email")}
//             type="email"
//             className="form-control"
//             placeholder="Type your email"
//           />
//         </div>

//         <div className="form-group">
//           <input
//             value={password}
//             onChange={handleChange("password")}
//             type="password"
//             className="form-control"
//             placeholder="Type your password"
//           />
//         </div>

//         <div>
//           <button className="btn btn-primary">Signup</button>
//         </div>
//       </form>
//     );
//   };

//   return (
//     <React.Fragment>
//       {showError()}
//       {showLoading()}
//       {showMessage()}
//       {showForm && signinForm()}
//     </React.Fragment>
//   );
// };

// export default SigninComponent;
