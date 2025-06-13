import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, SquareChevronLeft, User } from "lucide-react";
import { PHOTO_URL } from "../constants";
import { useAppToast } from "../constants/ToastProvider";
import Navbar from "./../Components/NavBar";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const { showSuccess, showError } = useAppToast();
  const navigate = useNavigate();

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type and size
    if (!file.type.match("image.*")) {
      showError("Please select an image file (JPEG, PNG)");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      showError("Image size should be less than 5MB");
      return;
    }

    setIsUploading(true);

    try {
      // Show preview while uploading
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImg(reader.result);
      };
      reader.readAsDataURL(file);

      // Create FormData for Cloudinary upload
      const cloudinaryFormData = new FormData();
      cloudinaryFormData.append("file", file);
      cloudinaryFormData.append("upload_preset", "texts.");
      cloudinaryFormData.append("cloud_name", "karna");

      // First upload to Cloudinary
      const cloudinaryResponse = await fetch(
        "https://api.cloudinary.com/v1_1/karna/image/upload",
        {
          method: "post",
          body: cloudinaryFormData,
        }
      );

      if (!cloudinaryResponse.ok) {
        throw new Error("Cloudinary upload failed");
      }

      const cloudinaryData = await cloudinaryResponse.json();
      const imageUrl = cloudinaryData.secure_url;

      // Then update the user profile with the new image URL
      await updateProfile({ pic: imageUrl }, showSuccess, showError);
    } catch (error) {
      console.error("Upload failed:", error);
      showError(error.message || "Failed to update profile picture");
      // Revert to previous image if upload fails
      setSelectedImg(authUser?.pic || null);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="h-screen ">
      <Navbar />
      <div className="max-w-2xl mx-auto p-4 py-8 pt-10">
        <div className="flex flex-row px-5 mb-2">
          <button className="flex gap-2" onClick={() => navigate("/")}>
            <SquareChevronLeft /> Back to Chats.
          </button>
        </div>
        <div className="bg-base-300 rounded-xl p-6 space-y-8  ">
          <div className="text-center">
            <h1 className="text-2xl ">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>

          {/* avatar upload section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || authUser?.pic || PHOTO_URL}
                alt="Profile"
                className="size-32 rounded-xl object-cover aspect-square self-center border-4"
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${
                    isUploading || isUpdatingProfile
                      ? "animate-pulse pointer-events-none"
                      : ""
                  }
                `}
              >
                <Camera className="w-5 h-5 text-base-200 " />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUploading || isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isUploading || isUpdatingProfile
                ? "Uploading..."
                : "Click the camera icon to update your photo"}
            </p>
          </div>

          {/* User info section */}
          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                {authUser?.name}
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                {authUser?.email}
              </p>
            </div>
          </div>

          {/* Account info section */}
          <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{authUser?.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
