import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import {
  LogOut,
  MessageSquare,
  MessageSquareDot,
  Settings,
  User,
  User2,
} from "lucide-react";
import { useAppToast } from "../constants/ToastProvider";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const { showSuccess, showError } = useAppToast();

  return (
    <header className="sticky top-0 bg-gray/60 backdrop-blur-lg w-full border-b border-gray-800 z-10 font-medium">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              <div className="size-9 rounded-lg bg-gray-500/10 flex items-center justify-center">
                <MessageSquareDot className="w-5 h-5 text-teal-800" />
              </div>
              <h1 className="text-6xl font-medium text-gray-900">texts.</h1>
            </Link>
          </div>

          <div className="flex  flex-row gap-5">
            {authUser && (
              <>
                <Link
                  to={"/profile"}
                  className={`btn btn-sm gap-2 flex items-center`}
                >
                  <User2 className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button
                  className="flex gap-2 items-center"
                  onClick={() => logout(showSuccess, showError)}
                >
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
