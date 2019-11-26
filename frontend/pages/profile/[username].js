import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import { userPublicProfile } from "../../actions/user";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";
import moment from "moment";
import ContactForm from "../../components/form/ContactForm";

const UserProfile = ({ user, blogs, query }) => {
  const head = () => (
    <Head>
      <title>
        {user.username} | {APP_NAME}
      </title>
      <meta name="description" content={`Blogs by ${user.name}`} />
      <link rel="canonical" href={`${DOMAIN}/profile/${query.username}`} />

      {/* Open Graph for social media link */}
      <meta property="og:title" content={`${user.username} | ${APP_NAME}`} />
      <meta property="og:description" content={`Blogs by ${user.username}`} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}/profile/${query.username}`} />
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
  const showUserBlogs = () => {
    return blogs.map((blog, index) => (
      <React.Fragment>
        <i className="fas fa-star text-warning"></i>
        <i className="fas fa-star text-warning"></i>
        <i className="fas fa-star text-warning"></i>
        <i className="fas fa-star text-warning"></i>
        <i className="fas fa-star text-warning"></i>
        <div key={index} className="mb-2">
          <Link href={`/blogs/${blog.slug}`}>
            <a>
              <h5>
                <strong>{blog.title}</strong>
              </h5>
            </a>
          </Link>
        </div>
        <small>Published {moment(blog.updatedAt).fromNow()}</small>

        <hr />
      </React.Fragment>
    ));
  };
  return (
    <React.Fragment>
      {head()}
      <Layout>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="card ">
                <div className="card-header bg-primary text-center">
                  <p className="text-white mb-0">Author's Profile</p>
                </div>
                <div className="card-body">
                  <div className=" w-100">
                    <img
                      className="card-img-top mb-3"
                      src={`${API}/user/photo/${user.username}`}
                      alt={user.name}
                    />
                  </div>
                  <strong>
                    <p>{user.name}</p>
                  </strong>
                  <small className="text-muted text-italic">
                    Joined {moment(user.createdAt).fromNow()}
                  </small>
                </div>
              </div>
              <div className="card mt-4">
                <div className="card-header text-white bg-primary">
                  <p className="mb-0">Message Author</p>
                </div>
                <div className="card-body">
                  <ContactForm authorEmail={user.email} />
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card">
                <div className="card-header bg-primary text-center">
                  <p className="text-white mb-0">Author's Articles</p>
                </div>
                <div className="card-body">
                  <p className="mb-3">Recent Blogs by {user.name}</p>
                  {showUserBlogs()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </React.Fragment>
  );
};

UserProfile.getInitialProps = ({ query }) => {
  return userPublicProfile(query.username).then(data => {
    if (data.error) {
      console.log(data.error);
    } else {
      return { user: data.user, blogs: data.blogs, query };
    }
  });
};

export default UserProfile;
