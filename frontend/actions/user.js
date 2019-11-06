import fetch from "isomorphic-fetch";
import { API } from "../config";

export const userPublicProfile = async username => {
  try {
    const res = await fetch(`${API}/user/${username}`, {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    });

    return res.json();
  } catch (err) {
    console.log(err);
  }
};

export const getProfile = async token => {
  try {
    const res = await fetch(`${API}/user/profile`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

export const update = async (token, user) => {
  try {
    const res = await fetch(`${API}/user/update`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: user
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};
