import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { singleCategory, getCategories } from "../../actions/category";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";
import renderHTML from "react-render-html";
import moment from "moment";
import CardBlog from "../../components/blog/CardBlog";

const Category = ({ category, blogs, query }) => {
  const head = () => (
    <Head>
      <title>
        Programming Blogs About {category.name} | {APP_NAME}
      </title>
      <meta
        name="description"
        content={`Best Programming tutorials on ${category.name}`}
      />
      <link rel="canonical" href={`${DOMAIN}/categories/${query.slug}`} />

      {/* Open Graph for social media link */}
      <meta property="og:title" content={`${category.name} | ${APP_NAME}`} />
      <meta
        property="og:description"
        content={`Best Programming tutorials on ${category.name}`}
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}/categories/${query.slug}`} />
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

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    initCategories();
  }, []);

  const initCategories = () => {
    getCategories().then(data => {
      if (data.error) {
        console.log("Error to load Categories");
      } else {
        setCategories(data);
      }
    });
  };

  const showCategories = () =>
    categories.map((cat, index) => (
      <li key={index} className="my-1 ml-3">
        <div className="d-flex justify-content-between">
          <Link href={`/categories/${cat.slug}`}>
            <a className="text-capitalize">{cat.name}</a>
          </Link>
          <p>(5)</p>
        </div>
      </li>
    ));

  return (
    <React.Fragment>
      {head()}
      <Layout>
        <main>
          <div className="container">
            <header className="my-5">
              <h1 className="display-4 font-weight-bold text-center">
                Category: {category.name}
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
                <ul className="list-unstyled">
                  {blogs.map((blog, index) => (
                    <li key={index} className="lead mb-5">
                      <CardBlog blog={blog} />
                    </li>
                  ))}
                </ul>
                <ul className="list-unstyled">
                  <li>Show Load More Blogs</li>
                </ul>
                <div className="row">
                  <div className="col-md-6 mx-auto">Load More Button</div>
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
              </div>
            </div>
          </div>
        </main>
      </Layout>
    </React.Fragment>
  );
};

Category.getInitialProps = ({ query }) => {
  return singleCategory(query.slug).then(data => {
    if (data.error) {
      console.log(data.error);
    } else {
      return {
        category: data.category,
        blogs: data.blogs,
        query
      };
    }
  });
};

export default Category;
