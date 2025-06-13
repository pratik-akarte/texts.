import { create } from "zustand";
import { axiosInstance } from "./../lib/axios";
import { io } from "socket.io-client";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  socket: null,
  onlineUsers: [],

  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/user/check");
      console.log(response?.data);
      set({ authUser: response?.data });
      get().connectSocket();
    } catch (error) {
      if (error.response) {
        // Backend sent a structured error (400/500)
        console.error("Auth Error:", error.response.data.message); // ✅ Correct
      } else {
        // Network error (no internet, server down)
        console.error("Network Error:", error.message);
      }
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data, toast) => {
    const { showSuccess, showError } = toast;
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/user/signup", data);

      // Ensure response has expected data
      if (res.data && res.data.token) {
        set({ authUser: res.data });

        showSuccess("Account created successfully");
        get().connectSocket();

        return { success: true, data: res.data }; // Return success status
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Signup error:", error);

      // Enhanced error message extraction
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Signup failed";

      showError("Signup failed");

      return { success: false, error: errorMessage }; // Return error status
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data, toast) => {
    const { showSuccess, showError } = toast;

    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/user/login", data);
      set({ authUser: res.data });

      showSuccess("Login successfull!");
      get().connectSocket();
      return { success: true, data: res.data };
    } catch (error) {
      console.error("Signup error:", error);

      // Enhanced error message extraction
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Login failed";

      showError(errorMessage);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async (showSuccess, showError) => {
    try {
      const res = await axiosInstance.post("/user/logout");
      set({ authUser: null });
      if (res) {
        showSuccess("Logout successfull!");
        get().disconnectSocket();
      }
    } catch (error) {
      console.error("Signup error:", error);

      // Enhanced error message extraction
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Logout failed";

      showError(errorMessage);
    }
  },

  updateProfile: async (data, showSuccess, showError) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/user/updateProfilePic", data, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json", // Changed from multipart/form-data
        },
      });

      set({ authUser: res.data });
      showSuccess("Profile picture updated successfully");
      return res.data;
    } catch (error) {
      console.error("Error in update profile:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to update profile picture";
      showError(errorMessage);
      throw error;
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();

    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
