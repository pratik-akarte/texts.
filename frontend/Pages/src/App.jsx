import { useEffect } from "react";
import "./App.css";

import { useAuthStore } from "../../store/useAuthStore";

function App() {
  const { authUser, isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth(); // Call the function
  }, [checkAuth]);

  console.log(authUser);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="app ">
      <Routes>
        <Route
          path="/"
          element={!authUser ? <Home /> : <Navigate to="/chats" />}
        />
        <Route
          path="/chats"
          element={authUser ? <ChatsPage /> : <Navigate to="/" />}
        />

        {/* <Route path="/settings" element={<SettingsPage />} />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        /> */}
      </Routes>
    </div>
  );
}

export default App;
