import fetch from "isomorphic-fetch";
import { API } from "../config";

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

export const listBlogsWithCategoriesAndTags = () => {
  return fetch(`${API}/blogs-categories-tags`, {
    method: "POST",
    headers: {
      Accept: "application/json"
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

// Get list Blogs with cat and tags
// export const listBlogsWithCategoriesAndTags = async () => {
//   try {
//     const res = await fetch(`${API}/blogs-categories-tags`, {
//       method: "POST",
//       headers: {
//         Accept: "application/json"
//       }
//     });

//     return res.json();
//   } catch (err) {
//     console.log(err);
//   }
// };
