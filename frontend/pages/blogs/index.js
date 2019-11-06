import Head from "next/head";
import Link from "next/link";
import { withRouter } from "next/router";
import Layout from "../../components/Layout";
import { useState } from "react";
import { listBlogsWithCategoriesAndTags } from "../../actions/blog";
import CardBlog from "../../components/blog/CardBlog";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";
import renderHtml from "react-render-html";
import moment from "moment";

const Blogs = ({
  blogs,
  categories,
  tags,
  totalBlogs,
  blogSkip,
  blogsLimit,
  router
}) => {
  const head = () => (
    <Head>
      <title>Programming Blogs | {APP_NAME}</title>
      <meta
        name="description"
        content="Programming blogs and tutorials on react node next vue php laravel and web development"
      />
      <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />

      {/* Open Graph for social media link */}
      <meta
        property="og:title"
        content={`Latest web development tutorials | ${APP_NAME}`}
      />
      <meta
        property="og:description"
        content="Programming blogs and tutorials on react node next vue php laravel and web development"
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
      <meta property="og:site_name" content={`${APP_NAME}`} />

      <meta
        property="og:image"
        content={`${DOMAIN}/static/images/seo-blog.jpg`}
      />
      <meta
        property="og:image:secure_url"
        content={`${DOMAIN}/static/images/seo-blog.jpg`}
      />
      <meta property="og:image:type" content="image/jpg" />
      <meta property="fb:app_id" content={`${FB_APP_ID}`} />
    </Head>
  );

  const [limit, setLimit] = useState(blogsLimit);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(totalBlogs);
  const [loadedBlogs, setLoadedBlogs] = useState([]);

  const loadMore = () => {
    let toSkip = skip + limit;
    listBlogsWithCategoriesAndTags(toSkip, limit).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setLoadedBlogs([...loadedBlogs, ...data.blogs]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button
          className="btn btn-outline-secondary btn-block my-5"
          onClick={loadMore}
        >
          Load More..
        </button>
      )
    );
  };

  const showAllBlogs = () => {
    return blogs.map((blog, index) => (
      <li key={index} className="lead mb-5">
        <CardBlog blog={blog} />
      </li>
    ));
  };

  const showLoadedBlogs = () =>
    loadedBlogs.map((blog, index) => (
      <li key={index} className="lead mb-5">
        <CardBlog blog={blog} />
      </li>
    ));

  const showCategories = () => {
    return categories.map((cat, index) => (
      <li key={index}>
        <div className="d-flex justify-content-between">
          <Link href={`/categories/${cat.slug}`}>
            <a className="text-capitalize">{cat.name}</a>
          </Link>
          <p>(5)</p>
        </div>
      </li>
    ));
  };
  const showRecentBlogs = () => {
    return blogs.map((blog, index) => (
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
          <a>
            <h5>
              {" "}
              <strong>{blog.title}</strong>
            </h5>
          </a>
        </Link>
        <p>
          <small className="text-danger">
            Publish: {moment(blog.updatedAt).fromNow()} by{" "}
            <Link href={`/profile/${blog.postedBy.username}`}>
              <a>{blog.postedBy.username}></a>
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
          <div className="container">
            <header className="my-5">
              <h1 className="display-4 font-weight-bold text-center">
                Programming Blogs and Tutorials
              </h1>
              <p className="text-center my-4">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor
                dolores ea quia! Voluptates, quo.
              </p>
            </header>
          </div>
          <div className="container">
            <div className="row">
              <div className="col md-8">
                <ul className="list-unstyled">{showAllBlogs()}</ul>
                <ul className="list-unstyled">{showLoadedBlogs()}</ul>
                <div className="row">
                  <div className="col-md-6 mx-auto">{loadMoreButton()}</div>
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
                <h5>RECENT POSTS</h5>
                <ul className="list-unstyled">{showRecentBlogs()}</ul>
              </div>
            </div>
          </div>
        </main>
      </Layout>
    </React.Fragment>
  );
};

Blogs.getInitialProps = () => {
  let skip = 0;
  let limit = 2;
  return listBlogsWithCategoriesAndTags(skip, limit).then(data => {
    if (data.error) {
      console.log(data.error);
    } else {
      return {
        blogs: data.blogs,
        categories: data.categories,
        tags: data.tags,
        totalBlogs: data.size,
        blogsLimit: limit,
        blogSkip: skip
      };
    }
  });
};

export default withRouter(Blogs);
