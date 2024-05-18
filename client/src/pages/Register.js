import {
  Box,
  Button,
  Container,
  Flex,
  FormErrorMessage,
  FormLabel,
  HStack,
  Image,
  Input,
  Modal,
  Text,
  VStack,
  FormControl,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import Logo from "../Assets/music-app.png";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const toast = useToast();
  const navigate = useNavigate();
  const onSubmit = async ({ username, email, password }) => {
    try {
      await axios
        .post("http://localhost:5002/auth/register", {
          username: username,
          mail: email,
          password: password,
        })
        .then((res) => {
          toast({
            title: "Register Success",
            status: "success",
            description: res.status,
            duration: 3000,
            isClosable: true,
            position: "bottom center",
          });
          navigate('/login')
        });
    } catch (error) {
      toast({
        title: "Error registering",
        status: "error",
        description: error.message,
        duration: 3000,
        isClosable: true,
        position: "bottom center",
      });
    }
  };

  return (
    <Container maxW="4xl" centerContent>
      <Box
        id="header"
        display="flex"
        alignItems="center"
        alignContent="center"
        marginBottom="10px"
      >
        <VStack>
          <Image
            id="icon"
            src={Logo}
            alt="logo"
            boxSize="100px"
            objectFit="cover"
          />
          <Text fontSize="2xl">Register</Text>
        </VStack>
      </Box>
      <Box id="body" marginTop="20px" width="60%">
        <Flex alignItems="center" justifyContent="center">
          <HStack gap="10px" marginBottom="20px">
            <Button
              colorScheme="green"
              leftIcon={<FcGoogle />}
              size="lg"
              width={200}
              borderRadius="30px"
            >
              Google
            </Button>
            <Button
              colorScheme="facebook"
              leftIcon={<FaFacebookF />}
              size="lg"
              width={200}
              borderRadius="30px"
            >
              Facebook
            </Button>
          </HStack>
        </Flex>
        <Box className="form">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={errors.username} mt={4}>
              <FormLabel fontSize="0.875rem" mb={1} mr={0}>
                <Flex align="center" justify="space-between">
                  <Text>Username</Text>
                </Flex>
              </FormLabel>

              <Input
                type="text"
                id="username"
                {...register("username", {
                    required: "This field cannot be empty",
                  })}
                color="black"
                fontSize="0.875rem"
                bgColor="white"
                py={6}
                borderRadius="32px"
              />
              <FormErrorMessage mt={1}>
                {errors.username && errors.username.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.email}>
              <FormLabel fontSize="0.875rem" mb={1}>
                Email
              </FormLabel>
              <Input
                type="email"
                name="email"
                id="email"
                {...register("email", {
                    required: "This field cannot be empty",
                    pattern: {
                      value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "Please enter a valid email",
                    },
                  })}
                color="black"
                fontSize="0.875rem"
                bgColor="white"
                py={6}
                borderRadius="32px"
              />
              <FormErrorMessage mt={1}>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.password} mt={4}>
              <FormLabel fontSize="0.875rem" mb={1} mr={0}>
                <Flex align="center" justify="space-between">
                  <Text>Password</Text>
                </Flex>
              </FormLabel>

              <Input
                type="password"
                {...register("password", {
                    required: "This field cannot be empty",
                    minLength: {
                      value: 6,
                      message: "This field has a minimum length of 6",
                    },
                  })}
                color="black"
                fontSize="0.875rem"
                bgColor="white"
                py={6}
                borderRadius="32px"
              />
              <FormErrorMessage mt={1}>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>
            <Box>
              <Button
                type="submit"
                fontSize="0.875rem"
                fontWeight={500}
                colorScheme="orange"
                variant="solid"
                width="100%"
                mt={8}
                size="lg"
                _hover={{ opacity: 0.8 }}
                borderRadius="30px"
              >
                <Text>Register</Text>
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
