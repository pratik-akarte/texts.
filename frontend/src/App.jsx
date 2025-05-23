import { Button } from "@chakra-ui/react";
import { Route } from "react-router-dom";
import "./App.css";
import Home from "../Pages/Home";
import ChatsPage from "../Pages/ChatsPage";

function App() {
  return (
    <div className="app">
      <Route path="/" component={Home} exact />
      <Route path="/chats" component={ChatsPage} exact />
    </div>
  );
}

export default App;
