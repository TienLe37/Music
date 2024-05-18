import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [genre, setGenre] = useState("");
  const navigate = useNavigate();
  const toast = useToast();
  const User = localStorage.getItem("user");
  const User_id = JSON.parse(User).id;

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleGenreChange = (event) => {
    setGenre(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("song", file);
    formData.append("genre", genre);
    formData.append("author", User_id)

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    try {
      const result = await axios.post(
        "http://localhost:5002/song/createSong",
        formData,
        config
      );
      console.log(result);
      navigate("/dashboard");
    } catch (error) {
      toast({
        status: "error",
        description: error.message,
        duration: 3000,
        position: "bottom",
        isClosable: true,
      });
    }
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Flex
        justifyContent="center"
        alignItems="center"
        border="1px solid black"
        borderRadius="10px"
        width={["90%", "70%", "50%"]} // Adjust the width based on screen size
        height={["70%", "60%", "50%"]} // Adjust the height based on screen size
      >
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <FormControl>
            <FormLabel
              htmlFor="mp3file"
              fontSize={["xl", "2xl", "3xl"]} // Adjust the font size based on screen size
              fontWeight="medium"
              margin="5px"
              position="relative"
              left="10px"
            >
              Select an mp3 file:
            </FormLabel>
            <Input
              type="file"
              id="mp3file"
              name="mp3file"
              onChange={handleFileChange}
              padding="5px"
              margin="10px"
              accept="audio/mp3"
            />
          </FormControl>
          <FormControl>
            <FormLabel
              fontSize={["xl", "2xl", "3xl"]} // Adjust the font size based on screen size
              fontWeight="medium"
              margin="5px"
              position="relative"
              left="10px"
            >
              Select Genre:
            </FormLabel>
            <Select
              padding="5px"
              margin="10px"
              value={genre}
              onChange={handleGenreChange}
            >
              <option>POP</option>
              <option>ROCK</option>
              <option>JAZZ</option>
              <option>CLASSICAL</option>
              <option>HIP HOP</option>
              <option>EDM</option>
              <option>COUNTRY</option>
              <option>FOLK</option>
            </Select>
          </FormControl>
          <Button
            type="submit"
            position="relative"
            left="20px"
            width={["80%", "70%", "400px"]} // Adjust the width based on screen size
            colorScheme="orange"
          >
            Upload
          </Button>
        </form>
      </Flex>
    </Box>
  );
};

export default Upload;
