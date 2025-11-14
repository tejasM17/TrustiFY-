import { Navigate } from "react-router";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

const authStore = (set, get) => ({
  error: null,
  loading: false,
  token: localStorage.getItem("token") || null,
  user: null,

  getProfile: async () => {
    const token = get().token;
    if (!token) {
      set({ error: "No token – login required" });
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/auth/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${get().token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Profile fetch failed: " + response.statusText);
      }
      const data = await response.json();
      console.log("Profile Data:", data);
      set({ user: data });
    } catch (error) {
      console.log(error);
      set({ error: error.message });
      get().logout();
    }
  },

  register: async (
    name,
    email,
    password,
    dob,
    mobile,
    location,
    profilePhoto
  ) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          dob,
          mobile,
          location,
          profilePhoto,
        }),
      });
      const data = await response.json();
      console.log(data);
      localStorage.setItem("token", data.token);
      set({ token: data.token });
      await get().getProfile();
      return { success: true };
    } catch (error) {
      console.log(error);
    }
  },

  login: async (email, password) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log(data);
      localStorage.setItem("token", data.token);
      set({ token: data.token });
      await get().getProfile();
      return { success: true };
    } catch (error) {
      console.log(error);
    }
  },

  updateProfile: async (profileData) => {
    set({ loading: true, error: null });
    try {
      const token = get().token;
      const res = await fetch("http://localhost:5000/api/auth/profile", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: profileData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Update failed");
      }

      const updatedUser = await res.json();
      set({ user: updatedUser });
      return { success: true };
    } catch (err) {
      console.error(err);
      set({ error: err.message });
      return { error: err.message };
    } finally {
      set({ loading: false });
    }
  },

  handleOAuthToken: (tokenFromUrl) => {
    if (tokenFromUrl) {
      localStorage.setItem("token", tokenFromUrl);
      set({ token: tokenFromUrl });
      get().getProfile();
      return { success: true };
    }
    return { error: "No token in URL" };
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ token: null, user: null, error: null, loading: false });
    Navigate("/getstarted");
  },
});

export const useAuthStore = create(devtools(authStore, { name: "AuthStore" }));
