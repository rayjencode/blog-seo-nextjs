import Link from "next/link";
import moment from "moment";
import renderHtml from "react-render-html";
import { API } from "../../config";

const CardBlog = ({ blog }) => {
  const showBlogTags = () => {
    return blog.tags.map((tag, index) => (
      <li key={index} className="list-unstyled list-inline-item">
        <Link href={`/tags/${tag.slug}`}>
          <a className="badge badge-danger py-1 px-2 h-100">{tag.slug}</a>
        </Link>
      </li>
    ));
  };
  return (
    <React.Fragment>
      <hr />
      <ul className="list-inline">
        <strong>Tags:</strong> {showBlogTags()}
      </ul>
      <h2>{blog.title}</h2>

      <small>
        Published: {moment(blog.updatedAt).fromNow()} by{" "}
        <Link href={`/profile/${blog.postedBy.username}`}>
          <a>{blog.postedBy.username}</a>
        </Link>
      </small>
      <img
        className="w-100"
        src={`${API}/blog/photo/${blog.slug}`}
        alt={blog.title}
      />
      <p className="mt-3">{renderHtml(blog.excerpt)}</p>

      <Link href={`/blogs/${blog.slug}`}>
        <a className="btn btn-primary">Read More...</a>
      </Link>
    </React.Fragment>
  );
};

export default CardBlog;
