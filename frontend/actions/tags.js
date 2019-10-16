import fetch from "isomorphic-fetch";
import { API } from "../config";

// Create tag
export const create = (tags, token) => {
  return fetch(`${API}/tag`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(tag)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

// Get all tags
export const getTags = () => {
  return fetch(`${API}/tag`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

// Get single tags by slug
export const singleTags = slug => {
  return fetch(`${API}/tag/${slug}`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

// Remove Tags
export const removeTags = (slug, token) => {
  return fetch(`${API}/tag/${slug}`, {
    method: "DELETE",
    headers: {
      Accept: "aaplication/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};
