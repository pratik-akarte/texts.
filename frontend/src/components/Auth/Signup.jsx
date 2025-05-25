import React, { useState } from "react";
import { VStack, Button, Input, Box } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { InputGroup, InputRightElement } from "@chakra-ui/input";
import { useToast } from "@chakra-ui/react";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pic, setPic] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleTogglePassword = () => setShow(!show);

  const setProfilePic = (pics) => {
    setLoading(true);
    if (!pics) {
      toast({
        title: "Profile Picture is invalid.",
        description: "Please try again",
        status: "error",
        position: "top",
        duration: 9000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "texts.");
      data.append("cloud_name", "karna");

      fetch("https://api.cloudinary.com/v1_1/karna/image/upload", {
        method: "POST",
        body: data, // ✅ correct: FormData object
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Cloudinary Response:", data);
          setPic(data.url || data.secure_url);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          toast({
            title: "Upload failed.",
            description: "Something went wrong.",
            status: "error",
            position: "top",
            duration: 9000,
            isClosable: true,
          });
          setLoading(false);
        });
    } else {
      toast({
        title: "Invalid file type.",
        description: "Only JPEG or PNG images are allowed.",
        status: "error",
        position: "top",
        duration: 9000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  function submitHandler(params) {
    
  }



  
  return (
    <Box w="100%" maxW="400px" mx="auto" color={"black"}>
      <VStack spacing={4} width="100%" mt={5}>
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            variant="flushed"
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
            _placeholder={{ opacity: 1, color: "gray.300" }}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Email ID</FormLabel>
          <Input
            variant="flushed"
            placeholder="Enter your email id"
            onChange={(e) => setEmail(e.target.value)}
            _placeholder={{ opacity: 1, color: "gray.300" }}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              variant="flushed"
              type={show ? "text" : "password"}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              _placeholder={{ opacity: 1, color: "gray.300" }}
            />
            <InputRightElement width="4.5rem">
              <Button
                size="sm"
                onClick={handleTogglePassword}
                h="1.75rem"
                mt="6px"
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
            onChange={(e) => setProfilePic(e.target.files[0])}
            variant="flushed"
          />
        </FormControl>

        <Button w="100%" mt="20px" isLoading={loading} type="submit" onSubmit={submitHandler}>
          Submit
        </Button>
      </VStack>
    </Box>
  );
};

export default Signup;
