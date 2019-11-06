import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import { useState, useEffect } from "react";
import { singleBlog, listRelated } from "../../actions/blog";
import { getCategories } from "../../actions/category";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";
import moment from "moment";
import renderHtml from "react-render-html";

const SingleBlog = ({ blog, query }) => {
  const head = () => (
    <Head>
      <title>
        {blog.title} | {APP_NAME}
      </title>
      <meta name="description" content={blog.metaDesc} />
      <link rel="canonical" href={`${DOMAIN}/blogs/${query.slug}`} />

      {/* Open Graph for social media link */}
      <meta property="og:title" content={`${blog.title} | ${APP_NAME}`} />
      <meta property="og:description" content={blog.metaDesc} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}/blogs/${query.slug}`} />
      <meta property="og:site_name" content={`${APP_NAME}`} />

      <meta property="og:image" content={`${API}/blog/photo/${blog.slug}`} />
      <meta
        property="og:image:secure_url"
        content={`${API}/blog/photo/${blog.slug}`}
      />
      <meta property="og:image:type" content="image/jpg" />
      <meta property="fb:app_id" content={`${FB_APP_ID}`} />
    </Head>
  );
  const [related, setRelated] = useState([]);
  const [categories, setCategories] = useState([]);

  const loadRelated = () => {
    listRelated({ blog }).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setRelated(data);
      }
    });
  };

  useEffect(() => {
    loadRelated();
    initCategories();
  }, []);

  const showBlogTags = () => {
    return blog.tags.map((tag, index) => (
      <li key={index} className="list-unstyled list-inline-item">
        <Link href={`/tags/${tag.slug}`}>
          <a className="badge badge-danger py-2 px-2 h-100">{tag.slug}</a>
        </Link>
      </li>
    ));
  };

  const initCategories = () => {
    getCategories().then(data => {
      if (data.error) {
        console.log("Error to load categories");
      } else {
        setCategories(data);
      }
    });
  };

  const showCategories = () => {
    return categories.map((cat, index) => (
      <li key={index} className="my-2 ml-3">
        <div className="d-flex justify-content-between">
          <Link href={`/categories/${cat.slug}`}>
            <a className="text-capitalize">{cat.name}</a>
          </Link>
          <p>(5)</p>
        </div>
      </li>
    ));
  };

  const showRelatedBlogs = () => {
    return related.map((blog, index) => (
      <li key={index}>
        <hr />
        <Link href={`/blogs/${blog.slug}`}>
          <img
            style={{ cursor: "pointer" }}
            className="w-100 my-3"
            src={`${API}/blog/photo/${blog.slug}`}
            alt={blog.title}
          />
        </Link>
        <Link href={`/blogs/${blog.slug}`}>
          <a className="lead">
            <h5>
              <strong>{blog.title}</strong>
            </h5>
          </a>
        </Link>

        <p>
          <small className="text-alert">
            Published: {moment(blog.updatedAt).fromNow()} by
            <Link href={`/profile/${blog.postedBy.username}`}>
              <a> {blog.postedBy.username}</a>
            </Link>
          </small>
        </p>
      </li>
    ));
  };

  return (
    <React.Fragment>
      {head()}
      <Layout>
        <main>
          <div className="container-fluid mx-0 px-0">
            <section className="text-center my-5">
              <h1>{blog.title}</h1>
              <small>
                Published: {moment(blog.updatedAt).fromNow()} by{" "}
                <Link href={`/profile/${blog.postedBy.username}`}>
                  <a>{blog.postedBy.username}</a>
                </Link>
              </small>
              <ul className="mt-3">
                <strong>Tags: </strong>
                {showBlogTags()}
              </ul>
              <img
                className="w-100 my-5 img img-fluid featured-image"
                src={`${API}/blog/photo/${blog.slug}`}
                alt={blog.title}
              />
            </section>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-md-8 mb-5">
                <div className="lead">{renderHtml(blog.body)}</div>

                <hr />
                <div>
                  <p>Show Comments</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search blog ..."
                    aria-describedby="button-addon2"
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      id="button-addon2"
                    >
                      Search
                    </button>
                  </div>
                </div>
                <hr />
                <h5>CATEGORIES</h5>
                <ul className="list-unstyled">{showCategories()}</ul>
                <hr />
                <h5>RELATED BLOGS</h5>
                <ul className="list-unstyled">{showRelatedBlogs()}</ul>
              </div>
            </div>
          </div>
        </main>
      </Layout>
    </React.Fragment>
  );
};

SingleBlog.getInitialProps = ({ query }) => {
  return singleBlog(query.slug).then(data => {
    if (data.error) {
      console.log(data.error);
    } else {
      return { blog: data, query };
    }
  });
};

export default SingleBlog;
