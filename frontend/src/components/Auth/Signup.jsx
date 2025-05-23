import React, { useState } from "react";
import { VStack, Button, Input, Box } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { InputGroup, InputRightElement } from "@chakra-ui/input";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pic, setPic] = useState("");
  const [show, setShow] = useState(false);

  const handleTogglePassword = () => setShow(!show);

  return (
    <Box w="100%" maxW="400px" mx="auto">
      <VStack spacing={4} width="100%" mt={5}>
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            variant={"flushed"}
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
            _placeholder={{ opacity: 1, color: "whiteAlpha.800" }}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Email ID</FormLabel>
          <Input
            variant={"flushed"}
            placeholder="Enter your email id"
            onChange={(e) => setEmail(e.target.value)}
            _placeholder={{ opacity: 1, color: "whiteAlpha.800" }}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              variant={"flushed"}
              type={show ? "text" : "password"}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              _placeholder={{ opacity: 1, color: "whiteAlpha.800" }}
            />
            <InputRightElement width="4.5rem">
              <Button
                size="sm"
                onClick={handleTogglePassword}
                h="1.75rem"
                mt={"6px"}
              >
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <FormControl>
          <FormLabel>Profile Pic</FormLabel>
          <Input
            type="file"
            onChange={(e) => setPic(e.target.files[0])}
            variant={"flushed"}
          />
        </FormControl>
        <Button w={"100%"} mt={"20px"}>
          Submit
        </Button>
      </VStack>
    </Box>
  );
};

export default Signup;
