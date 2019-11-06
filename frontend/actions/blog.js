import fetch from "isomorphic-fetch";
import { API } from "../config";
import queryString from "query-string";

// Create Blog
// export const createBlog = (blog, token) => {
//   return fetch(`${API}/blog`, {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       Authorization: `Bearer ${token}`
//     },
//     body: blog
//   })
//     .then(response => {
//       return response.json();
//     })
//     .catch(err => console.log(err));
// };

export const createBlog = async (blog, token) => {
  try {
    const res = await fetch(`${API}/blog`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: blog
    });

    return res.json();
  } catch (err) {
    console.log(err);
  }
};

// export const listBlogsWithCategoriesAndTags = () => {
//   return fetch(`${API}/blogs-categories-tags`, {
//     method: "POST",
//     headers: {
//       Accept: "application/json"
//     }
//   })
//     .then(response => {
//       return response.json();
//     })
//     .catch(err => console.log(err));
// };

// Get list Blogs with cat and tags
export const listBlogsWithCategoriesAndTags = async (skip, limit) => {
  try {
    const data = { limit, skip };
    const res = await fetch(`${API}/blogs-categories-tags`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    return res.json();
  } catch (err) {
    console.log(err);
  }
};

// Get Single Blog by slug
export const singleBlog = async slug => {
  try {
    const res = await fetch(`${API}/blog/${slug}`, {
      method: "GET"
    });

    return res.json();
  } catch (err) {
    console.log(err);
  }
};

// Get list related blog
export const listRelated = async blog => {
  try {
    const res = await fetch(`${API}/blogs/related`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(blog)
    });

    return res.json();
  } catch (err) {
    console.log(err);
  }
};

// get list all the blogs
export const list = async () => {
  try {
    const res = await fetch(`${API}/blogs`, {
      method: "GET"
    });

    return res.json();
  } catch (err) {
    console.log(err);
  }
};

// Delete the Blog
export const removeBlog = async (slug, token) => {
  try {
    const res = await fetch(`${API}/blog/${slug}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });

    return res.json();
  } catch (err) {
    console.log(err);
  }
};

// Update Blog
export const updateBlog = async (blog, token, slug) => {
  try {
    const res = await fetch(`${API}/blog/${slug}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: blog
    });

    return res.json();
  } catch (err) {
    console.log(err);
  }
};

export const listSearch = async params => {
  try {
    console.log("source params", params);
    let query = queryString.stringify(params);
    console.log("query params", query);
    const res = await fetch(`${API}/blogs/search?${query}`, {
      method: "GET"
    });

    return res.json();
  } catch (err) {
    console.log(err);
  }
};
