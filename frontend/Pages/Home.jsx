import React from "react";
import { useState } from "react";
import { Box, Container, Text } from "@chakra-ui/react";
import { For, SimpleGrid, Button } from "@chakra-ui/react";
import Login from "../src/components/Auth/Login";
import Signup from "../src/components/Auth/Signup";

const Home = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Container maxWidth={"xl"} centerContent>
      <Box
        d="flex"
        justifyContent="center"
        width="100%"
        p="5"
        m="40px 0 10px 0"
      >
        <Text fontSize="4xl" fontWeight="bold" color="white" textAlign="center">
          Texts.
        </Text>
      </Box>
      <Box
        d="flex"
        justifyContent="center"
        width="100%"
        p="5"
        rounded="2xl"
        backdropFilter="blur(10px)"
        backgroundColor="rgba(255, 255, 255, 0.1)"
        boxShadow="lg"
        border="1px solid rgba(255, 255, 255, 0.2)"
        m="40px 0 10px 0"
      >
        <SimpleGrid columns={2} gap="2" width="100%">
          <Button
            p={"25px"}
            fontSize={"xl"}
            variant={activeTab === "tab1" ? "solid" : "outline"}
            color="white"
            _hover={{
              color: activeTab !== "tab2" ? "gray.600" : "gray.500",
            }}
            onClick={() => handleTabClick("tab1")}
          >
            Login
          </Button>
          <Button
            p={"25px"}
            fontSize={"xl"}
            variant={activeTab === "tab2" ? "solid" : "outline"}
            color="white"
            _hover={{
              color: activeTab !== "tab2" ? "gray.600" : "gray.500",
            }}
            onClick={() => handleTabClick("tab2")}
          >
            Sign Up
          </Button>
        </SimpleGrid>
        <Box color={"white"}>
          {activeTab === "tab1" && <Login />}
          {activeTab === "tab2" && <Signup />}
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
