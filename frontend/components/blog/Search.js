import Link from "next/link";
import renderHTML from "react-render-html";
import { useState, useEffect } from "react";
import { listSearch } from "../../actions/blog";

const Search = () => {
  const [values, setValues] = useState({
    search: undefined,
    results: [],
    searched: false,
    message: ""
  });

  const { search, results, searched, message } = values;

  const searchForm = () => (
    <div className="container">
      <div className="row">
        <div className="col-md-7 mx-auto">
          <form onSubmit={searchSubmit} className="mt-5 py-0">
            <div className="input-group mb-3">
              <input
                type="search"
                className="form-control"
                placeholder="Search blog ..."
                onChange={handleChange}
              />
              <div className="input-group-append">
                <button className="btn btn-outline-secondary" type="submit">
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  const handleChange = e => {
    setValues({
      ...values,
      search: e.target.value,
      searched: false,
      results: []
    });
  };

  const searchedBlogs = (results = []) => {
    return (
      <div className="">
        {message && <p className="text-muted font-italic">{message}</p>}
        {results.map((blog, index) => {
          return (
            <li key={index} className="list-unstyled">
              <Link href={`/blogs/${blog.slug}`}>
                <a className="text-primary">{blog.title}</a>
              </Link>
            </li>
          );
        })}
      </div>
    );
  };

  const searchSubmit = e => {
    e.preventDefault();
    listSearch({ search }).then(data => {
      setValues({
        ...values,
        results: data,
        searched: true,
        message: `${data.length} blogs found`
      });
    });
  };

  return (
    <React.Fragment>
      {searchForm()}
      {searched && (
        <div className="row">
          <div className="col-md-5 mx-auto">{searchedBlogs(results)}</div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Search;
