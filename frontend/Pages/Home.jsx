import { useState } from "react";
import Banner from "../Components/Banner.jsx";
import { Flex } from "@chakra-ui/react";
import { MessageSquareDot } from "lucide-react";
import Login from "./../Auth/Login";
import Signup from "../Auth/Signup.jsx";
import { Link } from "react-router-dom";

const Home = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen flex md:flex-row flex-col font-[Outfit] ">
      <div className="hidden md:flex md:w-1/2 items-center justify-center p-8">
        <Banner
          title="Join our community"
          subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
        />
      </div>

      {/* Right - Login (Full width on mobile, half on md+) */}
      <div className="w-full md:w-1/2 flex items-center justify-center  p-8 flex-col bg-base-200">
        <Flex
          fontSize="3xl"
          fontWeight="bold"
          color="gray.400"
          textAlign="center"
          mb="30px"
          direction="column"
          align="center"
          justify="center"
        >
          <MessageSquareDot className="size-10 " />
          texts.
        </Flex>
        {activeTab === "tab1" && <Login />}
        {activeTab === "tab2" && <Signup />}
        <div className="mt-5">
          {activeTab === "tab1" && (
            <h2>
              New to texts ?{" "}
              <Link onClick={() => handleTabClick("tab2")} className="">
                Sign Up
              </Link>
            </h2>
          )}
          {activeTab === "tab2" && (
            <h2>
              Already a user?{" "}
              <Link onClick={() => handleTabClick("tab1")}>Login</Link>
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
