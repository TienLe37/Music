import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Image,
  Input,
  InputGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import Logo from "../Assets/music-app.png";
import { useForm } from "react-hook-form";
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [forgotEmail, setForgotEmail] = useState("");
  const [isOpenForgotModal, setIsOpenForgotModal] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const onSubmit = async ({ email, password }) => {
    try {
      await axios
        .post("http://localhost:5002/auth/login", {
          mail: email,
          password: password,
        })
        .then((result) => {
          localStorage.setItem("user", JSON.stringify(result.data));
          console.log(JSON.parse(localStorage.getItem("user")));
          navigate('/dashboard')
        });
    } catch (error) {
      toast({
        title: "Error while logging in",
        description: error.message,
        duration: 3500,
        status: "error",
        isClosable: true,
        position: "bottom center",
      });
    }
  };

  const forgetPassword = () => {
    console.log("forgetPassword");
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
          <Text fontSize="2xl">Login</Text>
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
            <FormControl isInvalid={errors.email}>
              <FormLabel fontSize="0.875rem" mb={1}>
                Email
              </FormLabel>
              <Input
                type="email"
                name="email"
                id="email"
                {...register(
                  "email",
                  {
                    required: {
                      value: true,
                      message: "This field cannot be empty",
                    },
                  },
                  {
                    pattern: {
                      value:
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "Please enter a valid email",
                    },
                  }
                )}
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
                  <Text
                    fontSize="0.875rem"
                    color="var(--primary-color)"
                    onClick={() => setIsOpenForgotModal(true)}
                    _hover={{ cursor: "pointer" }}
                  >
                    Forgot Password
                  </Text>
                  <Modal
                    isOpen={isOpenForgotModal}
                    onClose={() => setIsOpenForgotModal(false)}
                  >
                    <ModalOverlay />
                    <ModalContent bgColor="blackAlpha.900" color="white">
                      <ModalHeader>Forgot password</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        <Text>Email address</Text>
                        <Input
                          type="email"
                          required
                          onChange={(event) => {
                            setForgotEmail(event.target.value);
                          }}
                          bgColor="white"
                          color="black"
                        />
                      </ModalBody>

                      <ModalFooter>
                        <Button
                          mr={3}
                          onClick={() => setIsOpenForgotModal(false)}
                          color="black"
                        >
                          Close
                        </Button>
                        <Button
                          bgColor="var(--primary-color)"
                          onClick={forgetPassword}
                          _hover={{ opacity: 0.8 }}
                        >
                          Submit
                        </Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </Flex>
              </FormLabel>

              <Input
                type="password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "This field cannot be empty",
                  },
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
                <Text>Log in</Text>
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
